import firebase from 'firebase';

const {
    apiKeyFirebase, 
    authDomainapiKeyFirebase, 
    projectIdapiKeyFirebase, 
    storageBucketapiKeyFirebase, 
    messagingSenderIdapiKeyFirebase, 
    appIdapiKeyFirebase, 
    measurementIdapiKeyFirebase, 
} = process.env;

export const firebaseConfig = {
    apiKey: apiKeyFirebase,
    authDomain: authDomainapiKeyFirebase,
    projectId: projectIdapiKeyFirebase,
    storageBucket:     storageBucketapiKeyFirebase,
    messagingSenderId: messagingSenderIdapiKeyFirebase,
    appId: appIdapiKeyFirebase,
    measurementId: measurementIdapiKeyFirebase,
};

console.log('App firebase starting: ', firebase.apps.length)
if(!firebase.apps.length){  // previni duplicação
    firebase.initializeApp(firebaseConfig);
    console.log('App firebase start: ', firebase.apps.length)
    
}

export async function pegarImagem ( storageRef ){
    // console.log( await storageRef.listAll())
    let url = await storageRef.getDownloadURL().then(url => url) // Retorna a url caso tudo dê certo
    .catch(err=>{
        console.log(err)
        return 'erro'       // Retorna 'erro' caso alguma coisa dê errado
    })
    console.log(url)
    return url
}

// exportar as funções com export function pra ver se funciona 
export const storage = firebase.storage()

// module.exports = {
//     storage: storage,
//     pegarImagem: (ref) => pegarImagem(ref) ,
//     firebaseConfig: firebaseConfig
// }



