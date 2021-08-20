/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from 'react'
import Imagens from '../src/components/Imagens'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Navbar from '../src/components/navbar'
import Logo from '../src/components/logo'
import Footer from '../src/components/footer'
import BotaoSubir from '../src/components/botaoSubir'
// import banner from './images/banner.jpg'
import cake1 from '../public/images/cake1.jpg'
import cake2 from '../public/images/cake2.jpg'
import blueCake from '../public/images/blueCake.jpg'
import pinkCakeCenter from '../public/images/pinkCakeCobertura.jpg'
import cake5 from '../public/images/cake5.jpg'
import cake6 from '../public/images/cake6.jpg'
import cakeAndCupcake from '../public/images/bolo e cupcake.jpg'
// import cake6 from '../public/images/cake6.jpg'
// import cake6 from '../public/images/cake6.jpg'


// import cake7 from './images/cake7.jpg'

// import FontAwesome from 'react-fontawesome';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const {storage, pegarImagem} = require('../src/firebase')
import { firebase } from '../src/firebase'



export async function getStaticProps(context) {
 

  let storageRef = storage.ref( '/imagens' )
  
  // BANNER  
  let bannerImg = storageRef.child('/banner.jpg') 
  let bannerUrl = await pegarImagem( bannerImg )

  // LOGO  
  let logoref = storageRef.child('/donut.png') 
  let logoUrl = await pegarImagem( logoref )
  

  return {
    props: {
      bannerUrl: bannerUrl,
      logoUrl: logoUrl
    }, // will be passed to the page component as props
  }
}





function TextoDaSeçao(props){
  return(
    <section className={styles.textoSeçao}>
      <h1>{props.titulo}</h1>
      <p>{props.texto}</p>
    </section>
  )
}









export default function Home( props ){

  useEffect(()=>{
    // seta o background image de acordo com a imagem recebida do firebase
    // let banner = document.querySelector( `.${styles.banner}` )
    // banner.style.backgroundImage = `url("${props.bannerUrl}")`

  }, [props.bannerUrl])

  

  return (
    
    <div className={styles.App}>
      

        <Navbar logoUrl={props.logoUrl}/>
        
        {/* transformar essea section > .banner em uma Image do nextjs */}
        {/* As imagens estão demorando demais para baixar sem a otimização do */}
        
        {/* BANNER */}
        <section className={styles.banner} >
          <Imagens priority={true} width={1300} height={400} src={[props.bannerUrl]} tipo={['full']} className={styles.imgbanner}/>
          <div className={styles.txtBanner}>
            <h1>Venha conhecer os nossos bolos</h1>
            <h3>Tudo com muito carinho para você</h3>
          </div>
          {/* <button href='#produtos'>SAIBA MAIS</button> */}
        </section>
        
        <main className={styles.main}>
          
            
              

          <TextoDaSeçao titulo='Os nossos bolos' texto='Bolos e cupkakes que agradam ao seu paladar, simplesmente uma explosão de cores e sabor. Além do mais, não tem mal nenhum que um bolo quentinho não ajude a curar.' />
          <div className={styles.imagem}>
            <Imagens src={[cake1, cakeAndCupcake]} tipo={['small', 'medium']} />
          </div>
          
          <TextoDaSeçao  texto='Se nada der certo, tente um saboroso pedaço de bolo com cobertura!' />
          <div className={styles.imagem}>
            <Imagens src={[blueCake, pinkCakeCenter]} tipo={['medium', 'small']} />
          </div>

          <TextoDaSeçao  texto='E para os apaixonados por receitas com maracujá, apresento-lhes a felicidade' />
          <div className={styles.imagem}>
            <Imagens src={[cake5, cake6]} tipo={['small', 'medium']} />
          </div>

            
            
            

        </main>
                    {/* Botão para ir para o topo da pagina */}
        <BotaoSubir />
        
        <Footer logoUrl={props.logoUrl} />
       
      
    </div>
  );

  let home = {  // Estruturar os dados no firebase realtime dessa forma
    card: {     // Objeto com todos os card que serão exibidos na pagina Home
      0: {
        title: '',
        txt: '',
        images: []  // vetor com as imagens a serem utilizadas logo abaixo de cada texto  
      }
    }
  }

  let produtos = {  // Estruturar os dados no firebase realtime dessa forma
    card: {     // Vetor com todos os card que serão exibidos na pagina Home
      0: {
        title: '',    // titulo referente ao card ex: Fatias Disponiveis, Bolos com Cobertura, Cupcakes, 
        item: [0]     // Vetor com os itens associados ao card
      }
    },
    item: {   //Vetor contendo os itens diretamente relacionado com o titulo do card
      0 : {
        //card: 0,    //referencia do card pertencente
        name: '', // nome do item
        info: [     // vetor contendo o preço e seu tamanho relacionada (caso exista varios tipos)
          { 
            text: '', //Descrição do item
            price: '',
            size: '' // pequeno, medio, grande, unidade, 125g...
          }
        ],
        imagem: ''  // imagem a ser utilizada para descrever o item 
      }
    }
  }

}


