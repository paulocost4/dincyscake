import Head from 'next/head'
import { useEffect, useState } from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import Image from 'next/image'
import BannerHorizontal from '../../src/components/BannerPropagandaHorizontal'
import BotaoSubir from '../../src/components/botaoSubir'
import Footer from '../../src/components/footer'
import Navbar from '../../src/components/navbar'
import { realtime, pegarImagem, storage } from '../../src/firebase'

import {
  ProdutoCard, Card, AreaItem, TituloCard, AreaProduto, AreaImagem,
} from '../../styles/Produto.styles' // importações dos styled component
// componentes de estilo global
import { Main } from '../../styles/globalsStyles'

// Definindo os tipos do TypeScript
type Item = {
  images: string[];
  price: {
    grande?: string;
    medio?: string;
    pequeno?: string;
    unidade?: string;
  };
  sabores: {
    cobertura: string[];
    massa: string[];
    recheio?: string[];
  };
  subtitle: string;
  title: string;
};

type VetItens = Array<{
  [nomeProduto: string]: {
    [key: string]: Item;
  };
}>;

type VetCards = Array<{
  [key: string]: {
    item: string[];
    title: string;
  };
}>;

type ProdutosType = Array<{
  title: string;
  item: Array<{
    [key: string]: Item;
  }>;
}>;

// tipos para o metodo RenderizarProduto
type RenderizarProdutoProps = {
  produtos: ProdutosType
}

function RenderizarProduto( { produtos }: RenderizarProdutoProps ) {
  return (

    <ProdutoCard>
      {produtos.map( ( cards ) => (
        // <div>
        <Card key={cards.title}>
          <TituloCard>{cards.title}</TituloCard>
          <AreaProduto>
            {
              cards.item.map( ( item ) => {
                const key = Object.keys( item )[ 0 ]
                const produto = item[ key ]
                return (
                  <AreaItem key={key}>
                    <AreaImagem>
                      <Image height={400} width={300} src={produto.images[ 0 ]} />
                    </AreaImagem>
                    <h1>{produto.title}</h1>
                    <h2>{produto.price.unidade}</h2>
                  </AreaItem>
                )
              } )
            }
          </AreaProduto>
          {/* <RenderizarProduto
                imagem={listImgs[ 0 ]}
                titulo='Bolo Caseirinho'
                valor='R$30,00'
              />
            */}
        </Card>
        // </div>
      ) )}
      {/* <div className={styles.imagem}>
        <Imagens src={[ imagem ]} tipo={[ 'full' ]} />
      </div>
      <div className={styles.infomarçoes}>
        <h1 className={styles.titulo}>{titulo}</h1>
        <h2 className={styles.valor}>{valor}</h2>
      </div>
      <div className={styles.areaButoes}>
        <button type='button' className={styles.botaoDetalhe}>
          DETALHES
        </button>
        <button type='button' className={styles.botaoCarrinho}>
          <FaShoppingCart />
        </button>
      </div> */}
    </ProdutoCard>

  )
}

type PropsProdutos = {
  produtos: ProdutosType;
  logoUrl: string;
};

export default function Produtos( { produtos, logoUrl }: PropsProdutos ) {
  const [ dadosRecebidos, setDadosRecebidos ] = useState( false )

  useEffect( () => {
    setDadosRecebidos( true )
  }, [ produtos ] )

  /*
      dados estruturados para a prop produtos separado por cards (indices do vetor produto)
      produtos => [
        { item: [ [Object], [Object] ], title: 'Bolos para encomenda' },
        { item: [ [Object], [Object] ], title: 'Fatias disponiveis' },
        { item: [ [Object] ], title: 'Cupcakes' }
      ]
    */

  return (
    <div>
      <Head>
        <title>Dincy&prime;s Cake – Produtos</title>
      </Head>
      <Navbar logoUrl={logoUrl} />
      <BannerHorizontal />
      {/* <GoogleAds slot='2194687109'/> */}
      {/* Começar a fazer a guia de produtos daqui
            Bolos caseirinho: 30,00 tradicional e clássico pra comer com café, nos sabores de baunilha, Coco e chocolate.
            Bolo festeiro: 50,00 / 70,00 / 100,00 decorados e confeitados com massas de cacau, baunilha, Coco é biscoito, para recheios opções como brigadeiro trufado, maracujá, Coco, ameixa e brigadeiro de leite em pó e cobertura de chantilinho.
            Bolo psicina: não tenho média ainda
            Cupcakes: 3,00 a unidade / 2 por 5,00 massa de baunilha, Coco, chocolate e biscoito com cobertura de chantilinho
            */}
      <Main>

        <RenderizarProduto produtos={produtos} />

      </Main>
      <BannerHorizontal />
      {/* <GoogleAds slot='3271965051'/> */}
      <BotaoSubir />
      <Footer logoUrl={logoUrl} />
    </div>
  )
}

