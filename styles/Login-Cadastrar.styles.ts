import styled, { keyframes } from 'styled-components'
import { tint } from 'polished'

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: ${( props ) => props.theme.colors.primary};
  justify-content: center;
  align-items: center;
`

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 616px;
  height: auto;
  background: #FFFFFF;
  box-shadow: 0px 0px 5px 1px #c3c3c3;
  border-radius: 24px;
  padding: 64px 0px;

  @media(max-width: 768px){
    width: 80%;
  }
  @media(max-width: 500px){
    width: 95%;
  }
`

export const ContainerInput = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
`

export const Input = styled.input`
  height: 40px;
  width: 80%;
  border-radius: 8px;
  font-size: 16px;
  border: 0;
  box-shadow: 0 0 2px 0px #000;
  padding-left: 16px;
  color: #000;

  &::placeholder{
    color: #c1c1c1;
  }
  &:focus-visible{
    border-radius: 8px;
  }
`
export const Label = styled.label`
  align-self: flex-start;
  padding-left: 5px;
  margin-bottom: 8px;
`
export const Button = styled.button`
  width: 328px;
  height: 40px;
  background-color: ${( props ) => props.theme.colors.primary};
  border-radius: 8px;
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  margin-top: 40px;
  cursor: pointer;
  &:active{
    background-color: ${( props ) => tint( 0.10, props.theme.colors.primary )};
  }
  @media(max-width: 500px){
    width: 84%;
  }




`

export const Texto = styled.span`
  display: flex;
  color: #B4B4B4;
  font-family: noto-serif;
  margin-top: 8px;

  & > a:only-child {
    text-align: center;
  }

  &:hover{
    color: ${( props ) => props.theme.colors.primary};
  }

  @media(max-width: 420px){
    width: 84%;
    height: 36px;
  }

`
export const ContainerLabel = styled.div`
  display: flex;
  margin-top: 40px;
  justify-content: space-between;
  width: 80%;
  /* flex-direction: row; */

  & > span{
    display: flex;
    color: #f00;
    text-align: center;
  }

  @media(max-width: 520px){
    & > span{
      font-size: 15px;
      align-self: baseline;
    }
  }

  @media(max-width: 430px){
    & > span{
      font-size: 14px;
      align-self: baseline;
    }
  }

  @media(max-width: 400px){
    & > span{
      font-size: 13px;
      align-self: baseline;
    }
  }
  // Continuar ajustando o tamanho do texto aqui até o tamanho de 320px

`

const rotate = keyframes`
  from{
      transform: rotate(0deg);
    }
  to{
    transform: rotate(360deg);

  }
`

export const Spinner = styled.div`
  display: flex;
  width: 180px;
  height: 180px;
  border-radius: 100%;
  border-width: 24px;
  border-color: #e5e5e5;
  border-top-color: ${( props ) => props.theme.colors.primary};
  border-style: solid;
  animation: ${rotate} 0.5s ease-in infinite;
`
export const ContainerLogo = styled.div`
  display: flex;
  width: 84%;
  height: auto;
  justify-content: center;
`

export const ContainerTextoRedefinirSenha = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  align-items: center;
  & > h1{
    font-family: "Montserrat";
    font-weight: 300;
  }
  & > h2{
    left: -8px;
    font-family: 'Noto-Serif';
    text-align: center;
    font-size: 18px;
    margin: 0;
    font-weight: 400;
  }
`
