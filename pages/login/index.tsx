import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState, useContext } from 'react'

import { useRouter } from 'next/dist/client/router'
import {
  Card, Container, Input, Label, Button, Texto, ContainerLabel, Spinner,
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
  const sessao = useContext( authContext )
  const router = useRouter()

  useEffect( () => {
    console.log( 'Usuario logado: ', sessao )
  }, [ ] )

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
    } else if ( senha.length < 6 ) {
      spanSenha.innerText = 'A senha deve ter mais que 6 caracteres'
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
        console.log( user )
        if ( value.status === 200 ) {
          console.log( 'Sucess' )
          localStorage.setItem( 'user', JSON.stringify( user ) )
          router.push( '/cadastrar' )
        } else if ( value.status === 500 ) {
          console.log( 'Failed' )
          setErro( user.erro.message )
        }
      } ).catch( ( error ) => {
        setErro( error )
      } )
    } else alert( 'Resolva os problemas antes de continuar' )
    setCarregando( false )
  }

  return (
    <Container>
      <Card>
        {/* /home/paulo/Documentos/CodicosReactJs/dincyscake/public/images/Logo.png */}
        <Image src={logo} width='328' height='40' placeholder='blur' />
        <ContainerLabel>
          <Label htmlFor='email'>Email</Label>
          <span id='spanEmail' />
        </ContainerLabel>
        <Input onClick={() => setEmailFocado( true )} id='email' value={email} type='text' onChange={( e ) => setEmail( e.target.value )} required placeholder='email@dincyscake.com' />
        <ContainerLabel>
          <Label htmlFor='senha'>Senha</Label>
          <span id='spanSenha' />
        </ContainerLabel>
        <Input onClick={() => setSenhaFocado( true )} id='senha' value={senha} type='password' onChange={( e ) => setSenha( e.target.value )} required placeholder='Digite aqui a sua senha' />
        <Button onClick={() => entrar()}>ENTRAR</Button>
        <Texto>
          <Link href='cadastrar'>Ainda não tem um cadastro? Faça um clicando aqui, é rapido e facil!</Link>
        </Texto>
      </Card>

      {
        carregando && ( <ContainerStatusDaAplicaçao><Spinner /></ContainerStatusDaAplicaçao> )
      }
      {
        erro && <StatusDaAplicação setErro={setErro} mensagem={erro} />
      }
    </Container>
  )
}
