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





export const storage = firebase.storage()


