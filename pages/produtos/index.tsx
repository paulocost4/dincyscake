import Head from 'next/head'
import { FaShoppingCart } from 'react-icons/fa'
import Image from 'next/image'
import BannerHorizontal from '../../src/components/BannerPropagandaHorizontal'
import Footer from '../../src/components/footer'
import Navbar from '../../src/components/navbar'
import { realtime, pegarImagem, storage } from '../../src/firebase'

import {
  CardsArea, Card, AreaItem, AreaProduto, AreaImagem, AreaBotao, Botao, Preco, Linha,
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
    // Area em volta de todos os cards
    <CardsArea>
      {produtos.map( ( cards, index ) => (
        // Card com os produtos e titulo do card
        <div key={cards.title}>

          <Card key={cards.title}>
            <h1>{cards.title}</h1>
            {/* Area com todos os produtos do card dentro */}
            <AreaProduto>
              {
              cards.item.map( ( item ) => {
                const keyItem = Object.keys( item )[ 0 ]
                const produto = item[ keyItem ]
                const keyPrices = Object.keys( produto.price )
                let menorPreco = 999
                let qtdItensMaiorQueZero = 0
                // continuar aqui
                keyPrices.forEach( ( key ) => { // faz uma concatenação com os preços pra exibir eles no formato R$3,50 / R$30,50 / R$5,50
                  const preco = Number( produto.price[ key ].replace( 'R$', '' ).replace( ',', '.' ) ) // Retira o R$ se houver e troca a , pelo .
                  qtdItensMaiorQueZero = preco ? qtdItensMaiorQueZero + 1 : qtdItensMaiorQueZero // adiciona mais um se houver um item maior que 0
                  if ( produto.price[ key ] !== '' && preco < menorPreco ) {
                    menorPreco = preco
                  }
                } )
                const textoPreco = `${qtdItensMaiorQueZero > 1 ? 'Apartir de' : ''}`
                const preco = `R$ ${menorPreco.toFixed( 2 )}`
                // definir aqui a altura e largura usadas nos componentes areaimagem e Image
                // proporção 4:3 => 8:6
                const imgHeight = 228
                const imgWidth = 304
                return (
                  // Area com item propriamente dito, com imagem, titulo e preço
                  <AreaItem key={keyItem}>
                    <AreaImagem height={imgHeight} width={imgWidth}>
                      <Image height={imgHeight} width={imgWidth} objectFit='fill' src={produto.images[ 0 ]} />
                    </AreaImagem>
                    <h1>{produto.title}</h1>
                    <Preco disable={textoPreco === ''}>
                      <p>
                        { textoPreco }
                        &nbsp;
                      </p>
                      <h2>{ preco }</h2>
                    </Preco>
                    <AreaBotao>
                      <Botao>COMPRAR</Botao>
                      <FaShoppingCart size='16' className='botaoCarrinho' />
                    </AreaBotao>
                  </AreaItem>
                )
              } )
            }
            </AreaProduto>
          </Card>
          {/* Renderiza uma linha apoós cada card, exceto na ultima linha */}
          {produtos.length - 1 !== index ? <Linha /> : null}
        </div>

      ) )}
    </CardsArea>

  )
}

type PropsProdutos = {
  produtos: ProdutosType;
  logoUrl: string;
};

export default function Produtos( { produtos, logoUrl }: PropsProdutos ) {
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
      <Navbar logoUrl={logoUrl} mostrarCarrinho={false} quantidadeCarrinho={0} />
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
