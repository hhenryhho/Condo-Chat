import {
  Button,
  Flex,
  FormControl,
  Input,
  ListItem,
  Switch,
  Text,
  Textarea,
  UnorderedList,
  useColorMode
} from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { prisma } from '../lib/db'
import Head from 'next/head'

interface Notes {
  notes: {
    id: string
    title: string
    content: string
  }[]
}

interface FormData {
  title: string
  content: string
  id: string
}

const Home = ({ notes }: Notes) => {
  const [form, setForm] = useState<FormData>({ title: '', content: '', id: '' })
  const { colorMode, toggleColorMode } = useColorMode()
  const router = useRouter()

  const refreshData = () => {
    router.replace(router.asPath)
  }

  async function create(data: FormData) {
    try {
      fetch('http://localhost:3000/api/create', {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      }).then(() => {
        if (data.id) {
          deleteNote(data.id)
          setForm({ title: '', content: '', id: '' })
          refreshData()
        } else {
          setForm({ title: '', content: '', id: '' })
          refreshData()
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  async function deleteNote(id: string) {
    try {
      fetch(`http://localhost:3000/api/note/${id}`, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'DELETE'
      }).then(() => {
        refreshData()
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async (data: FormData) => {
    try {
      create(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Head>
        <title>Boiler with Chakra</title>
        <meta name="description" content="Henry's preferences" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Text textAlign="center" fontSize="5xl" mt="4">
        Notes
      </Text>
      <Flex w="auto" minW="25%" maxW="min" mx="auto" flexDir="column">
        <form
          onSubmit={e => {
            e.preventDefault()
            handleSubmit(form)
          }}>
          <FormControl>
            <Input
              type="text"
              placeholder="Title"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              border="2px"
              borderRadius="sm"
              borderColor="gray.600"
              p="1"
            />
            <Textarea
              placeholder="Content"
              value={form.content}
              onChange={e => setForm({ ...form, content: e.target.value })}
              border="2px"
              borderRadius="sm"
              borderColor="gray.600"
              p="1"
            />
            <Button
              type="submit"
              bg="blue.500"
              textColor="white"
              p="0.25rem"
              w="100%">
              Add
            </Button>
          </FormControl>
        </form>
      </Flex>
      <Flex
        w="auto"
        minW="25%"
        maxW="min"
        mx="auto"
        my="6"
        flexDir="column"
        alignItems="stretch">
        <UnorderedList>
          {notes.map(note => (
            <ListItem
              key={note.id}
              borderBottomWidth="1px"
              borderColor="gray.600"
              p="2">
              <Flex justify="space-between">
                <Flex flexDir="column">
                  <Text fontSize="xl" fontWeight="bold">
                    {note.title}
                  </Text>
                  <Text fontSize="sm">{note.content}</Text>
                </Flex>
                <Button
                  mr="3"
                  px="3"
                  onClick={() =>
                    setForm({
                      title: note.title,
                      content: note.content,
                      id: note.id
                    })
                  }>
                  Update
                </Button>
                <Button px="3" onClick={() => deleteNote(note.id)}>
                  X
                </Button>
              </Flex>
            </ListItem>
          ))}
        </UnorderedList>
      </Flex>
      <Switch onChange={toggleColorMode} isChecked={colorMode === 'dark'} />
    </>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
  const notes = await prisma.note.findMany({
    select: {
      title: true,
      id: true,
      content: true
    }
  })

  return {
    props: {
      notes
    }
  }
}
