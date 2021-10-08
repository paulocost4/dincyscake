import styled from 'styled-components'

export const CardStatusAplicacao = styled.div`
  display: flex;
  width: auto;
  height: auto;
  background-color: #d4d4d4;
  padding: 0px 16px 21px 16px;
  flex-direction: column;

  & > p {
    padding: 0px 50px;
    text-align: justify;
    font-size: 20px;
  }
`

export const BotaoFecharCardErro = styled.button`
  color: #000;
  align-self: flex-end;
  padding: 0px;
  margin-top: 16px;
  cursor: pointer;
`
export const ContainerStatusDaAplicaçao = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #000000aa;
  justify-content: center;
  align-items: center;
`
