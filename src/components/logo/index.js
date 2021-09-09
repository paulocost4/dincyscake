/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link'
import Image from 'next/image'
import { AreaLogo, TituloLogo} from './styles'

import logo from '../../../public/images/donut.png'

const {pegarImagem, firebaseConfig} = require('../../firebase')



export default function Logo(props){
  let logoUrl = 'https://firebasestorage.googleapis.com/v0/b/dincy-s-cake.appspot.com/o/imagens%2Fdonut.png?alt=media&token=d84586eb-30ea-4f30-9867-d379be7fb89c'
  return(
    <AreaLogo >
      <Link href='/' >
        <a style={{textDecoration: 'none', flexDirection: 'row', display: 'flex'}}>
            <Image priority={true} objectFit='cover' height='50' width='50' placeholder='blur' src={logoUrl} blurDataURL={logoUrl} alt='Imagem donut'></Image>
          <TituloLogo  >Dincy's Cake</TituloLogo>
        </a>
      </Link>
    </AreaLogo>
  )
}
