import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInAnonymously,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'
import { useContext, useState } from "react"
import { UserContext, UserContextInterface } from "../contexts/AuthContext"
import { auth } from "../firebase-config"


const useAuth = () => {
  const { setUser, authError, setAuthError } = useContext(UserContext) as UserContextInterface
  const [signInEmail, setSignInEmail] = useState('')
  const [signInPassword, setSignInPassword] = useState('')
  const [signUpEmail, setSignUpEmail] = useState('')
  const [signUpPassword, setSignUpPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignIn = async (signInMethod: string) => {
    setLoading(true)
    try {
      switch (signInMethod) {
        case 'email':
          await signInWithEmailAndPassword(auth, signInEmail, signInPassword)
          setAuthError('')
          break
        case 'guest':
          await signInAnonymously(auth)
          setAuthError('')
          break
        default:
          return
      }
    } catch (error) {
      if (error instanceof Error) {
        setAuthError(`Things exploded (${error.message})`)
        console.error(`Things exploded (${error.message})`)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleSignUp = async (signUpMethod: string) => {
    const auth = getAuth()

    try {
      setLoading(true)
      switch (signUpMethod) {
        case 'email':
          await createUserWithEmailAndPassword(
            auth,
            signUpEmail,
            signUpPassword
          )
          setAuthError('')
          break

        case 'guest':
          await signInAnonymously(auth)
          setAuthError('')
          break

        default:
          return
      }
    } catch (error) {
      if (error instanceof Error) {
        setAuthError(`Things exploded (${error.message})`)
        console.error(`Things exploded (${error.message})`)
      }
    } finally {
      setLoading(false)
    }
  }

  const signout = () => signOut(auth)

  onAuthStateChanged(auth, currentUser => setUser(currentUser))

  return {
    signInEmail,
    setSignInEmail,
    signInPassword,
    setSignInPassword,
    signUpEmail,
    setSignUpEmail,
    signUpPassword,
    setSignUpPassword,
    authError,
    setAuthError,
    handleSignIn,
    handleSignUp,
    signout,
    loading
  }
}



export default useAuth
