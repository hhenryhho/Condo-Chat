import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import theme from '../theme'
import localFont from '@next/font/local'

const defaultFont = localFont({
  src: '../public/fonts/Blocky.ttf'
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </main>
  )
}
