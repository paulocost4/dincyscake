/* eslint-disable react/no-unescaped-entities */
import styles from './Produtos.module.css'
import Navbar from '../../src/components/navbar'
import Footer from '../../src/components/footer'
import Imagens from '../../src/components/Imagens'
import BannerHorizontal from '../../src/components/BannerPropagandaHorizontal'
import GoogleAds from '../../src/components/GoogleAds'
import BotaoSubir from '../../src/components/botaoSubir'
import Head from 'next/dist/shared/lib/head'
import {FaShoppingCart} from   'react-icons/fa'
import {storage} from '../../src/firebase'

const firebase = require('../../src/firebase/')

export async function getStaticProps(context) {
    console.log('********* PRODUTOS *********')
    let storageRef = firebase.storage.ref('/imagens/cake1.jpg')
    // let storageRef = firebase.storage.ref('/imagens')
    let listImgs = []
    //Download firebase storage
    
    listImgs.push( await firebase.pegarImagem( storageRef ) ) 
    
    console.log(listImgs)  

    return {
      props: {
          listImgs: listImgs
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
        <section className={styles.section} >
            <h1 className={styles.titulo}>{titulo}</h1>
            <section className={styles.areaProdutos} >
                <RenderizarProduto imagem={ listImgs[0] } titulo='Bolo Caseirinho' valor='R$30,00' />
                <RenderizarProduto imagem={ listImgs[0] } titulo='Bolo Caseirinho' valor='R$30,00' />                        
                <RenderizarProduto imagem={ listImgs[0] } titulo='Bolo Caseirinho' valor='R$30,00' />
            </section>
        </section>
    )
}

function produtos({listImgs}){
    
    return(
        <div>
            <Head>
                <title>Dincy's Cake – Produtos</title> 
            </Head>
            <Navbar/>
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

                   <Categorias listImgs={listImgs} titulo='Fatias Disponiveis' />
                   <Categorias listImgs={listImgs} titulo='Bolos para encomendar' />



                </section>


                
            </main>
            <BannerHorizontal/>
            {/* <GoogleAds slot='3271965051'/> */}
            <BotaoSubir/>
            <Footer/>
        </div>
    )
}

export default produtos


// Google adsense
// 50.000  =>  $1,920
// 200     =>  $7.68         