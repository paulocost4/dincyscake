import styled from 'styled-components'
import { tint, shade } from 'polished'
// export const CardContainer = styled.view`

// `

// Area em volta de todos os cards
export const CardsArea = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`

// Card com os produtos dentro
export const Card = styled.div`
  display: flex;
  flex-direction: column;
  /* background-color: #f2eeee; */
  margin: 24px 64px 64px 96px;
  border-radius: 8px;

  & > h1{ //Titulo do card
    color: #000;
    font-family: 'Montserrat';
    font-size: 40px;
    font-weight: 400;
    align-self: center;
    text-align: center;
    align-self: center;
    text-transform: capitalize;

  };

  // tira a margem do car para que cubra a tela toda
  @media (max-width: 768px) {
    margin-left : 0;
    margin-right: 0;
  }
`
// Area com todos os produtos do card dentro
export const AreaProduto = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  justify-content: center;
  flex-wrap: wrap;
`
// Area com item propriamente dito, com imagem, titulo e preço
export const AreaItem = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  width: auto;
  padding: 16px;
  align-items: center;
  margin: 24px 24px;
  /* border: 1px solid #c1c1c1; */
  box-shadow: 0px 0px 5px 0px #c1c1c1;
  & > h1{ // Nome do produto
    color: #000;
    font-weight: 100;
    font-family: noto-serif;
    font-size: 24px;
    margin: 8px 0px;
    text-transform: capitalize;
  };

  & > *:last-child{
    margin-top: 16px;
  };
  & > *:first-child{
    margin-bottom: 16px;
  }
`
export const Preco = styled.div<{disable: boolean}>`
  display: flex;
  justify-content: center;
  align-items: center;
  & > h2{ // Preço do produto
    font-family: noto-serif;
    font-size: 20px;
    margin: 8px 0px;
    color: #000;
    font-weight: 100;
  }
  & > p{
    font-family: noto-serif;
    font-size: 16px;
    color: #7d7c83;
    margin: 8px;            // Só exibe a tag p quando a props disable for falsa
    display: ${( props ) => ( props.disable ? 'none' : 'unset' )};
  }
`
export const AreaImagem = styled.div<{height: number, width :number}>`
  display: flex;
  height: ${( props ) => props.height}px;
  width:  ${( props ) => props.width}px;
  background-color: #D8D8D8;
  box-shadow: 0 0 3px 0px #c1c1c1;

  & , *{ // Coloca uma borda redonda na imagem e no container da imagem
    border-radius: 8px;
  }
`
export const AreaBotao = styled.div`
  display: flex;
  flex-direction: row;
  height: 40px;
  width: auto;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 2px 1px #d4d4d4;
  & > .botaoCarrinho{
    height: 100%;
    padding: 0 16px;
    background-color: #000;
    color: #fff;
    cursor: pointer;
    & :hover{
      color: ${( props ) => props.theme.colors.primary};
      background-color: ${tint( 0.1, '#000' )};
    };
  }


`

export const Botao = styled.button`
  height: 100%;
  width: 120px;
  background-color: ${( props ) => props.theme.colors.primary};
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  font-size: 16px;

  & :hover{
      background-color: ${( props ) => shade( 0.1, props.theme.colors.primary )};
  };

`

export const Linha = styled.hr`
width: 90%;
color: #7d7c83;
display: flex;
margin: auto;
`

// .produtos > .imagem{
//     /* background-color: blueviolet; */
//     height: 300px;  /* por esse valor como variavel */
//     width: 380px;
// }

// .produtos > .infomarçoes{
//     display: flex;
//     flex-direction: column;
//     text-align: center;
//     justify-content: center;
// }

// .produtos > .infomarçoes > .titulo{
//     font-family: 'Montserrat';
//     font-weight: 300;
//     font-size: 24px;
//     margin: 10px 5px;
// }
// .produtos > .infomarçoes > .valor{
//     font-family: 'Montserrat';
//     font-weight: 300;
//     margin: 10px 5px;
//     font-size: 20px;
// }

// .areaButoes{
//     display: flex;
//     justify-content: center;
//     align-items: center;
// }

// .areaButoes > .botaoDetalhe{
//     background-color: #f12a5e;
//     /* border: 1px solid #f12a5e; */
//     /* padding: 10px; */
//     height: 40px;
//     width: 120px;
//     font-weight: bold;
//     color: #fff;
//     cursor: pointer;
// }

// .areaButoes > .botaoCarrinho{
//     background-color: #eee8e8;
//     /* border: 1px solid #f12a5e; */
//     height: 40px;
//     width: 60px;
//     font-weight: bold;
//     color: #f12a5e;
//     cursor: pointer;

// }
// .areaButoes > .botaoDetalhe:hover{
//     background-color: #fff;
//     color: #f12a5e;
//     border: 1px solid #f12a5e;
// }

// .areaButoes > .botaoCarrinho:hover{
//     background-color: #f12a5e;
//     color: #fff;

// }
