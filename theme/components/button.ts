import { defineStyleConfig } from '@chakra-ui/react'

const baseStyle = {
  fontWeight: 'bold',
  textTransform: 'uppercase',
}

const sizes = {
  sm: {
    fontSize: 'sm',
    px: 4, // <-- px is short for paddingLeft and paddingRight
    py: 3, // <-- py is short for paddingTop and paddingBottom
  },
  md: {
    fontSize: 'md',
    px: 6, // <-- these values are tokens from the design system
    py: 4, // <-- these values are tokens from the design system
  },
}

const variants = {
  outline: {
    border: '2px solid',
    borderColor: 'purple.500',
    color: 'purple.500',
  },
  solid: {
    bg: 'purple.500',
    color: 'white',
  },
}



export const Button = defineStyleConfig({
  baseStyle,
  sizes,
  variants,
  defaultProps: {
    size: 'md',
    variant: 'outline',
  },
})