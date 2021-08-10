import './App.css';
import donut from './images/donut.png'
// import banner from './images/banner.jpg'
import cake1 from './images/cake1.jpg'
import cake2 from './images/cake2.jpg'
import cake3 from './images/cake3.jpg'
import cake4 from './images/cake4.jpg'
import cake5 from './images/cake5.jpg'
import cake6 from './images/cake6.jpg'
// import cake7 from './images/cake7.jpg'

// import FontAwesome from 'react-fontawesome';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { useState } from 'react';

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
  return(
    <ul className='images'>
      {props.src.map((value, key)=>{
        return(
          <li key={value} className={props.tipo[key]} style={{backgroundImage: `url(${value})`}}  ></li>
        )
      })}
    </ul>
  )
}

function Logo(){
  return(
    <div className='areaLogo'>
      <a href='#home' style={{textDecoration: 'none', flexDirection: 'row', display: 'flex'}}>
        <img className='logo' src={donut} alt='Imagem donut'></img>
        <h1 className='tituloLogo' >Dincy's Cake</h1>
      </a>
    </div> 
  )
}

function popUp(){
  let posiçaoDoSobre = document.querySelector("#root > div > div > nav > button").getBoundingClientRect()
  let popUp = document.querySelector("#root > div > div > nav > div")
  if(popUp.style.display==='none' || popUp.style.display===''){
    

    let {innerWidth} = window
    console.log('InnerWidth: ', innerWidth)
    if( (innerWidth < 860 && innerWidth > 700) || innerWidth < 561 ){
      popUp.style.left = `${innerWidth-220}px`
      // popUp.style.right = `0px` // Entre 860 e 700 e em qualquer valor abaixo de 561 , usar right= tamanho da tela menos o tamanho do popUp 
    }
    else{
      let novaEsquerda = posiçaoDoSobre.left - 60.795 //diminui pela metade da largura do popUp para conseguir centralizar com o SOBRE
      popUp.style.top = `${posiçaoDoSobre.bottom}px`
      popUp.style.left = `${novaEsquerda}px`
    }

    popUp.style.display = 'block' //Torna o popUp visivel
    console.log('Abre poPup')
  } 
  else{
    popUp.style.display = 'none'
    console.log('Fecha popPup')
  }
  console.log("pop up: ", popUp.style.left, popUp.style.right, popUp.style.top)
  console.log('posiçaoDoSobre: ', posiçaoDoSobre.left, posiçaoDoSobre.right, posiçaoDoSobre.bottom)

}

function App() {
  let [popUpStatus, setPopUpStatus] = useState(0)

  return (
    
    <div className="App">
        <div className='areaNavBar'>
          <Logo/> 
          <nav className='navBar'>
            <a className='itemNavBar' href="#home">Home</a>
            <a className='itemNavBar' href="#produtos">Produtos</a>
            {/* <a className='itemNavBar' href="#imagens">Imagens</a> */}
            <a className='itemNavBar' href="#encomendas">Encomendas</a>
            <button className='itemNavBar' href="" 
              onClick={()=>{
                popUpStatus ? setPopUpStatus(0) : setPopUpStatus(1) //Muda o status do popUp
                popUp() //Abre ou fecha o popUp   //Renderiza a seta para baixo ou para frente
              }}>Sobre {popUpStatus ? <IoIosArrowDown className='arrowSobre'/> : <IoIosArrowForward className='arrowSobre'/> } 
            </button>
            <div className='popUpSobre'>
              <a href='a ser criado' ><p>A Dincy's Cake</p></a>
              <a href='a ser criado' ><p>Desenvolvimento do site</p></a>
            </div>
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
          
          <div className='column1'>
            <Logo/>
            <p>"Apenas uma lojinha de bolo começando a brilhar, ajude-nos nessa jornada"</p>
            <p>Dincy's Cake { new Date().getFullYear().toString() === '2021' ? '2021' : '2021-' + new Date().getFullYear().toString() } ©</p>
          </div><hr/>

          <div className='column2'>
            <h4>Entre em contato</h4>
            <div className='areaContatos' >
                <p>(74) 98825-7734</p>
                <p>Rua Dr Clodoaldo Avelino N° 680 Centro</p>
                <p>pcesarcosta@outlook.com</p>
              <div className='areaIcones'>
                <a target='_blank' href='https://www.instagram.com/dincyscake/' rel="noreferrer" ><FaInstagram className='iconFooter' /></a>
                <a target='_blank' href='https://www.facebook.com/profile.php?id=100011493946134' rel="noreferrer" ><FaFacebook className='iconFooter'/></a>
                <a target='_blank' href='https://api.whatsapp.com/send?phone=+55(74)98825-7734' rel="noreferrer" ><FaWhatsapp className='iconFooter' /></a>
                
                
                
              </div>    
            </div>
          </div><hr/>
          
          <div className='column3'>
            <h4>Projeto</h4>
            <a href='#pagina a ser construida' ><p>Suporte</p></a>
            <a href='#pagina a ser construida' ><p>Sugestões</p></a>
            <a href='#pagina a ser construida' ><p>Ajude o projeto</p></a>
            <p>Desenvolvido por Paulo Costa</p>
          </div>

        </footer>
      
    </div>
  );
}

export default App;
