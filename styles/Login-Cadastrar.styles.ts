import styled, { keyframes } from 'styled-components'
import { tint } from 'polished'

export const Container = styled.div`
  display: flex;
  width: auto;
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
  width: auto;
  height: auto;
  background: #FFFFFF;
  box-shadow: 0px 0px 5px 1px #c3c3c3;
  border-radius: 24px;
  padding: 64px;
`
export const Input = styled.input`
  height: 40px;
  width: 472px;
  border-radius: 8px;
  font-size: 16px;
  border: 0;
  box-shadow: 0 0 2px 0px #000;
  padding-left: 16px;

  &:focus-visible{
    border-radius: 8px;
  }
`
export const Label = styled.label`
  align-self: flex-start;
  margin-left: 16px;
  margin-bottom: 8px;
`
export const Button = styled.button`
  width: 329px;
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

`

export const Texto = styled.span`
  color: #B4B4B4;
  font-family: noto-serif;
  margin-top: 8px;

  &:hover{
    color: ${( props ) => props.theme.colors.primary};
  }

`
export const ContainerLabel = styled.div`
  display: flex;
  margin-top: 40px;
  justify-content: space-between;
  width: 100%;
  /* flex-direction: row; */

  & > span{
    color: #f00;
  }

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
