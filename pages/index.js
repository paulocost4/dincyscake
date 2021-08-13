import React from 'react'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import donut from '../public/images/donut.png'
// import banner from './images/banner.jpg'
import cake1 from '../public/images/cake1.jpg'
import cake2 from '../public/images/cake2.jpg'
import cake3 from '../public/images/cake3.jpg'
import cake4 from '../public/images/cake4.jpg'
import cake5 from '../public/images/cake5.jpg'
import cake6 from '../public/images/cake6.jpg'
// import cake7 from './images/cake7.jpg'

// import FontAwesome from 'react-fontawesome';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { useState } from 'react';

function TextoDaSeçao(props){
  return(
    <section className={styles.textoSeçao}>
      <h3>{props.titulo}</h3>
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
          <div className={styles[props.tipo[key]]}>
            <Image layout='fill' key={`${value}${key}`}  src={value} ></Image>
          </div>
        )
      })}
    </div>
  )
}

function Logo(){
  return(
    <div className={styles.areaLogo}>
      <a href='#home' style={{textDecoration: 'none', flexDirection: 'row', display: 'flex'}}>
        <Image objectFit='cover' className={styles.logo} height='50' width='50' quality='100' placeholder='blur' src={donut} alt='Imagem donut'></Image>
        <h1 className={styles.tituloLogo} >Dincy's Cake</h1>
      </a>
    </div> 
  )
}

function popUp(){
  let botaoSobre = document.querySelector("#__next > div > div > nav > button")
  let posiçaoDoSobre = botaoSobre.getBoundingClientRect()
  let popUp = document.querySelector("#__next > div > div > nav > div")
  
  if(popUp.style.display==='none' || popUp.style.display===''){
    

    let {innerWidth} = window
    console.log('InnerWidth: ', innerWidth)
    if( (innerWidth < 930 && innerWidth > 700) || innerWidth < 400 ){
      popUp.style.left = `${innerWidth-240}px`
      // popUp.style.right = `0px` // Entre 860 e 700 e em qualquer valor abaixo de 561 , usar right= tamanho da tela menos o tamanho do popUp 
    }
    else{
      let novaEsquerda = posiçaoDoSobre.left - ( 240 - posiçaoDoSobre.width )/2  //diminui pela metade da largura do popUp para conseguir centralizar com o SOBRE
      popUp.style.left = `${novaEsquerda}px`
    }      
    
    popUp.style.top = `${posiçaoDoSobre.bottom}px`
    popUp.style.display = 'block' //Torna o popUp visivel
    console.log('Abre poPup')
    //Altera ascores enquanto o popUp estiver aberto
    botaoSobre.style.color= '#fff'
    botaoSobre.style.backgroundColor = '#f12a5e'
  } 
  else{
    popUp.style.display = 'none'
    console.log('Fecha popPup')

    botaoSobre.style.color= ''
    botaoSobre.style.backgroundColor = ''
  }
  console.log("pop up: ", popUp.style.left, popUp.style.right, popUp.style.top)
  console.log(posiçaoDoSobre)

}


export default function Home(){
  let [popUpStatus, setPopUpStatus] = useState(0)

  return (
    
    <div className={styles.App}>
        <div className={styles.areaNavBar}>
          <Logo/> 
          <nav className={styles.navBar}>
            <a className={styles.itemNavBar} href="#home">Home</a>
            <a className={styles.itemNavBar} href="#produtos">Produtos</a>
            {/* <a className={styles.itemNavBar} href="#imagens">Imagens</a> */}
            <a className={styles.itemNavBar} href="#encomendas">Encomendas</a>
            <button className={styles.itemNavBar} href="" 
              onClick={()=>{
                popUpStatus ? setPopUpStatus(0) : setPopUpStatus(1) //Muda o status do popUp
                popUp() //Abre ou fecha o popUp   //Renderiza a seta para baixo ou para frente
              }}>Sobre {popUpStatus ? <IoIosArrowDown className={styles.arrowSobre}/> : <IoIosArrowForward className={styles.arrowSobre}/> } 
            </button>
            <div className={styles.popUpSobre}>
              <a href='a ser criado' ><p>A Dincy's Cake</p> <IoIosArrowForward className={styles.arrowSobre} /> </a>
              <a href='a ser criado' ><p>Desenvolvimento do site</p> <IoIosArrowForward className={styles.arrowSobre} /> </a>
            </div>
          </nav>
        </div>
        
        <section className={styles.banner} >
          <h1>Venha conhecer os nossos bolos</h1>
          <h3>Tudo com muito carinho para você</h3>
          {/* <button href='#produtos'>SAIBA MAIS</button> */}
        </section>
        
        <main className={styles.main}>
          
            
              

          <TextoDaSeçao titulo='Os nossos bolos' texto='Bolos e cupkakes que agradam ao seu paladar, simplesmente uma explosão de cores e sabor. Além do mais, não tem mal nenhum que um bolo quentinho não ajude a curar.' />
          <Imagens src={[cake1, cake2]} tipo={['small', 'medium']} />
          
          <TextoDaSeçao  texto='Se nada der certo, tente um saboroso pedaço de bolo com cobertura!' />
          <Imagens src={[cake3, cake4]} tipo={['medium', 'small']} />

          <TextoDaSeçao  texto='E para os apaixonados por receitas com maracujá, apresento-lhes a felicidade' />
          <Imagens src={[cake5, cake6]} tipo={['small', 'medium']} />

            
            
            

        </main>

        <footer className={styles.footer}>
          
          <div className={styles.column1}>
            <Logo/>
            <p>"Apenas uma lojinha de bolo começando a brilhar, ajude-nos nessa jornada"</p>
            <p>Dincy's Cake { new Date().getFullYear().toString() === '2021' ? '2021' : '2021-' + new Date().getFullYear().toString() } ©</p>
          </div><hr/>

          <div className={styles.column2}>
            <h4>Entre em contato</h4>
            <div className={styles.areaContatos} >
                <p>(74) 98825-7734</p>
                <p>Rua Dr Clodoaldo Avelino N° 680 Centro</p>
                <p>pcesarcosta@outlook.com</p>
              <div className={styles.areaIcones}>
                <a target='_blank' href='https://www.instagram.com/dincyscake/' rel="noreferrer" ><FaInstagram className={styles.iconFooter} /></a>
                <a target='_blank' href='https://www.facebook.com/profile.php?id=100011493946134' rel="noreferrer" ><FaFacebook className={styles.iconFooter}/></a>
                <a target='_blank' href='https://api.whatsapp.com/send?phone=+55(74)98825-7734' rel="noreferrer" ><FaWhatsapp className={styles.iconFooter} /></a>
                
                
                
              </div>    
            </div>
          </div><hr/>
          
          <div className={styles.column3}>
            <h4>Projeto</h4>
            <a href='#pagina a ser construida' ><p>Suporte</p></a>
            <a href='#pagina a ser construida' ><p>Sugestões</p></a>
            <a href='#pagina a ser construida' ><p>Ajude o projeto</p></a>
            <p>Desenvolvido por Paulo Costa</p>
          </div>

        </footer>
      
    </div>
  );
}


