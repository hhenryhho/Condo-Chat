import { extendTheme } from "@chakra-ui/react"

// Import global styles
import { globalStyles } from "./styles"

// Import foundations styles
import { config } from "./foundations/config"

// Import components styles
import { Button } from "./components/button"
import { Switch } from "./components/switch"

const theme = extendTheme(
  {
    ...globalStyles, // spread because it contains multiple properties
    config,
    components: {
      Button,
      Switch
    }
  }
)

export default theme