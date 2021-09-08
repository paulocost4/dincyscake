import styled, { createGlobalStyle } from 'styled-components'

export const Main = styled.main`
  display: flex;
  height: auto;
  width: 100%;
  margin: 24px 0px 104px 0px;
  flex-direction: column;
  /* align-items: center;
  justify-content: center; */
  min-height: 800px;
  background-color: ${( props ) => props.theme.backGroundColor};
`

export const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    background-color: ${( ( props ) => props.theme.backGroundColor )};
    background-image: url('../public/images/patern.png');
    background-repeat: repeat;
  }
  button{
    background-color: transparent;
    border-width: 0;
    border-radius: 0;
  }
  button:focus{
    outline: none;

  }
  a {
    color: inherit;
    text-decoration: none;
  }


  main{
    display: flex;
    height: auto;
    width: 100%;
    margin: 26px 0px 100px 0px;
    flex-direction: column;
    /* align-items: center;
    justify-content: center; */
    min-height: 800px;
  }


  #__next, #__next > div{
    display: flex;
    height: 100%;
    width: 100%;
    flex-direction: column;
  }
  .App{
    display: flex;
    height: 100%;
    width: 100%;
    flex-direction: column;
  }

`
