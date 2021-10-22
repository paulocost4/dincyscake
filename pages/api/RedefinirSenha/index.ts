import { NextApiResponse, NextApiRequest } from 'next'

import { realtime, auth } from '../../../src/firebase'

export default function handler( req:NextApiRequest, res:NextApiResponse ) {
  const { email }: {email:string} = req.body

  auth.sendPasswordResetEmail( email )
}
