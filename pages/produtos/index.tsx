/* eslint-disable react/no-unescaped-entities */
import styles from './Produtos.module.css'
import Navbar from '../../src/components/navbar'
import Footer from '../../src/components/footer'
import Imagens from '../../src/components/Imagens'
import BannerHorizontal from '../../src/components/BannerPropagandaHorizontal'
import BotaoSubir from '../../src/components/botaoSubir'
import Head from 'next/head'
import {FaShoppingCart} from   'react-icons/fa'


import { realtime, pegarImagem, storage } from '../../src/firebase'
import { useEffect } from 'react'
import { GetStaticProps } from 'next'


export async function getStaticProps(context:GetStaticProps) {



    console.log('********* PRODUTOS *********')
    // console.log('firebaseConfig', firebaseConfig)
    
    let storageRef = storage.ref('/imagens')    
    
    // lista de imagens  
    let listImgs = []
    let imgsRef = storageRef.child('/cake1.jpg')
    listImgs.push( await pegarImagem( imgsRef ) ) 
 
    
    // LOGO  
    let logoref = storageRef.child('/donut.png') 
    let logoUrl = await pegarImagem( logoref )  

    // PRODUTOS
        // Definindo os tipos do TypeScript
    
    type Item = {
        images: String[]
        price: {
            grande? : string,
            medio? : string,
            pequeno? : string,
            unidade? : string
        },
        sabores: {
            cobertura: String[],
            massa: String[]
            recheio?: String[]
        },
        subtitle : string,
        title : string
    }
    
    type VetItens = Array<{
        [nomeProduto: string]:
            {
                [key: string]: Item
            }
    }>

    type VetCards = Array<{
        [key: string]: {
            item: String[],
            title: string
        }
    }>

    type Produtos = Array<{
        title: string,
        item: Array<{
            [key: string]: Item
        }>
    }>


    let produtos: Produtos
    await realtime.ref('/produtos/').once('value', (snapshot)=>{   // pega todos os dados do arquivo produto se existir 
        if (snapshot.exists()){
            console.log('EXISTE!!!')

            function parseVet(dados){   
                let vet = []
                for (let key in dados){
                    let value = dados[key]
                    let obj = {
                        [key] : value   // propriedade key tem origem na propriedade do objeto dados
                    }
                    vet.push( obj ) // adiciona cada propriedade do objeto dados a um vetor
                }
                return vet // retorna um vetor de objetos
            }

            let {cards:snapshotCard, itens:snapshotItem} = snapshot.val()
            let vetItens: VetItens = parseVet(snapshotItem)      // transforma em um vetor de objetos 
            let vetCards: VetCards = parseVet(snapshotCard)      // transforma em um vetor de objetos 
        
        

            // Aqui eu realizo algumas transformações nos dados em PRODUTOS e ITENS para que eles fiquem da forma que eu quero utilizar 
            let itens = ( ()=>{
                let vet = []
                vetItens.forEach( ( value ) =>{   // percorre os itens do vetor
                    
                    let itens = value   
                    for( let key in itens){   // percorre os objetos dentro dos itens
                        let produtos = itens[key]
                        for( let produtoKey in produtos ){  // percorre os produtos
                          let obj = {
                            [produtoKey]: produtos[produtoKey]
                          }  
                          vet.push(obj)  // adiciona os produtos ao vetor
                        }   
                    } 
                } )
                return vet  // retorna o vetor com todos os produtos em sequencia, sem estrutura de propriedade e valor senão da propria chave de cada produto
            } )();

            // cards é um objeto no formato =>   {'-MhxQlWhj8kHD4EkwcF3': { item: [Object], title: 'Bolos para encomenda' }}
            produtos = vetCards.map( (cards, cardsIndex) => {    
                let cardKey = Object.keys(cards)[0]
                let cardItem = cards[cardKey].item
                
                let card = cards[cardKey] // É exatamente o objeto dentro do objeto cards, é ai que estão o item e o titulo do card
        
                let produtosFiltrados = []
                itens.forEach( (produtos, itemIndex) => {    
                    let produtoKey = Object.keys(produtos)[0]
                    for(let key in cardItem){       // cards[key] =>  {0: MhxQlWhj8kHD4EkwcF3, 1: MhxQlWhj8kHD4EkwcF3}     
                        if ( cardItem[key] === produtoKey ){
                            produtosFiltrados.push(produtos)     //
                        }
                    }   
                } )
        
                let obj = {
                    title: card.title,  
                    item: produtosFiltrados
                }
                return obj  // retorna um objeto com item e o titulo do cards, os itens sao organizados da maneira abaixo
                //vetor de vetores de objeto let cards = [ [{'id': value}], [{'id2': value2}, {'id3': value2}] ]
            } )

            console.log('produtos => \n', JSON.stringify(produtos, null, 2))
            // let imagePromisses = produtos.map( async ( value )=>{
            //     let img = value.item.map( async ( item, index )=>{
            //         let itemKey = Object.keys(item)[index]
            //         //continuar aqui para pegar a url de cada imagem e adicionar em vetor de promisses para utilizar o Promisse.all([])

            //         // return img
            //     })
            //     return img
            // })

        }
        else console.log('Dados não existentes')
    }).catch(error => console.log('Erro ao pegar dados no bd {/produtos/}: ', error) )

    
    console.log('********* PRODUTOS *********')

    

    return {
      props: {
          listImgs: listImgs,
          logoUrl: logoUrl,
          produtos: produtos
      }, // will be passed to the page component as props
    }
}


