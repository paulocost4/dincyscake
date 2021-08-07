import './App.css';
import donut from './images/donut.png'
import banner from './images/banner.jpg'
import cake1 from './images/cake1.jpg'
import cake2 from './images/cake2.jpg'
import cake3 from './images/cake3.jpg'
import cake4 from './images/cake4.jpg'
import cake5 from './images/cake5.jpg'
import cake6 from './images/cake6.jpg'
import cake7 from './images/cake7.jpg'


function TextoDaSeçao(props){
  return(
    <section className='textoSeçao'>
      <h3>{props.titulo}</h3>
      <p>{props.texto}</p>
    </section>
  )
}

//  ex: <Imagens src={[cake1, cake2]} tipo={['small', 'medium']} />
function Imagens(props){
  console.log(props)
  return(
    <ul className='images'>
      {props.src.map((value, key)=>{
        return(
          <li className={props.tipo[key]} style={{backgroundImage: `url(${value})`}}  ></li>
        )
      })}
    </ul>
  )
}

function App() {
  return (
    
    <div className="App">
        <div className='areaNavBar'>
          <div className='areaLogo'>
            <a href='#home' style={{textDecoration: 'none', flexDirection: 'row', display: 'flex'}}>
              <img className='logo' src={donut} alt='Imagem donut'></img>
              <h1 className='tituloLogo' >Dincy's Cake</h1>
            </a>
          </div>  
          <nav className='navBar'>
            <a className='itemNavBar' href="#home">Home</a>
            <a className='itemNavBar' href="#produtos">Produtos</a>
            <a className='itemNavBar' href="#imagens">Imagens</a>
            <a className='itemNavBar' href="#encomendas">Encomendas</a>
            <a className='itemNavBar' href="#sobre">Sobre</a>
          </nav>
        </div>

        <section className='banner' >
          <h1>Venha conhecer os nossos bolos</h1>
          <h3>Tudo com muito carinho para você</h3>
          {/* <button href='#produtos'>SAIBA MAIS</button> */}
        </section>
        
        <main className='main'>
          
            
              

          <TextoDaSeçao titulo='Os nossos bolos' texto='Bolos e cupkakes que agradam ao seu paladar, simplesmente uma explosão de cores e sabor. Além do mais, não tem mal nenhum que um bolo quentinho não ajude a curar.' />
          <Imagens src={[cake1, cake2]} tipo={['small', 'medium']} />
          
          <TextoDaSeçao  texto='Se nada der certo, tente um saboroso pedaço de bolo com cobertura!' />
          <Imagens src={[cake3, cake4]} tipo={['medium', 'small']} />

          <TextoDaSeçao  texto='E para os apaixonados por receitas com maracujá, apresento-lhes a felicidade' />
          <Imagens src={[cake5, cake6]} tipo={['medium', 'small']} />

            
            
            

        </main>

        <footer className='footer'>
          <p>footer</p>
        </footer>
      
    </div>
  );
}

export default App;
