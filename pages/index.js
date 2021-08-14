/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Navbar from './src/components/navbar'
import Logo from './src/components/logo'
import Footer from './src/components/footer'
import BotaoSubir from './src/components/botaoSubir'
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



import { useState } from 'react';

function TextoDaSeçao(props){
  return(
    <section className={styles.textoSeçao}>
      <h1>{props.titulo}</h1>
      <p>{props.texto}</p>
    </section>
  )
}

//  ex: <Imagens src={[cake1, cake2]} tipo={['small', 'medium']} />

function Imagens(props){
  return(
    <div className={styles.images}>
      {props.src.map((value, key)=>{
        return(
          <div key={`div${value}${key}`} className={styles[props.tipo[key]]}>
            <Image quality='100' placeholder='blur' className='imgItem' objectFit='cover' layout='fill' key={`Image${value}${key}`} alt={`Imagem bolo: ${value}`} src={value} ></Image>
          </div>
        )
      })}
    </div>
  )
}







export default function Home(){

 

  

  return (
    
    <div className={styles.App}>
      
        <Navbar/>
        
        <section className={styles.banner} >
          <h1>Venha conhecer os nossos bolos</h1>
          <h3>Tudo com muito carinho para você</h3>
          {/* <button href='#produtos'>SAIBA MAIS</button> */}
        </section>
        
        <main className={styles.main}>
          
            
              

          <TextoDaSeçao titulo='Os nossos bolos' texto='Bolos e cupkakes que agradam ao seu paladar, simplesmente uma explosão de cores e sabor. Além do mais, não tem mal nenhum que um bolo quentinho não ajude a curar.' />
          <Imagens src={[cake1, cakeAndCupcake]} tipo={['small', 'medium']} />
          
          <TextoDaSeçao  texto='Se nada der certo, tente um saboroso pedaço de bolo com cobertura!' />
          <Imagens src={[blueCake, pinkCakeCenter]} tipo={['medium', 'small']} />

          <TextoDaSeçao  texto='E para os apaixonados por receitas com maracujá, apresento-lhes a felicidade' />
          <Imagens src={[cake5, cake6]} tipo={['small', 'medium']} />

            
            
            

        </main>
                    {/* Botão para ir para o topo da pagina */}
        <BotaoSubir />
        
        <Footer/>
       
      
    </div>
  );
}