export async function getStaticProps() {
  console.log( '********* PRODUTOS *********' )
  // console.log('firebaseConfig', firebaseConfig)

  const storageRef = storage.ref( '/imagens' )

  // lista de imagens
  const listImgs = []
  const imgsRef = storageRef.child( '/cake1.jpg' )
  listImgs.push( await pegarImagem( imgsRef ) )

  // LOGO
  const logoref = storageRef.child( '/donut.png' )
  const logoUrl = await pegarImagem( logoref )

  // PRODUTOS

  function parseVet( dados ) {
    const vet = []
    const keys = Object.keys( dados )
    keys.forEach( ( key ) => {
      const value = dados[ key ]
      const obj = {
        [ key ]: value, // propriedade key tem origem na propriedade do objeto dados
      }
      vet.push( obj )
    } )
    return vet // retorna um vetor de objetos
  }

  // Pega url atual da imagem no Firestore e armazena no mesmo local que antes tinha apenas uma url estatica do google, "gs://..."
  async function criarArrayDePromisesDasImagens( produtos ) : Promise<Promise<string>[]> {
    const promisses = []

    produtos.forEach( ( produto ) => {
      produto.item.forEach( async ( value ) => {
        const keyItem = Object.keys( value )[ 0 ] // "-MhxS6SS7yWaysPCATX2"
        const imagem = value[ keyItem ].images[ 0 ]
        const urlRef = storage.refFromURL( imagem )
        const url = pegarImagem( urlRef ) // url recebe uma promisse pendente
        promisses.push( url ) // adiciona uma promisse ao vetor
      } )
    } )
    return promisses // retorna um vetor de promisses
  }

  // Nessa função todas as imagens recebidas dentro do vetor são retornadas ao seu local de origem
  function porAsImagensNosProdutos( vetpromisses: Array<string>, arrayProdutos: ProdutosType ) {
    const value = arrayProdutos
    let aux = 0
    value.forEach( ( produto, indexProduto ) => {
      produto.item.forEach( async ( itemValue, keyValue ) => {
        const keyItem = Object.keys( itemValue )[ 0 ]
        value[ indexProduto ].item[ keyValue ][ keyItem ].images[ 0 ] = vetpromisses[ aux ]
        aux += 1
        // produtos[0].item[0]["-MhxS6SS7yWaysPCATX2"].images[0] = "url da imagem"
      } )
    } )
    return value
  }

  let produtos: ProdutosType
  await realtime
    .ref( '/produtos/' )
    .once( 'value', async ( snapshot ) => {
      // pega todos os dados do arquivo produto se existir

      if ( snapshot.exists() ) {
        const { cards: snapshotCard, itens: snapshotItem } = snapshot.val()
        const vetItens: VetItens = parseVet( snapshotItem ) // transforma em um vetor de objetos
        const vetCards: VetCards = parseVet( snapshotCard ) // transforma em um vetor de objetos

        // Aqui eu realizo algumas transformações nos dados em PRODUTOS e ITENS para que eles fiquem da forma que eu quero utilizar
        const itens: Array<{ [key: string]: Item }> = ( () => {
          const vet = []
          vetItens.forEach( ( value ) => {
            // percorre os itens do vetor
            const keys = Object.keys( value )
            keys.forEach( ( key ) => {
              const item = value[ key ]
              const keyItem = Object.keys( item )
              keyItem.forEach( ( keyP ) => {
                const obj = {
                  [ keyP ]: item[ keyP ],
                }
                vet.push( obj )
              } )
            } )
          } )
          return vet // retorna o vetor com todos os produtos em sequencia, sem estrutura de propriedade e valor senão da propria chave de cada produto
        } )()

        // cards é um objeto no formato =>   {'-MhxQlWhj8kHD4EkwcF3': { item: [Object], title: 'Bolos para encomenda' }}
        produtos = vetCards.map( ( cards ) => {
          const cardKey = Object.keys( cards )[ 0 ]
          const cardItem = cards[ cardKey ].item

          const card = cards[ cardKey ] // É exatamente o objeto dentro do objeto cards, é ai que estão o item e o titulo do card

          const produtosFiltrados = []
          itens.forEach( ( item ) => {
            const produtoKey = Object.keys( item )[ 0 ]
            const KeyCards = Object.keys( cardItem )
            KeyCards.forEach( ( key ) => {
              if ( cardItem[ key ] === produtoKey ) {
                produtosFiltrados.push( item ) //
              }
            } )
          } )

          const obj = {
            title: card.title,
            item: produtosFiltrados,
          }
          return obj // retorna um objeto com item e o titulo do cards, os itens sao organizados da maneira abaixo
          // vetor de vetores de objeto let cards = [ [{'id': value}], [{'id2': value2}, {'id3': value2}] ]
        } )

        // fim do if
      }
    } ) // fim once()
    .catch( ( error ) => global.console.log( 'Erro ao pegar dados no bd {/produtos/}: ', error ) )

  // após o calback da função once do firebase, quero que todas as url estaticas do google sejam tranformadas em urls do dominio firebasestorage.googleapis.com
  try {
    // Pega url atual da imagem no Firestore e armazena no mesmo local que antes tinha apenas uma url estatica do google, "gs://..."

    const vetPromise = await criarArrayDePromisesDasImagens( produtos )

    produtos = await Promise.all( vetPromise ).then( ( values ) => { // resolve todas as promisses e então coloca o resultado das imagens no produto
      const result = porAsImagensNosProdutos( values, produtos )

      return result
    } )
  } catch ( error ) {
    global.console.log( 'erro ao capturar promises => ', error )
  }

  return {
    props: {
      listImgs,
      logoUrl,
      produtos,
    }, // will be passed to the page component as props
  }
}
