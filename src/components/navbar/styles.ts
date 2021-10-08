import styled from 'styled-components'

export const AreaNavBar = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 50px;
    width: 100%;
    justify-content: space-around;
    padding: 5px 0px;
    box-shadow: 0px 5px 5px 0px #c1c1c1;

    @media screen and (max-width: 700px) {
      & {
        flex-direction: column;
        height: 100px;
      }
  }
`

export const ItemNavBar = styled.span`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #f12a5e;
  padding: 16px;
  background-color: transparent;
  border: 0;
  font-size: 20px;
  font-family: Montserrat;
  font-weight: bolder;


  & :hover{
    color: #fff;
    background-color: #f12a5e;
    cursor: pointer;
  }

  @media screen and (max-width: 700px) {
    & :first-child{
      display: none;
    }
  }

  @media screen and (max-width: 416px){
    & {
      padding: 5px;
    }
  }

`

export const NavBar = styled.nav`
  display: flex;
  height: inherit;
`

export const PopUpSobre = styled.div`
  display: none;
  position: absolute;
  top: 60px;
  right: 0px;
  height: auto;
  width: 220px;
  background-color: snow;
  border-radius: 5px;
  box-shadow: 0 0 5px 0px #282c2f;
  padding: 10px;
  margin: 0px;
`
export const PorpUpItem = styled.span`
  text-decoration: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #979797;
  padding: 0px 5px;
  cursor: pointer;

 & :hover{
    color: #fff;
    background-color: #f12a5e;
  }
`

export const ContadorCarrinho = styled.span<{carrinhoBoundingClientRect:DOMRect}>`
  position: absolute;
  color: #fff;
  font-size: 15px;
  top: ${( props ) => props.carrinhoBoundingClientRect.top - 19}px;
  left: ${( props ) => props.carrinhoBoundingClientRect.left + 22}px;
  background-color: #000;
  border-radius: 100%;
  padding: 1px 7px;
  font-family: noto-serif;
`
/*

          // POPUP  ****** /

.popUpSobre a{
  text-decoration: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #979797;
  padding: 0px 5px;
}
.popUpSobre a:hover{
  color: #fff;
  background-color: #f12a5e;
} */
