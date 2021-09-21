import card from './styles'
import Navbar from '../../src/components/navbar'
import Footer from '../../src/components/footer'
import { Main } from '../../styles/globalsStyles'

export default function Comprar() {
  return (
    <div>
      <Navbar mostrarCarrinho={false} quantidadeCarrinho={0} />
      <Main>
        <h1>Comprar</h1>
      </Main>
      <Footer />
    </div>
  )
}
