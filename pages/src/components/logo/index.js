/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link'
import Image from 'next/image'
import styles from './Logo.module.css'

import donut from '../../../../public/images/donut.png'

export default function Logo(){
    return(
      <div className={styles.areaLogo}>
        <Link href='/' >
          <a style={{textDecoration: 'none', flexDirection: 'row', display: 'flex'}}>
            <Image objectFit='cover' className={styles.logo} height='50' width='50' quality='100' placeholder='blur' src={donut} alt='Imagem donut'></Image>
            <h1 className={styles.tituloLogo} >Dincy's Cake</h1>
          </a>
        </Link>
      </div> 
    )
}