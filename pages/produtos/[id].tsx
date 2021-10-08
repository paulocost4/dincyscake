// import Image from 'next/image'
import { GetStaticPropsContext } from 'next'
import Footer from '../../src/components/footer'
import Navbar from '../../src/components/navbar'
import { Container } from '../../styles/Produto.id'
import { realtime } from '../../src/firebase'

export default function Produtos( { id } : {id: string} ) {
  return (
    <Container>
      <Navbar quantidadeCarrinho={0} mostrarCarrinho={false} />
      <main>
        <h1>
          produto id
          {' '}
          {id}
        </h1>
      </main>
      <Footer />
    </Container>
  )
}

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

type ProdutosType = Array<{
  title: string;
  item: Array<{
    [key: string]: Item;
  }>;
}>;

export async function getStaticProps( context: GetStaticPropsContext ) {
  const { id }: {id?: string} = context.params

  // Usar o firebase para pegar as informações do produto com o id certo e renderiza-lo na pagina
  // await realtime.ref( '/produtos/itens' )

  return {
    props: {
      id,
    },
  }
}

export async function getStaticPaths() {
  const arrayId = []

  await realtime.ref( '/produtos/cards' ).once( 'value' ).then( async ( snapshot ) => {
    if ( snapshot.exists() ) {
      const dados = snapshot.toJSON()
      const keys = Object.keys( dados )
      keys.forEach( ( value, index ) => {
        const { item } = dados[ value ]
        console.log( `Itens ${index} key ${value} valor => ${JSON.stringify( item, null, 2 )} ` )
        const keyItens = Object.keys( item )
        keyItens.forEach( ( ( key ) => {
          const idItem = item[ key ]
          arrayId.push( idItem )
        } ) )
      } )
    }
  } )

  const paths = arrayId.map( ( ( idArray ) => ( {
    params: { id: idArray },
  } ) ) )
  console.log( paths )
  return {
    paths,
    fallback: false, // permitir ou não que paginas fora dos path seja renderizada
  }
}
