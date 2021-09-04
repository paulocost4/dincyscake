import styled from 'styled-components'

// export const CardContainer = styled.view`

// `
export const ProdutoCard = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`
export const Card = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #c1c1c1;
  margin: 8px;
  color: ${( props ) => props.theme.text.color}

`

export const TituloCard = styled.div`
     font-family: 'Montserrat';
     font-size: 40px;
     font-weight: 400;
     align-self: center;
     text-align: center;
     align-self: flex-start;
     margin-left: 80px;
`
export const AreaProduto = styled.div`
  display: flex;
  width: 100%;
  height: auto;
`
export const AreaItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  flex-wrap: wrap;
  align-items: center;
  background-color: aqua;
  margin: 24px;
`
const imagem = {
  height: 400,
  width: 300,
}
export const AreaImagem = styled.div`
  display: flex;
  height: ${imagem.height}px;
  width: ${imagem.width}px;
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
