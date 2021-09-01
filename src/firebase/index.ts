import firebase from 'firebase'
import 'firebase/storage'

export const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId,
}

console.log( 'App firebase starting: ', firebase.apps.length )
if ( !firebase.apps.length ) {
  // previne duplicação
  firebase.initializeApp( firebaseConfig )
  console.log( 'App firebase start: ', firebase.apps.length )
} else {
  firebase.app()
}

export async function pegarImagem( storageRef: firebase.storage.Reference ): Promise<string> {
  // console.log( await storageRef.listAll())
  const url: Promise<string> = await storageRef
    .getDownloadURL()
    .catch( ( err ) => {
      console.log( 'Erro ao pegar imagem no firebase Storage', err )
      return 'erro' // Retorna 'erro' caso alguma coisa dê errado
    } )
  return url
}

// console.log('.env: ', process.env)

export const realtime = firebase.database()
export const storage = firebase.storage()

// module.exports = {
//     storage: storage,
//     pegarImagem: (ref) => pegarImagem(ref) ,
//     firebaseConfig: firebaseConfig
// }
