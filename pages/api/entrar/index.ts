import { NextApiResponse, NextApiRequest } from 'next'

import { auth } from '../../../src/firebase'

interface TypeResponse{
  email: string,
  senha: string
}

export default function handler( req:NextApiRequest, res:NextApiResponse ) {
  if ( req.method === 'POST' && req.body ) {
    const response:TypeResponse = JSON.parse( req.body )

    auth.signInWithEmailAndPassword( response.email, response.senha ).then( ( value ) => {
      res.status( 200 ).json( value.user )
    } ).catch( ( error ) => {
      res.status( 500 ).json( error )
    } )
  }
}
