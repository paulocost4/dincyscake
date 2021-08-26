//  ex: <Imagens src={[cake1, cake2]} tipo={['small', 'medium']} />

import Image from 'next/image'
import styles from './Imagens.module.css'

function Imagens(props){
  // console.log(props)
    return(
      <div className={styles.images}>
        {props.src.map((value, key)=>{
          return(
            <div key={`div${value}${key}`} className={styles[props.tipo[key]]}>
              <Image {...props}  placeholder='blur' className='imgItem' objectFit='cover' layout='fill' key={`Image${value}${key}`} alt={`Imagem bolo: ${value}`} src={value} blurDataURL={value} ></Image>
            </div>
          )
        })}
      </div>
    )
}
export default Imagens