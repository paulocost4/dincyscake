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


function App() {
  return (
    
    <div className="App">
        {/*
        
          To do list
          []  Ajustar a navBar para não ficar enstranho quando passar o mouse sobre o navItem
          []  Prencher o contant com imagens e algumas informações sobre o site (basicamente uma propaganda do proprios site)
          []  Ver o porquê de as imagens estarem sobrepondo os outros elementos
        
        */}
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
          
            <section>
              <h3>Os nossos bolos</h3>
              <p>Tudo feito com muito amor e carinho diretamente para você</p>
            
              <ul className='images'>
                <li className='small' style={{backgroundImage: `url(${cake1})`}} ></li>
                <li className='medium' style={{backgroundImage: `url(${cake2})`}} alt='Cake' ></li>
                <li className='medium' style={{backgroundImage: `url(${cake3})`}} alt='Cake' ></li>
                <li className='small' style={{backgroundImage: `url(${cake4})`}} alt='Cake' ></li>
                <li className='small' style={{backgroundImage: `url(${cake5})`}} alt='Cake' ></li>
                <li className='medium' style={{backgroundImage: `url(${cake6})`}} alt='Cake' ></li> 
                <li className='large' style={{backgroundImage: `url(${cake7})`}} alt='Cake' ></li> 
              </ul>

            </section>
            
            

        </main>

        <footer className='footer'>
          <p>footer</p>
        </footer>
      
    </div>
  );
}

export default App;
