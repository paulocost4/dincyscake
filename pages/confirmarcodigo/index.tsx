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
  const [ senha, setSenha ] = useState( '' )
  const [ confirmarSenha, setConfirmarSenha ] = useState( '' )
  const [ confirmarSenhaFocado, setConfirmarSenhaFocado ] = useState( false )
  const [ senhaFocado, setSenhaFocado ] = useState( false )
  const [ carregando, setCarregando ] = useState( false )
  const [ erro, setErro ] = useState( '' )
  const router = useRouter()
  const [ mode, setMode ] = useState( '' )
  const [ oobCode, setOobCode ] = useState( '' )
  const [ continueUrl, setContinueUrl ] = useState( '' )

  // configurar as rotas para aceitar a seguinte rota => http://localhost:3000/confirmarcodigo?mode=action&oobCode=code
  // Ficará assim: confirmarcodigo[mode][oobCode]
  // o campo url abaixo serve para prover a query continueUrl que é a proxima rota a ser usada logo após concluir a redefinição de senha
  // Ficará assim: confirmarcodigo[mode][oobCode][continueUrl]
  useEffect( () => {
    console.log( 'Query: ', router.query )
    // DEsestrutura todos os parametros recebidos pela url no email que o firebase envia ao cliente para mudar a senha
    const { mode: modeQuery, oobCode: oobCodeQuery, continueUrl: continueUrlQuery } : {mode?: string, oobCode?: string, continueUrl?: string} = router.query
    setMode( modeQuery )
    setOobCode( oobCodeQuery )
    setContinueUrl( continueUrlQuery )
  }, [ router ] )

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
    if ( senha.length < 6 && senhaFocado ) {
      spanSenha.innerText = 'A senha deve ter mais de 6 caracteres'
    }
  }, [ senha, confirmarSenha, senhaFocado, confirmarSenhaFocado ] )

  async function confirmarAlterarSenha() {
    setCarregando( true )
    if ( oobCode && senha && confirmarSenha && senha === confirmarSenha ) {
      await auth.confirmPasswordReset( oobCode, senha ).then( () => {
        setErro( 'Senha alterada com sucesso' )
        router.push( '/login' )
      } ).catch( ( erroEnviarEmailReset ) => {
        const { message, code } = erroEnviarEmailReset
        if ( code === 'auth/invalid-email' ) {
          setErro( 'Email invalido!' )
        } else if ( code === 'auth/user-not-found' ) {
          setErro( 'Usuario não encontrado!' )
        } else setErro( `Erro desconhecido, talvez a descrição ajude a soluciona-lo: ${message} ` )
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
        <ContainerTextoRedefinirSenha>
          <h1>Redefinir senha</h1>
          <h2>Escolha uma nova senha de no minimo 6 caracteres e confirme-a para alterar a sua senha </h2>
        </ContainerTextoRedefinirSenha>
        <ContainerInput>
          <ContainerLabel>
            <Label htmlFor='senha'>Nova senha</Label>
            <span id='spanSenha' />
          </ContainerLabel>
          <Input onClick={() => setSenhaFocado( true )} id='senha' value={senha} type='password' onChange={( e ) => setSenha( e.target.value )} required placeholder='Digite aqui a sua nova senha' />
        </ContainerInput>
        <ContainerInput>
          <ContainerLabel>
            <Label htmlFor='confirmarsenha'>Confirmar nova senha</Label>
            <span id='spanConfirmarSenha' />
          </ContainerLabel>
          <Input onClick={() => setConfirmarSenhaFocado( true )} value={confirmarSenha} onChange={( e ) => { setConfirmarSenha( e.target.value ) }} id='confirmarsenha' type='password' required placeholder='Digite a senha novamente para confirmar' />
        </ContainerInput>

        <Button onClick={() => confirmarAlterarSenha()}>CONFIRMAR</Button>
        <Texto>
          <Link href='cadastrar'>Ainda não tem um cadastro? Faça um clicando aqui!</Link>
        </Texto>

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
