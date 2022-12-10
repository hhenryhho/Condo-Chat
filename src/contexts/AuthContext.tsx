import React, {
  FC,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  createContext
} from 'react'
import { auth } from '../firebase-config'
import { User } from 'firebase/auth'

export interface UserContextInterface {
  user: User | null
  setUser: Dispatch<SetStateAction<User | null>>
  authError: string
  setAuthError: Dispatch<SetStateAction<string>>
}
type Props = {
  children?: JSX.Element
}

const UserContext = createContext<UserContextInterface | null>(null)

const UserProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [authError, setAuthError] = useState<string>('')

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(firebaseUser =>
      setUser(firebaseUser)
    )

    return unsubscribe
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser, authError, setAuthError }}>
      {children}
    </UserContext.Provider>
  )
}

export { UserProvider, UserContext }
