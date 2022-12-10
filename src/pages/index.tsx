import { Flex, Text, Link } from '@chakra-ui/react'
import React, { useContext } from 'react'
import AuthError from '../components/AuthError'
import useAuth from '../hooks/useAuth'
import { UserContext, UserContextInterface } from '../contexts/AuthContext'

const Home = () => {
  const { user } = useContext(UserContext) as UserContextInterface
  const { authError, handleSignIn, signout, loading } = useAuth()

  if (loading) return <p>Loading...</p>

  return (
    <>
      <Flex flexDir="column">
        <Text>
          {user ? `Welcome ${user.metadata.creationTime}` : 'Please sign in'}
        </Text>
        {!user && (
          <Text fontWeight="medium">
            Sign in as a{' '}
            <Link
              color="brand.blueHighlight"
              fontWeight="bold"
              onClick={() => handleSignIn('guest')}>
              guest
            </Link>
          </Text>
        )}
        {user && (
          <Text fontWeight="medium">
            <Link
              color="brand.blueHighlight"
              fontWeight="bold"
              onClick={() => signout()}>
              Sign out
            </Link>
          </Text>
        )}
        {authError && <AuthError />}
      </Flex>
    </>
  )
}

export default Home
