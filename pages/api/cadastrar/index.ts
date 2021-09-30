import { NextApiResponse, NextApiRequest } from 'next'

import { realtime, auth } from '../../../src/firebase'

interface TypeResponse{
  email: string,
  senha: string
}

export default function handler( req:NextApiRequest, res:NextApiResponse ) {
  if ( req.method === 'POST' && req.body ) {
    const response:TypeResponse = JSON.parse( req.body )

    auth.createUserWithEmailAndPassword( response.email, response.senha ).then( ( value ) => {
      const id = value.user.uid
      const usuariosRef = realtime.ref( '/usuarios' )
      usuariosRef.child( id ).set( { email: response.email } ).then( () => {
        console.log( 'Sucesso!' )
        res.status( 200 ).json( { response: 'SUCESS!' } )
      } ).catch( ( erro ) => {
        value.user.delete() // se não conseguir cadastrar o usuario no realtime, delete o usuario no auth
        console.log( 'falhou!', erro )
        res.status( 500 ).json( { response: 'FAILED!', text: erro } )
      } )
    } ).catch( ( error ) => {
      console.log( 'Erro ao cadastrar usuario: ', error )
      res.status( 500 ).json( { response: 'FAILED!', text: error } )
    } )

    // implementar autenticação do firebase aquim0

    console.log( req.body )
  }
}
