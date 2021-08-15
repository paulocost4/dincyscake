/* eslint-disable react/no-unescaped-entities */
import styles from './Produtos.module.css'
import Navbar from '../src/components/navbar'
import Footer from '../src/components/footer'
import Imagens from '../src/components/Imagens'
import BannerHorizontal from '../src/components/BannerPropagandaHorizontal'
import GoogleAds from '../src/components/GoogleAds'
import BotaoSubir from '../src/components/botaoSubir'
import Head from 'next/dist/shared/lib/head'

import cake1 from '../../public/images/cake1.jpg'

function produtos(){
    
    return(
        <div>
            <Head>
                <title>Dincy's Cake – Produtos</title> 
            </Head>
            <Navbar/>
            <BannerHorizontal/>
            {/* <GoogleAds slot='2194687109'/> */}
{/* Começar a fazer a guia de produtos daqui 
Bolos caseirinho: 30,00 tradicional e clássico pra comer com café, nos sabores de baunilha, Coco e chocolate.
Bolo festeiro: 50,00 / 70,00 / 100,00 decorados e confeitados com massas de cacau, baunilha, Coco é biscoito, para recheios opções como brigadeiro trufado, maracujá, Coco, ameixa e brigadeiro de leite em pó e cobertura de chantilinho.
Bolo psicina: não tenho média ainda 
Cupcakes: 3,00 a unidade / 2 por 5,00 massa de baunilha, Coco, chocolate e biscoito com cobertura de chantilinho
*/}
            <main>
                <section className={styles.section} >
                    <h1>Conheça nossos produtos</h1>
                    
                    <div className={styles.produtos}>
                        <div>
                            <div>
                                <h1>Bolo caseirinho</h1>
                                <h2>Valor: R$ 30,00</h2>
                            </div>
                            <h3>Tradicional e clássico pra comer com café</h3>
                            <div>
                                <p>Sabores: baunilha, coco e chocolate.</p>
                                <p>Tamanho: </p>
                                <p>Disponibilidade: </p>
                            </div>
                        </div>
                        
                        <div className={styles.imagem} >
                            <Imagens src={[cake1]} tipo={['large']} />
                            
                        </div>

                    </div>

                </section>


                
            </main>
            <BannerHorizontal/>
            {/* <GoogleAds slot='3271965051'/> */}
            <BotaoSubir/>
            <Footer/>
        </div>
    )
}

export default produtos


// Google adsense
// 50.000  =>  $1,920
// 200     =>  $7.68         