/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link'
import Image from 'next/image'
import styles from './Logo.module.css'

import logo from '../../../public/images/donut.png'

const {pegarImagem, firebaseConfig} = require('../../firebase')



export default function Logo(props){
  return(
    <div className={styles.areaLogo}>
      <Link href='/' >
        <a style={{textDecoration: 'none', flexDirection: 'row', display: 'flex'}}>
            <Image priority={true} objectFit='cover' className={styles.logo} height='50' width='50' quality='100' placeholder='blur' src={props.logoUrl} blurDataURL={props.logoUrl} alt='Imagem donut'></Image>
          <h1 className={styles.tituloLogo} >Dincy's Cake</h1>
        </a>
      </Link>
    </div> 
  )
}