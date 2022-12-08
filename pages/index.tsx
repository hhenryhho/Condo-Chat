import { Button, Switch, Text, useColorMode } from '@chakra-ui/react'
import Head from 'next/head'
export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <>
      <Head>
        <title>Boiler with Chakra</title>
        <meta name="description" content="Henry's preferences" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Text>Hello World!</Text>
      <Button>Hello</Button>
      <Switch onChange={toggleColorMode} isChecked={colorMode === 'dark'} />
    </>
  )
}
