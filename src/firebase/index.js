import firebase from 'firebase';
import  'firebase/storage'
import  'firebase/database'

// const firebaseConfig = {
//     apiKey: "AIzaSyBNj4vLt6FofhxMVF40bjVkfgvehfc2Rm8",
//     authDomain: "dincy-s-cake.firebaseapp.com",
//     databaseURL: "https://dincy-s-cake-default-rtdb.firebaseio.com",
//     projectId: "dincy-s-cake",
//     storageBucket: "dincy-s-cake.appspot.com",
//     messagingSenderId: "200014312775",
//     appId: "1:200014312775:web:402ae4a3e760cb4f864862",
//     measurementId: "G-3CYG3MH3N4"
//   };

export const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    measurementId: process.env.measurementId
};


console.log('App firebase starting: ', firebase.apps.length)
if(!firebase.apps.length){  // previne duplicação
    firebase.initializeApp(firebaseConfig);
    console.log('App firebase start: ', firebase.apps.length)
}
else{
    firebase.app()
}

export async function pegarImagem ( storageRef ){
    // console.log( await storageRef.listAll())
    let url = await storageRef.getDownloadURL().then(url => url) // Retorna a url caso tudo dê certo
    .catch(err=>{
        console.log('Erro ao pegar imagem no firebase Storage', err)
        return 'erro'       // Retorna 'erro' caso alguma coisa dê errado
    })
    console.log(url)
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



