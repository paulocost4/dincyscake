/* eslint-disable react/no-unescaped-entities */
import styles from './Produtos.module.css'
import Navbar from '../../src/components/navbar'
import Footer from '../../src/components/footer'
import Imagens from '../../src/components/Imagens'
import BannerHorizontal from '../../src/components/BannerPropagandaHorizontal'
import GoogleAds from '../../src/components/GoogleAds'
import BotaoSubir from '../../src/components/botaoSubir'
import Head from 'next/head'
import {FaShoppingCart} from   'react-icons/fa'


import { firebase, realtime, pegarImagem, firebaseConfig, storage } from '../../src/firebase'


export async function getStaticProps(context) {
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
    // let produtos = (await realtime.ref('/produtos/').get()).toJSON()
    
    
    
    
    let produtos = {
        "cards" : {
          "-MhxQlWhj8kHD4EkwcF3" : {
            "item" : [ "-MhxS6SS7yWaysPCATX2", "-MhxSyKfDFn4l40NI7ZJ" ],
            "keyItem" : "bolos",
            "title" : "Bolos para encomenda"
          },
          "-MhxQlWnUQtv6Wl48XF_" : {
            "item" : [ "-MhxTPFXiISY1nXNhASv", "-MhxTcVjYi9aIrYi1pV5" ],
            "keyItem" : "fatias",
            "title" : "Fatias disponiveis"
          },
          "-MhxQlWpkg5zFDBtj8Ui" : {
            "item" : [ "-MhxTxBmxwbWS966gJOd" ],
            "keyItem" : "cupcakes",
            "title" : "Cupcakes"
          }
        },
        "itens": {
          "bolos" : {
            "-MhxS6SS7yWaysPCATX2" : {
              "images" : [ "gs://dincy-s-cake.appspot.com/imagens/produtos/bolo caseirinho/caseirinho.jpg" ],
              "price" : {
                "grande" : "",
                "medio" : "",
                "pequeno" : "",
                "unidade" : "R$30,00"
              },
              "sabores" : {
                "cobertura" : [ "" ],
                "massa" : [ "Baunilha", "Coco", "Chocolate" ]
              },
              "subtitle" : "tradicional e clássico pra comer com café,",
              "title" : "Bolo caseirinho"
            },
            "-MhxSyKfDFn4l40NI7ZJ" : {
              "images" : [ "gs://dincy-s-cake.appspot.com/imagens/produtos/bolo festeiro/20210822_115717.jpg" ],
              "price" : {
                "grande" : "R$100,00",
                "medio" : "R$70,00",
                "pequeno" : "R$50,00",
                "unidade" : ""
              },
              "sabores" : {
                "cobertura" : [ "chantilinho" ],
                "massa" : [ "cacau", "baunilha", "Coco", "biscoito" ],
                "recheio" : [ "brigadeiro trufado", "maracujá", "Coco", "Ameixa", "brigadeiro de leite em pó" ]
              },
              "subtitle" : "Decorados e confeitados com massas de cacau, baunilha, Coco e biscoito, para recheios opções como brigadeiro trufado, maracujá, Coco, ameixa e brigadeiro de leite em pó e cobertura de chantilinho.",
              "title" : "Bolo festeiro"
            }
          },
          "cupcakes" : {
            "-MhxTxBmxwbWS966gJOd" : {
              "price" : {
                "grande" : "",
                "medio" : "",
                "pequeno" : "",
                "unidade" : "R$3,50"
              },
              "sabores" : {
                "cobertura" : [ "Chantilinho e brilho" ],
                "massa" : [ "Chocolate" ]
              },
              "subtitle" : "...",
              "title" : "Jardim secreto"
            },
            "images" : [ "gs://dincy-s-cake.appspot.com/imagens/produtos/cupcake/cupcake.jpg" ]
          },
          "fatias" : {
            "-MhxTPFXiISY1nXNhASv" : {
              "images" : [ "gs://dincy-s-cake.appspot.com/imagens/produtos/fatias/maracujá.jpg" ],
              "price" : {
                "grande" : "",
                "medio" : "",
                "pequeno" : "",
                "unidade" : "R$5,00"
              },
              "sabores" : {
                "cobertura" : [ "chantilinho" ],
                "massa" : [ "Biscoito" ],
                "recheio" : [ "Brigadeiro trufado e brigadeiro de leite em pó" ]
              },
              "subtitle" : "...",
              "title" : "Bolo cookie 'n creame"
            },
            "-MhxTcVjYi9aIrYi1pV5" : {
              "images" : [ "gs://dincy-s-cake.appspot.com/imagens/produtos/fatias/maracujá.jpg" ],
              "price" : {
                "grande" : "",
                "medio" : "",
                "pequeno" : "",
                "unidade" : "R$3,50"
              },
              "sabores" : {
                "massa" : [ "Cacau" ],
                "recheio" : [ "Brigadeiro trufado e Maracujá" ]
              },
              "subtitle" : "...",
              "title" : "Bolo explosão de maracujá"
            }
          }
        }
      }
      
        
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

    let vetItens = parseVet(produtos.itens)    
    let vetCards = parseVet(produtos.cards)
    
    let itens = ( ()=>{
        let vet = []
                          //0
        vetItens.forEach( value =>{
            let itens = value   
            //bolos
            for( let key in itens){
                let produtos = itens[key]

                for( let produtoKey in produtos )
                {
                    // console.log(produtos[produtoKey])
                    vet.push(produtos[produtoKey])
                }   
            } 
        } )
        return vet
    } )();

    // FIltrar aqui...

    // let cards = []
    // cards = vetCards.map( (cards, cardsIndex) => {
    //     vetItens.filter( (produtos, itemIndex) => {
    //         vetCards.item.forEach( cardItemKey =>{
    //             // if (cardItemKey === ){

    //             // }
    //         } )
    //     } )
    // } )



    // Criar a logica aqui para pegar apenas os itens de um card e salva los em uma variavel

    // cards = vetItens.filter( (value) => {

    // } )
    

  

    console.log('********* PRODUTOS *********')

    realtime

    return {
      props: {
          listImgs: listImgs,
          logoUrl: logoUrl
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

function Categorias({titulo, listImgs}){
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

function produtos(props){
    
    return(
        <div>
            <Head>
                <title>Dincy's Cake – Produtos</title> 
            </Head>
            <Navbar logoUrl={props.logoUrl} />
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
                   <Categorias listImgs={props.listImgs} titulo='Bolos para encomendar' /> */}



                </section>


                
            </main>
            <BannerHorizontal/>
            {/* <GoogleAds slot='3271965051'/> */}
            <BotaoSubir/>
            <Footer logoUrl={props.logoUrl} />
        </div>
    )
}

export default produtos


// Google adsense
// 50.000  =>  $1,920
// 200     =>  $7.68         