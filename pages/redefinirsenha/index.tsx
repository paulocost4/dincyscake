import Image from 'next/image'
import Link from 'next/link'
import {
  useEffect, useState,
} from 'react'

import { useRouter } from 'next/dist/client/router'
import {
  Card, Container, Input, Label, Button, Texto, ContainerLabel, Spinner, ContainerInput, ContainerLogo, ContainerTextoRedefinirSenha,
} from '../../styles/Login-Cadastrar.styles'
import { ContainerStatusDaAplicaçao } from '../../styles/StatusDaAplicaçao'
import StatusDaAplicação from '../../src/components/StatusDaAplicaçao'
import logo from '../../public/images/Logo.png'
import { auth } from '../../src/firebase'

export default function Login() {
  const [ email, setEmail ] = useState( '' )
  const [ emailFocado, setEmailFocado ] = useState( false )
  const [ carregando, setCarregando ] = useState( false )
  const [ mensagem, setMensagem ] = useState( '' )
  const router = useRouter()

  useEffect( () => { // Seta email para o parametro recebido pela rota
    console.log( 'Query: ', router.query )
    const { email: emailQuery } : {email?: string} = router.query
    setEmail( emailQuery === 'email' ? '' : emailQuery )
  }, [ router ] )

  useEffect( () => {
    const spanEmail = window.document.getElementById( 'spanEmail' )
    if ( !email && emailFocado ) {
      spanEmail.innerText = 'Preencha esse campo'
    } else {
      spanEmail.innerText = ''
    }
  }, [ emailFocado, email ] )

  async function enviarEmailResetPassword() {
    setCarregando( true )
    if ( email ) {
      // configurar as rotas para aceitar a seguinte rota => http://localhost:3000/confirmarcodigo?mode=action&oobCode=code
      // Ficará assim: confirmarcodigo[mode][oobCode]
      // o campo url abaixo serve para prover a query continueUrl que é a proxima rota a ser usada logo após concluir a redefinição de senha
      // Ficará assim: confirmarcodigo[mode][oobCode][continueUrl]
      await auth.sendPasswordResetEmail( email, { url: `${window.location.origin}/<action>/<code>` } ).then( () => {
        console.log( 'Email enviado' )
        setMensagem( 'Link de confirmação enviado para o seu email, pode demorar cerca de 1 minuto para recebe-lo. Caso não o encontre em sua caixa de entrada, por favor verifique a lixeira e os spans do seu serviço de email. Caso não o encontre mesmo assim, tente enviar o link de confirmação novamente.' )
      } ).catch( ( erroEnviarEmailReset ) => {
        const { message, code } = erroEnviarEmailReset
        if ( code === 'auth/invalid-email' ) {
          setMensagem( 'Email invalido!' )
        } else if ( code === 'auth/user-not-found' ) {
          setMensagem( 'Usuario não encontrado!' )
        } else setMensagem( `Erro desconhecido, talvez a descrição ajude a soluciona-lo: ${message} ` )
      } )
    } else alert( 'Preencha o email antes de enviar' )
    setCarregando( false )
  }

  return (
    <Container>
      <Card>
        {/* /home/paulo/Documentos/CodicosReactJs/dincyscake/public/images/Logo.png */}
        <ContainerLogo>
          <Image layout='intrinsic' src={logo} width='328' height='40' placeholder='blur' />
        </ContainerLogo>
        <ContainerTextoRedefinirSenha>
          <h1>Redefinir senha</h1>
          <h2>Digite o email para poder receber o link de confirmação para alterar a senha da sua conta</h2>
        </ContainerTextoRedefinirSenha>
        <ContainerInput>
          <ContainerLabel>
            <Label htmlFor='email'>Email</Label>
            <span id='spanEmail' />
          </ContainerLabel>
          <Input onClick={() => setEmailFocado( true )} id='email' value={email} type='text' onChange={( e ) => setEmail( e.target.value )} required placeholder='Digite o seu Email' />
        </ContainerInput>

        <Button onClick={() => enviarEmailResetPassword()}>ENVIAR EMAIL</Button>
        <Texto>
          <Link href='cadastrar'>Ainda não tem um cadastro? Faça um clicando aqui!</Link>
        </Texto>

      </Card>

      {
        carregando && ( <ContainerStatusDaAplicaçao><Spinner /></ContainerStatusDaAplicaçao> )
      }
      {
        mensagem && <StatusDaAplicação setMensagem={setMensagem} mensagem={mensagem} />
      }
    </Container>
  )
}
