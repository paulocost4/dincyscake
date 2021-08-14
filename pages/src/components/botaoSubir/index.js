import styles from './Botaosubir.module.css'
import { IoIosArrowUp } from "react-icons/io";
import { useEffect } from 'react';



export default function BotaoSubir(props){

    useEffect(()=>{
        addEventListener('scroll', (event)=>{
          console.log('Evento disparado: ', event.type)
          let botaoSubir = document.getElementsByClassName(styles.botaoSubir)[0]
          botaoSubir.classList.add(styles.botaoSubirAtivo)
        })
        removeEventListener('scroll', null)
      }, [])

    return(
        <button className={styles.botaoSubir}>
            <IoIosArrowUp size='25' color='#fff' />
        </button>
    )
}