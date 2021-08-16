import styles from './Botaosubir.module.css'
import { IoIosArrowUp } from "react-icons/io";
import React, { useEffect } from 'react';


async function irParaOTopo(){
  let botaoSubir = document.getElementsByClassName(styles.botaoSubir)[0]
  
  window.scrollTo({top: 0})
  let aux = 1
  while (aux){
    if( window.scrollY===0 && botaoSubir.classList.length > 1 ){
      console.log(`qtd class: ${botaoSubir.classList.length}, window.scrollY: ${window.scrollY}  `)
      botaoSubir.classList.remove(styles.botaoSubirAtivo)
      aux = 0
    }
  }
}

export default function BotaoSubir(props){

    useEffect(()=>{
        
        document.addEventListener('scroll', (event)=>{
          if(window.scrollY!==0){
            console.log('Evento disparado: ', event.type)
            let botaoSubir = document.getElementsByClassName(styles.botaoSubir)[0]
            botaoSubir.classList.add(styles.botaoSubirAtivo)
          }
        }, )
      }, [])

    return(
        <button onClick={()=>irParaOTopo()} className={styles.botaoSubir}>
            <IoIosArrowUp size='25' color='#fff' />
        </button>
    )
}