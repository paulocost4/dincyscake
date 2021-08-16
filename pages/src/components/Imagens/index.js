//  ex: <Imagens src={[cake1, cake2]} tipo={['small', 'medium']} />

import Image from 'next/image'
import styles from './Imagens.module.css'

function Imagens(props){
    return(
      <div className={styles.images}>
        {props.src.map((value, key)=>{
          return(
            <div key={`div${value}${key}`} className={ props.tipo !== undefined ? styles[props.tipo[key]] : styles.full }>
              <Image quality='100' placeholder='blur' className='imgItem' objectFit='cover' layout='fill' key={`Image${value}${key}`} alt={`Imagem bolo: ${value}`} src={value} ></Image>
            </div>
          )
        })}
      </div>
    )
}
export default Imagens