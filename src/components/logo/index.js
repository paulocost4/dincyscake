/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link'
import Image from 'next/image'
import styles from './Logo.module.css'

import donut from '../../../public/images/donut.png'
import { useEffect, useState } from 'react'
const firebase = require('../../firebase')
import  '../../firebase'


export default function Logo(){
  let [urlLogo, setUrlLogo] = useState('')
  
  
  useEffect(()=>{
    console.log('Storage :', firebase.firebaseConfig)

    // descobrir o porquê de dar erro quando eu tendo acessar o storage daqui
    
    // let storageRef = firebase.storage.ref( '/imagens' )
    // let bannerImg = storageRef.child('donut.png') 
    // let bannerUrl = firebase.pegarImagem( bannerImg )

    
  } ,[])

    return(
      <div className={styles.areaLogo}>
        <Link href='/' >
          <a style={{textDecoration: 'none', flexDirection: 'row', display: 'flex'}}>
            {
              ()=>{
                if(urlLogo !== 'erro' && urlLogo.length > 0){
                  return(
                    <Image objectFit='cover' className={styles.logo} height='50' width='50' quality='100' placeholder='blur' src={urlLogo} blurDataURL={urlLogo} alt='Imagem donut'></Image>
                  )
                }
              }
            }
            <h1 className={styles.tituloLogo} >Dincy's Cake</h1>
          </a>
        </Link>
      </div> 
    )
}