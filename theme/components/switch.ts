import { switchAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(switchAnatomy.keys)

const baseStyle = definePartsStyle({
  container: {
  },
  // Thumb is the switch's handle
  thumb: {
    bg: 'red.500',
  },
  // Track is the switch's path
  track: {
    bg: 'gray.500',
    _checked: {
      bg: 'red.200',
    },
  },
})

const boxy = definePartsStyle({
  track: {
    borderRadius: 'sm',
    p: 1,
  }
})


export const Switch = defineMultiStyleConfig({
  baseStyle,
  variants: { boxy },
  defaultProps: {
    size: 'lg',
  }
})