function RenderizarProduto({imagem, titulo, valor}){
    return(
        <div className={styles.produtos}>
            <div className={styles.imagem} >
                <Imagens src={[imagem]} tipo={['full']} />
            </div>
            <div className={styles.infomarçoes} >
                <h1 className={styles.titulo} >{titulo}</h1>
                <h2 className={styles.valor} >{valor}</h2>
            </div>
            <div className={styles.areaButoes} >
                <button className={styles.botaoDetalhe} >DETALHES</button>
                <button className={styles.botaoCarrinho} ><FaShoppingCart/></button>
            </div>
        </div>
    )   
}



function Cards({titulo, listImgs}){
    return(
            // Começar a fazer a guia de produtos daqui 
            // Bolos caseirinho: 30,00 tradicional e clássico pra comer com café, nos sabores de baunilha, Coco e chocolate.
            // Bolo festeiro: 50,00 / 70,00 / 100,00 decorados e confeitados com massas de cacau, baunilha, Coco é biscoito, para recheios opções como brigadeiro trufado, maracujá, Coco, ameixa e brigadeiro de leite em pó e cobertura de chantilinho.
            // Bolo psicina: não tenho média ainda 
            // Cupcakes: 3,00 a unidade / 2 por 5,00 massa de baunilha, Coco, chocolate e biscoito com cobertura de chantilinho
            
        <section className={styles.section} >
            <h1 className={styles.titulo}>{titulo}</h1>
            <section className={styles.areaProdutos} >
                <RenderizarProduto imagem={ listImgs[0] } titulo='Bolo Caseirinho' valor='R$30,00' />
                <RenderizarProduto imagem={ listImgs[0] } titulo='Bolo festeiro' valor='R$50,00 / R$70,00 / R$100,00' />                        
                <RenderizarProduto imagem={ listImgs[0] } titulo='Bolo piscina' valor='R$...' />
            </section>
        </section>
    )
}

export default function Produtos({produtos, logoUrl, listImgs}){
    
    useEffect(()=>{
        console.log(produtos)
    }, [])
    
    /*
      dados estruturados para a prop produtos separado por cards (indices do vetor produto)
      produtos => [
        { item: [ [Object], [Object] ], title: 'Bolos para encomenda' },
        { item: [ [Object], [Object] ], title: 'Fatias disponiveis' },
        { item: [ [Object] ], title: 'Cupcakes' }
      ]
    */
  
    return(
        <div>
            <Head>
                <title>Dincy's Cake – Produtos</title> 
            </Head>
            <Navbar logoUrl={logoUrl} />
            <BannerHorizontal/>
            {/* <GoogleAds slot='2194687109'/> */}
            {/* Começar a fazer a guia de produtos daqui 
            Bolos caseirinho: 30,00 tradicional e clássico pra comer com café, nos sabores de baunilha, Coco e chocolate.
            Bolo festeiro: 50,00 / 70,00 / 100,00 decorados e confeitados com massas de cacau, baunilha, Coco é biscoito, para recheios opções como brigadeiro trufado, maracujá, Coco, ameixa e brigadeiro de leite em pó e cobertura de chantilinho.
            Bolo psicina: não tenho média ainda 
            Cupcakes: 3,00 a unidade / 2 por 5,00 massa de baunilha, Coco, chocolate e biscoito com cobertura de chantilinho
            */}
            <main>
                <section className={styles.section} >

                   {/* <Categorias listImgs={props.listImgs} titulo='Fatias Disponiveis' />
                   <Categorias listImgs={props.listImgs} titulo='Bolos para encomendar' />  */}



                </section>


                
            </main>
            <BannerHorizontal/>
            {/* <GoogleAds slot='3271965051'/> */}
            <BotaoSubir/>
            <Footer logoUrl={logoUrl} />
        </div>
    )
}



