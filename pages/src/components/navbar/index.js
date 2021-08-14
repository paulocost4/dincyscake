/* eslint-disable react/no-unescaped-entities */
import { IoIosArrowDown, IoIosArrowUp, IoIosArrowForward } from "react-icons/io";
import Link from 'next/link'
import Logo from '../logo'
import { useState } from 'react'
import styles from './Navbar.module.css'



function popUp(){
  let botaoSobre = document.getElementsByClassName(styles.itemNavBar)[3]
  let popUp = document.getElementsByClassName(styles.popUpSobre)[0]
  let posiçaoDoSobre = botaoSobre.getBoundingClientRect()
  
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

export default function Navbar (props){
    let [popUpStatus, setPopUpStatus] = useState(0)
    return(
      <div className={styles.areaNavBar}>
      <Logo/> 
      <nav className={styles.navBar}>
        <Link  href="/"><a className={styles.itemNavBar} >Home</a></Link>
        <Link href="/produtos"><a className={styles.itemNavBar} >Produtos</a></Link>
        {/* <Link href="/imagens"><a className={styles.itemNavBar} >Imagens</a></Link> */}
        <Link href="/encomendas"><a className={styles.itemNavBar} >Encomendas</a></Link>
        <button className={styles.itemNavBar} href="" 
          onClick={()=>{
            popUpStatus ? setPopUpStatus(0) : setPopUpStatus(1) //Muda o status do popUp
            popUp() //Abre ou fecha o popUp   //Renderiza a seta para baixo ou para frente
          }}>Sobre {popUpStatus ? <IoIosArrowDown className={styles.arrowSobre}/> : <IoIosArrowForward className={styles.arrowSobre}/> } 
        </button>
  
        {/***********     POPUP     ***********/}
  
        <div className={styles.popUpSobre}>
          <Link passHref href='/sobre/dincy' >
            <a>
              <p>A Dincy's Cake</p> 
              <IoIosArrowForward className={styles.arrowSobre}/>
            </a>
          </Link>
          <Link passHref href='/sobre/desenvolvimento' >
            <a>
              <p>Desenvolvimento do site</p>
              <IoIosArrowForward className={styles.arrowSobre}/>
            </a>
          </Link>
        </div>
      </nav>
    </div>
    )
  }