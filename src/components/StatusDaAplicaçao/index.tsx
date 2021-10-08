import { Dispatch, SetStateAction } from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'
import { BotaoFecharCardErro, CardStatusAplicacao, ContainerStatusDaAplicaçao } from '../../../styles/StatusDaAplicaçao'
// Componente que mostra na tela o status da aplicação
export default function StatusDaAplicação( { mensagem, setMensagem }: {mensagem: string, setMensagem: Dispatch<SetStateAction< string | boolean>> } ) {
  function handleButtonFecharCard() {
    if ( mensagem ) { // quando a mensagem for um texto
      setMensagem( '' )
    } else if ( !mensagem ) { // quando a mensagem for um booleano
      setMensagem( !mensagem ) // Se mensagem for true, troca para false. Se for false, troca para true
    }
  }

  return (
    <ContainerStatusDaAplicaçao>
      <CardStatusAplicacao>
        <BotaoFecharCardErro onClick={() => handleButtonFecharCard()}><AiFillCloseCircle size='40' /></BotaoFecharCardErro>
        <p>{mensagem}</p>
      </CardStatusAplicacao>
    </ContainerStatusDaAplicaçao>
  )
}