// Google adsense
// 50.000  =>  $1,920
// 200     =>  $7.68         
/*
[
    {
        "item": [
            {
                "-MhxS6SS7yWaysPCATX2": {
                    "images": {
                        "0": "gs://dincy-s-cake.appspot.com/imagens/produtos/bolo caseirinho/caseirinho.jpg"
                    },
                    "price": {
                        "grande": "",
                        "medio": "",
                        "pequeno": "",
                        "unidade": "R$30,00"
                    },
                    "sabores": {
                        "cobertura": {
                            "0": ""
                        },
                        "massa": {
                            "0": "Baunilha",
                            "1": "Coco",
                            "2": "Chocolate"
                        }
                    },
                    "subtitle": "tradicional e clássico pra comer com café,",
                    "title": "Bolo caseirinho"
                }
            },
            {
                "-MhxSyKfDFn4l40NI7ZJ": {
                    "images": {
                        "0": "gs://dincy-s-cake.appspot.com/imagens/produtos/bolo festeiro/20210822_115717.jpg"
                    },
                    "price": {
                        "grande": "R$100,00",
                        "medio": "R$70,00",
                        "pequeno": "R$50,00",
                        "unidade": ""
                    },
                    "sabores": {
                        "cobertura": {
                            "0": "chantilinho"
                        },
                        "massa": {
                            "0": "cacau",
                            "1": "baunilha",
                            "2": "Coco",
                            "3": "biscoito"
                        },
                        "recheio": {
                            "0": "brigadeiro trufado",
                            "1": "maracujá",
                            "2": "Coco",
                            "3": "Ameixa",
                            "4": "brigadeiro de leite em pó"
                        }
                    },
                    "subtitle": "Decorados e confeitados com massas de cacau, baunilha, Coco e biscoito, para recheios opções como brigadeiro trufado, maracujá, Coco, ameixa e brigadeiro de leite em pó e cobertura de chantilinho.",
                    "title": "Bolo festeiro"
                }
            }
        ],
        "title": "Bolos para encomenda"
    },
    {
        "item": [
            {
                "-MhxTPFXiISY1nXNhASv": {
                    "images": {
                        "0": "gs://dincy-s-cake.appspot.com/imagens/produtos/fatias/maracujá.jpg"
                    },
                    "price": {
                        "grande": "",
                        "medio": "",
                        "pequeno": "",
                        "unidade": "R$5,00"
                    },
                    "sabores": {
                        "cobertura": {
                            "0": "chantilinho"
                        },
                        "massa": {
                            "0": "Biscoito"
                        },
                        "recheio": {
                            "0": "Brigadeiro trufado e brigadeiro de leite em pó"
                        }
                    },
                    "subtitle": "...",
                    "title": "Bolo cookie 'n creame"
                }
            },
            {
                "-MhxTcVjYi9aIrYi1pV5": {
                    "images": {
                        "0": "gs://dincy-s-cake.appspot.com/imagens/produtos/fatias/maracujá.jpg"
                    },
                    "price": {
                        "grande": "",
                        "medio": "",
                        "pequeno": "",
                        "unidade": "R$3,50"
                    },
                    "sabores": {
                        "massa": {
                            "0": "Cacau"
                        },
                        "recheio": {
                            "0": "Brigadeiro trufado e Maracujá"
                        }
                    },
                    "subtitle": "...",
                    "title": "Bolo explosão de maracujá"
                }
            }
        ],
        "title": "Fatias disponiveis"
    },
    {
        "item": [
            {
                "-MhxTxBmxwbWS966gJOd": {
                    "images": {
                        "0": "gs://dincy-s-cake.appspot.com/imagens/produtos/cupcake/cupcake.jpg"
                    },
                    "price": {
                        "grande": "",
                        "medio": "",
                        "pequeno": "",
                        "unidade": "R$3,50"
                    },
                    "sabores": {
                        "cobertura": {
                            "0": "Chantilinho e brilho"
                        },
                        "massa": {
                            "0": "Chocolate"
                        }
                    },
                    "subtitle": "...",
                    "title": "Jardim secreto"
                }
            }
        ],
        "title": "Cupcakes"
    }
]

*/