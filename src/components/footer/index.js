/* eslint-disable react/no-unescaped-entities */
import Logo from "../logo"
import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";
import styles from './Footer.module.css'


export default function footer(props){
    return(
        <footer className={styles.footer}>
                  
        <div className={styles.column1}>
          <Logo logoUrl={props.logoUrl}/>
          <p>"Apenas uma lojinha de bolo começando a brilhar, ajude-nos nessa jornada"</p>
          <p>Dincy's Cake { new Date().getFullYear().toString() === '2021' ? '2021' : '2021-' + new Date().getFullYear().toString() } ©</p>
        </div><hr/>
        
        <div className={styles.column2}>
          <h4>Entre em contato</h4>
          <div className={styles.areaContatos} >
              <p>(74) 98825-7734</p>
              <p>Rua Dr Clodoaldo Avelino N° 680 Centro</p>
              <p>pcesarcosta@outlook.com</p>
            <div className={styles.areaIcones}>
              <a target='_blank' href='https://www.instagram.com/dincyscake/' rel="noreferrer" ><FaInstagram className={styles.iconFooter} /></a>
              <a target='_blank' href='https://www.facebook.com/profile.php?id=100011493946134' rel="noreferrer" ><FaFacebook className={styles.iconFooter}/></a>
              <a target='_blank' href='https://api.whatsapp.com/send?phone=+55(74)98825-7734' rel="noreferrer" ><FaWhatsapp className={styles.iconFooter} /></a>
              
              
              
            </div>    
          </div>
        </div><hr/>
        
        <div className={styles.column3}>
          <h4>Projeto</h4>
          <a href='#pagina a ser construida' ><p>Suporte</p></a>
          <a href='#pagina a ser construida' ><p>Sugestões</p></a>
          <a href='#pagina a ser construida' ><p>Ajude o projeto</p></a>
          <p>Desenvolvido por Paulo Costa</p>
        </div>
        
        </footer>
    )
}