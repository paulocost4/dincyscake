import Image from 'next/image'
import Link from 'next/link'

import {
  CardLogin, Container, InputLogin, Input, Label, Button, TextoCadastrar,
} from './styles'
import logo from '../../public/images/Logo.png'

export default function Login() {
  return (
    <Container>
      <CardLogin>
        {/* /home/paulo/Documentos/CodicosReactJs/dincyscake/public/images/Logo.png */}
        <Image src={logo} width='328' height='40' placeholder='blur' />

        <Label htmlFor='email'>Email</Label>
        <Input id='email' type='text' required placeholder='email@dincyscake.com' />
        <Label htmlFor='senha'>Senha</Label>
        <Input id='senha' type='text' required placeholder='Digite aqui a sua senha' />
        <Button>ENTRAR</Button>
        <TextoCadastrar>
          <Link href='cadastrar'>Ainda não tem um cadastro? Faça um clicando aqui é rapido e facil </Link>
        </TextoCadastrar>
      </CardLogin>
    </Container>
  )
}
