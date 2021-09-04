// import original module declarations
import 'styled-components'

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius: string;
    title: string,
    colors: {
      primary: string,
      secundary: string,
    },
    text: {
      color: string,
      fontFamily: string,
    },
    backGroundColor: string,
  }
}
