import Image from 'next/image'
import Link from 'next/link'
import {
  useEffect, useState, useContext,
} from 'react'

import { useRouter } from 'next/dist/client/router'
import {
  Card, Container, Input, Label, Button, Texto, ContainerLabel, Spinner, ContainerInput, ContainerLogo,
} from '../../styles/Login-Cadastrar.styles'
import { ContainerStatusDaAplicaçao } from '../../styles/StatusDaAplicaçao'
import StatusDaAplicação from '../../src/components/StatusDaAplicaçao'
import logo from '../../public/images/Logo.png'
import { authContext } from '../../src/context'

export default function Login() {
  const [ email, setEmail ] = useState( '' )
  const [ senha, setSenha ] = useState( '' )
  const [ emailFocado, setEmailFocado ] = useState( false )
  const [ senhaFocado, setSenhaFocado ] = useState( false )
  const [ carregando, setCarregando ] = useState( false )
  const [ erro, setErro ] = useState( '' )
  const [ qtdErrosLogin, setQtdErrosLogin ] = useState( 0 )
  const sessao = useContext( authContext )
  const router = useRouter()
  const [ goTo, setGoTo ] = useState( '' )

  useEffect( () => { // Pega os parametros da rota
    const { goTo: irPara } : {goTo?: string} = router.query
    setGoTo( irPara )
  }, [ router ] )

  useEffect( () => {
    const spanEmail = window.document.getElementById( 'spanEmail' )
    if ( !email && emailFocado ) {
      spanEmail.innerText = 'Preencha esse campo'
    } else {
      spanEmail.innerText = ''
    }
  }, [ emailFocado, email ] )

  useEffect( () => {
    const spanSenha = window.document.getElementById( 'spanSenha' )

    // usando as spans ao lado da label do input para fornecer aviso de erros aos usuarios a cerca do input
    if ( !senha && senhaFocado ) { // Entrará aqui se o input senha for focado
      spanSenha.innerText = 'Preencha esse campo'
    } else if ( senha.length < 6 && senhaFocado ) {
      spanSenha.innerText = 'A senha deve ter mais de 6 caracteres'
    } else {
      spanSenha.innerText = ''
    }
  }, [ senha, senhaFocado ] )

  async function entrar() {
    setCarregando( true )
    const data = {
      email, senha,
    }
    if ( email && senha.length >= 6 ) {
      await fetch( '/api/entrar', { method: 'POST', body: JSON.stringify( data ) } ).then( async ( value ) => {
        const user = await value.json() // se der tudo certo a api envia os dados do usuario
        console.log( 'user: ', user )
        if ( value.status === 200 ) {
          console.log( 'Sucess' )
          localStorage.setItem( 'user', JSON.stringify( user ) )
          router.push( goTo )
        } else if ( value.status === 500 ) {
          console.log( 'Failed' )
          if ( user.code === 'auth/wrong-password' ) {
            setErro( 'Senha incorreta, tente novamente.' )
            setQtdErrosLogin( qtdErrosLogin + 1 )
          } else if ( user.code === 'auth/invalid-email' ) {
            setErro( 'Email invalido, tente outro email.' )
          } else if ( user.code === 'auth/too-many-requests' ) {
            setQtdErrosLogin( 999 ) // Mudar para um numero muito grande para ser renderizado o texto de alterar senha
            setErro( 'Muitas tentativas de acesso, essa conta está temporariamente bloqueada, você pode redefinir a senha imediatamente ou tentar novamente mais tarde.' )
          } else setErro( user.message )
        }
      } ).catch( ( error ) => {
        setErro( error.message )
      } )
    } else alert( 'Resolva os problemas antes de continuar' )
    setCarregando( false )
  }

  return (
    <Container>
      <Card>
        {/* /home/paulo/Documentos/CodicosReactJs/dincyscake/public/images/Logo.png */}
        <ContainerLogo>
          <Image layout='intrinsic' src={logo} width='328' height='40' placeholder='blur' />
        </ContainerLogo>
        <ContainerInput>
          <ContainerLabel>
            <Label htmlFor='email'>Email</Label>
            <span id='spanEmail' />
          </ContainerLabel>
          <Input onClick={() => setEmailFocado( true )} id='email' value={email} type='text' onChange={( e ) => setEmail( e.target.value )} required placeholder='Digite o seu Email' />
        </ContainerInput>
        <ContainerInput>
          <ContainerLabel>
            <Label htmlFor='senha'>Senha</Label>
            <span id='spanSenha' />
          </ContainerLabel>
          <Input onClick={() => setSenhaFocado( true )} id='senha' value={senha} type='password' onChange={( e ) => setSenha( e.target.value )} required placeholder='Digite aqui a sua senha' />
        </ContainerInput>
        <Button onClick={() => entrar()}>ENTRAR</Button>
        <Texto>
          <Link href='cadastrar'>Ainda não tem um cadastro? Faça um clicando aqui!</Link>
        </Texto>
        {
          qtdErrosLogin >= 3
            ? (
              <Texto style={{ color: '#f00' }}>
                <Link href={`redefinirsenha${email ? `?email=${encodeURIComponent( email )}` : ''} `} prefetch={false}>Esqueceu a sua senha? Clique aqui para redefinir!</Link>
              </Texto>
            )
            : null
        }

      </Card>

      {
        carregando && ( <ContainerStatusDaAplicaçao><Spinner /></ContainerStatusDaAplicaçao> )
      }
      {
        erro && <StatusDaAplicação setMensagem={setErro} mensagem={erro} />
      }
    </Container>
  )
}
