/* eslint-disable react/no-unescaped-entities */
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io'
import { FaShoppingCart } from 'react-icons/fa'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Logo from '../logo'
import {
  AreaNavBar, ContadorCarrinho, ItemNavBar, NavBar, PopUpSobre, PorpUpItem,
} from './styles'

function popUp() {
  const botaoSobre = ( document.getElementById( 'Sobre' ) as HTMLButtonElement )
  const janelaPopUp = ( document.getElementById( 'popUpSobre' ) as HTMLDivElement )
  const posiçaoDoSobre = botaoSobre.getBoundingClientRect()

  if ( janelaPopUp.style.display === 'none' || janelaPopUp.style.display === '' ) {
    const { innerWidth } = window
    console.log( 'InnerWidth: ', innerWidth )
    if ( ( innerWidth < 930 && innerWidth > 700 ) || innerWidth < 400 ) {
      janelaPopUp.style.left = `${innerWidth - 240}px`
      // popUp.style.right = `0px` // Entre 860 e 700 e em qualquer valor abaixo de 561 , usar right= tamanho da tela menos o tamanho do popUp
    } else {
      const novaEsquerda = posiçaoDoSobre.left - ( 240 - posiçaoDoSobre.width ) / 2 // diminui pela metade da largura do popUp para conseguir centralizar com o SOBRE
      janelaPopUp.style.left = `${novaEsquerda}px`
    }

    janelaPopUp.style.top = `${posiçaoDoSobre.bottom + 5}px`
    janelaPopUp.style.display = 'block' // Torna o popUp visivel
    console.log( 'Abre poPup' )
    // Altera ascores enquanto o popUp estiver aberto
    botaoSobre.style.color = '#fff'
    botaoSobre.style.backgroundColor = '#f12a5e'
  } else {
    janelaPopUp.style.display = 'none'
    console.log( 'Fecha popPup' )

    botaoSobre.style.color = ''
    botaoSobre.style.backgroundColor = ''
  }
  console.log( 'pop up: ', janelaPopUp.style.left, janelaPopUp.style.right, janelaPopUp.style.top )
  console.log( posiçaoDoSobre )
}
interface NavBarProps{
  mostrarCarrinho: boolean
  quantidadeCarrinho: number
}

export default function Navbar( { mostrarCarrinho, quantidadeCarrinho }: NavBarProps ) {
  const [ popUpStatus, setPopUpStatus ] = useState( 0 )
  const boundingClientRectObj:DOMRect = {
    height: 0,
    width: 0,
    x: 0,
    y: 0,
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    toJSON() {
      throw new Error( 'Function not implemented.' )
    },
  }
  const [ carrinhoBoundingClientRect, setCarrinhoBoundingClientRect ] = useState( boundingClientRectObj )

  function setPosicaoCarrinho() {
    const carrinho = ( document.getElementById( 'carrinho' ) as HTMLElement )
    const clientRect = carrinho.getBoundingClientRect()
    setCarrinhoBoundingClientRect( clientRect )
  }

  useEffect( () => {
    if ( mostrarCarrinho ) {
      window.addEventListener( 'resize', () => setPosicaoCarrinho() ) // altera a posiçao do contador sempre que a tela for redimensionada
      setPosicaoCarrinho()
    }
  }, [] )

  return (
    <AreaNavBar>
      <Logo />
      <NavBar>
        <Link href='/'><ItemNavBar>Home</ItemNavBar></Link>
        <Link href='/produtos'><ItemNavBar>Produtos</ItemNavBar></Link>
        <Link href='/encomendas'><ItemNavBar>Encomendas</ItemNavBar></Link>
        <ItemNavBar // Item sobre
          id='Sobre'
          onClick={
            popUpStatus ? () => {
              setPopUpStatus( 0 )
              popUp() // Abre ou fecha o popUp   //Renderiza a seta para baixo ou para frente
            } : () => {
              setPopUpStatus( 1 )
              popUp() // Abre ou fecha o popUp   //Renderiza a seta para baixo ou para frente
            } // Muda o status do popUp
          }
        >

          Sobre
          {popUpStatus ? <IoIosArrowDown style={{ marginLeft: 5 }} /> : <IoIosArrowForward style={{ marginLeft: 5 }} /> }

        </ItemNavBar>
        { mostrarCarrinho ? (
          <Link href='#carrinho'>
            <ItemNavBar>
              <FaShoppingCart id='carrinho' />
              <ContadorCarrinho carrinhoBoundingClientRect={carrinhoBoundingClientRect}>
                {/* Resolver o problema do hover no carrinho */}
                {quantidadeCarrinho}
              </ContadorCarrinho>
            </ItemNavBar>
          </Link>
        ) : null}

        {/** *********     POPUP     ********** */}

        <PopUpSobre id='popUpSobre'>
          <Link passHref href='/sobre/dincy'>
            <PorpUpItem>
              <p>A Dincy's Cake</p>
              <IoIosArrowForward style={{ marginLeft: 5 }} />
            </PorpUpItem>
          </Link>
          <Link passHref href='/sobre/desenvolvimento'>
            <PorpUpItem>
              <p>Desenvolvimento do site</p>
              <IoIosArrowForward style={{ marginLeft: 5 }} />
            </PorpUpItem>
          </Link>
        </PopUpSobre>
      </NavBar>
    </AreaNavBar>
  )
}
