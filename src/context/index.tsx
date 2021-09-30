import {
  createContext, ReactChild, useEffect, useState,
} from 'react'

export const authContext = createContext( null )
export default function AuthContext( { children }: {children: ReactChild} ) {
  const [ user, setUser ] = useState( null )
  useEffect( () => {
    console.log( 'user', JSON.parse( user ) )
    setUser( JSON.parse( localStorage.getItem( 'user' ) ) )
  }, [] )
  return (
    <authContext.Provider value={{ user }}>
      {children}
    </authContext.Provider>
  )
}
