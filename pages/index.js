/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import BotaoSubir from '../src/components/botaoSubir'
import Footer from '../src/components/footer'
import Imagens from '../src/components/Imagens'
import Logo from '../src/components/logo'
import Navbar from '../src/components/navbar'

// const {storage, pegarImagem} = require('../src/firebase')
import {
  firebase,
  firebaseConfig,
  pegarImagem,
  realtime,
  storage,
} from '../src/firebase'
import styles from '../styles/Home.module.css'

export async function getStaticProps(context) {
  console.log('***** HOME  *****')

  const storageRef = storage.ref('/imagens')

  // BANNER
  const bannerImg = storageRef.child('/banner.jpg')
  const bannerUrl = await pegarImagem(bannerImg)

  // LOGO
  const logoref = storageRef.child('/donut.png')
  const logoUrl = await pegarImagem(logoref)

  // pega os dados dos posts diretamente do firebase
  const cardsRef = realtime.ref('/home').child('/cards')
  const cards = await (await cardsRef.get()).toJSON()

  // Pega as imagens do firebase storage baseado na url armanezada no realtime database
  for (const key in cards) {
    const { images } = cards[key]
    for (const keyImg in images) {
      const imgRef = storage.refFromURL(images[keyImg])
      images[keyImg] = await pegarImagem(imgRef)
    }
  }

  // Transforma o objeto JSON em um vetor de objetos
  const cardsVet = []
  for (const key in cards) {
    const { images, txt, title } = cards[key]
    cardsVet.push({
      key,
      images,
      txt,
      title,
    })
  }

  console.log('***** HOME  *****')

  return {
    props: {
      bannerUrl,
      logoUrl,
      cards: cardsVet,
    }, // will be passed to the page component as props
    // revalidate: 900 // Compila a pagina novamente a cada 900 segundos (15 minutos)
  }
}

function TextoDaSeçao(props) {
  return (
    <section className={styles.textoSeçao}>
      <h1>{props.titulo}</h1>
      <p>{props.texto}</p>
    </section>
  )
}

function RenderizarCards({ cards }) {
  console.log('RenderizarCards')
  // console.log(cards)

  return (
    <div>
      {cards.map((value) => {
        console.log(value)
        const {
          title, txt, images, key,
        } = value
        return (
          <div key={key}>
            <TextoDaSeçao
              titulo={title === 'undefined' ? '' : title}
              texto={txt}
            />
            <div className={styles.imagem}>
              {Object.keys(images).length === 1 ? (
                <Imagens src={[images['0']]} tipo={['large']} />
              ) : (
                <Imagens
                  src={[images['0'], images['1']]}
                  tipo={['small', 'medium']}
                />
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function Home(props) {
  const [cards, setCards] = useState(props.cards)

  // console.log(props.cards)

  return (
    <div className={styles.App}>
      <Navbar logoUrl={props.logoUrl} />

      {/* transformar essea section > .banner em uma Image do nextjs */}
      {/* As imagens estão demorando demais para baixar sem a otimização do */}

      {/* BANNER */}
      <section className={styles.banner}>
        <Imagens
          priority
          width={1300}
          height={400}
          src={[props.bannerUrl]}
          tipo={['full']}
          className={styles.imgbanner}
        />
        <div className={styles.txtBanner}>
          <h1>Venha conhecer os nossos bolos</h1>
          <h2>Tudo com muito carinho para você</h2>
        </div>
        {/* <button href='#produtos'>SAIBA MAIS</button> */}
      </section>

      <main className={styles.main}>
        <RenderizarCards cards={cards} />
      </main>


      <Footer logoUrl={props.logoUrl} />
    </div>
  )

  // estrutura do banco de dados

  // let home = {  // Estruturar os dados no firebase realtime dessa forma
  //   card: {     // Objeto com todos os card que serão exibidos na pagina Home
  //     0: {
  //       title: '',
  //       txt: '',
  //       images: []  // vetor com as imagens a serem utilizadas logo abaixo de cada texto
  //     }
  //   }
  // }

  // let produtos = {  // Estruturar os dados no firebase realtime dessa forma
  //   card: {     // Vetor com todos os card que serão exibidos na pagina Home
  //     0: {
  //       title: '',    // titulo referente ao card ex: Fatias Disponiveis, Bolos com Cobertura, Cupcakes,
  //       item: [0]     // Vetor com os itens associados ao card
  //     }
  //   },
  //   item: {   //Vetor contendo os itens diretamente relacionado com o titulo do card
  //     0 : {
  //       //card: 0,    //referencia do card pertencente
  //       name: '', // nome do item
  //       info: [     // vetor contendo o preço e seu tamanho relacionada (caso exista varios tipos)
  //         {
  //           text: '', //Descrição do item
  //           price: '',
  //           size: '' // pequeno, medio, grande, unidade, 125g...
  //         }
  //       ],
  //       imagem: ''  // imagem a ser utilizada para descrever o item
  //     }
  //   }
  // }
}
