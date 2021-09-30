import Image from 'next/image'
import Link from 'next/link'
import {
  useEffect, useState,
} from 'react'
import { useRouter } from 'next/dist/client/router'
import StatusDaAplicação from '../../src/components/StatusDaAplicaçao'
import { ContainerStatusDaAplicaçao } from '../../styles/StatusDaAplicaçao'
import {
  Card, Container, Input, Label, Button, Texto, ContainerLabel, Spinner,
} from '../../styles/Login-Cadastrar.styles'
import logo from '../../public/images/Logo.png'

export default function Cadastrar( { goTo } : {goTo?: string} ) {
  const [ email, setEmail ] = useState( '' )
  const [ senha, setSenha ] = useState( '' )
  const [ confirmarSenha, setConfirmarSenha ] = useState( '' )
  const [ emailFocado, setEmailFocado ] = useState( false )
  const [ senhaFocado, setSenhaFocado ] = useState( false )
  const [ confirmarSenhaFocado, setConfirmarSenhaFocado ] = useState( false )
  const [ carregando, setCarregando ] = useState( false )
  const [ cadastrado, setCadastrado ] = useState( false )
  const [ erro, setErro ] = useState( '' )

  const router = useRouter()

  useEffect( () => {
    const spanSenha = window.document.getElementById( 'spanSenha' )
    const spanConfirmarSenha = window.document.getElementById( 'spanConfirmarSenha' )

    // usando as spans ao lado da label do input para fornecer aviso de erros aos usuarios a cerca do input
    if ( senha !== confirmarSenha ) { // Entrará aqui se as senhas forem diferentes
      spanConfirmarSenha.innerText = 'As Senhas não são iguais'
    } else {
      spanConfirmarSenha.innerText = ''
    }
    if ( !senha && senhaFocado ) { // Entrará aqui se o input senha for focado
      spanSenha.innerText = 'Preencha esse campo'
    } else {
      spanSenha.innerText = ''
    }
    if ( confirmarSenha !== senha ) { // Entrará aqui se as senhas forem diferentes
      spanConfirmarSenha.innerText = 'Senhas diferentes'
    } else {
      spanConfirmarSenha.innerText = ''
    }
  }, [ senha, confirmarSenha, senhaFocado, confirmarSenhaFocado ] )

  useEffect( () => { // manipular os avisos a cerca do input email
    const spanEmail = window.document.getElementById( 'spanEmail' )
    if ( !email && emailFocado ) {
      spanEmail.innerText = 'Preencha esse campo'
    } else {
      spanEmail.innerText = ''
    }
  }, [ emailFocado, email ] )

  async function cadastrar() {
    setCarregando( true )
    console.log( 'Carregando: ', carregando )
    const data = {
      senha,
      email,
    }

    if ( email && senha && confirmarSenha && senha === confirmarSenha ) {
      await fetch( '/api/cadastrar', { method: 'POST', body: JSON.stringify( data ) } ).then( async ( dados ) => {
        console.log( 'body: ', dados )
        const resposta:{response: string, text: {code: string, message:string} } = await dados.json()
        if ( dados.status === 200 ) { // Quando a solicitação é realizada com sucesso e o usuario é cadastrado
          console.log( 'sucess' )
          setCadastrado( true )
          setTimeout( () => router.push( goTo ), 500 ) // se for cadastrado com sucesso, o usuario será redirecionado para alguma outra pagina especifica
        } else if ( dados.status === 500 ) { // Quando a solicitação falha, é necessario configurar uma mensagem de erro
          console.log( 'Failed' )
          if ( resposta.text.code === 'auth/email-already-in-use' ) {
            setErro( 'Email já existente, tente outro email' )
          } else if ( resposta.text.code === 'auth/invalid-email' ) {
            setErro( 'Email invalido, escreva como no exemplo dincy@dincyscake.com.' )
          } else if ( resposta.text.code === 'auth/weak-password' ) {
            setErro( 'Senha fraca, digite no minimo 6 caracteres.' )
          } else if ( resposta.text.code === 'auth/invalid-password' ) {
            setErro( 'Senha invalida, tente novamente.' )
          } else setErro( 'Algo deu errado, tente novamente.' )
        }
      } )// final then do fetch
        .catch( ( msgErro ) => {
          console.log( 'Erro: ', msgErro )
        } )
    } else alert( 'Resolva os problemas antes de tentar cadastrar um novo usuario!' )
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
        <Input onClick={() => setEmailFocado( true )} value={email} onChange={( e ) => { setEmail( e.target.value ) }} id='email' type='text' required placeholder='email@dincyscake.com' />
        <ContainerLabel>
          <Label htmlFor='senha'>Senha</Label>
          <span id='spanSenha' />
        </ContainerLabel>
        <Input onClick={() => setSenhaFocado( true )} value={senha} onChange={( e ) => { setSenha( e.target.value ) }} id='senha' type='password' required placeholder='Digite aqui a sua senha' />
        <ContainerLabel>
          <Label htmlFor='confirmarsenha'>Confirmar senha</Label>
          <span id='spanConfirmarSenha' />
        </ContainerLabel>
        <Input onClick={() => setConfirmarSenhaFocado( true )} value={confirmarSenha} onChange={( e ) => { setConfirmarSenha( e.target.value ) }} id='confirmarsenha' type='password' required placeholder='Digite a senha novamente para confirmar' />
        <Button onClick={() => { cadastrar() }}>CADASTRAR</Button>
        <Texto>
          <Link href='login'>Ja tem um cadastro? Entre em sua conta clicando aqui.</Link>
        </Texto>
      </Card>
      {
        carregando && ( <ContainerStatusDaAplicaçao><Spinner /></ContainerStatusDaAplicaçao> )
      }
      {
        erro && <StatusDaAplicação setErro={setErro} mensagem={erro} />
      }
      {
        cadastrado && <StatusDaAplicação setErro={setCadastrado} mensagem='Cadastrado com sucesso!' />
      }

    </Container>
  )
}

Cadastrar.defaultProps = {
  goTo: '',
}
