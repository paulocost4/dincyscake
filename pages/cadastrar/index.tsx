import Image from 'next/image'
import Link from 'next/link'

import {
  Card, Container, Input, Label, Button, Texto,
} from '../../styles/Login-Cadastrar.styles'
import logo from '../../public/images/Logo.png'

export default function Cadastrar() {
  return (
    <Container>
      <Card>
        {/* /home/paulo/Documentos/CodicosReactJs/dincyscake/public/images/Logo.png */}
        <Image src={logo} width='328' height='40' placeholder='blur' />

        <Label htmlFor='email'>Email</Label>
        <Input id='email' type='text' required placeholder='email@dincyscake.com' />
        <Label htmlFor='senha'>Senha</Label>
        <Input id='senha' type='text' required placeholder='Digite aqui a sua senha' />
        <Label htmlFor='confirmarsenha'>Confirmar senha</Label>
        <Input id='confirmarsenha' type='text' required placeholder='Digite a senha novamente para confirmar' />
        <Button>ENTRAR</Button>
        <Texto>
          <Link href='login'>Ja tem um cadastro? Entre em sua conta clicando aqui.</Link>
        </Texto>
      </Card>
    </Container>
  )
}
