import card from './styles'
import Navbar from '../../src/components/navbar'
import Footer from '../../src/components/footer'
import { Main } from '../../styles/globalsStyles'

export default function Encomendas() {
  return (
    <div>
      <Navbar mostrarCarrinho quantidadeCarrinho={2}/>
      <Main>
        <h1>Encomendas</h1>
      </Main>
      <Footer />
    </div>
  )
}
