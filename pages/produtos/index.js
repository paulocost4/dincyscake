import styles from './Produtos.module.css'
import Navbar from '../src/components/navbar'
import Footer from '../src/components/footer'
import BannerHorizontal from '../src/components/BannerPropagandaHorizontal'
import GoogleAds from '../src/components/GoogleAds'
import BotaoSubir from '../src/components/botaoSubir'

function produtos(){
    
    return(
        <div>
            <Navbar/>
            <BannerHorizontal/>
            {/* <GoogleAds slot='2194687109'/> */}
            <main>

                                    {/* Começar a fazer a guia de produtos daqui */}
                <h1>produtos</h1>


                
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