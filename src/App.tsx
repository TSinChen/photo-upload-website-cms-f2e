import { Box } from '@mui/material'

import Form from './components/Form/Form'
import List from './components/List/List'

const App = () => {
  console.log('test: ', process.env.API_URL)
  return (
    <Box sx={{ display: 'flex', margin: '40px auto', flexDirection: 'column', alignItems: 'center' }}>
      <Form />
      <Box my={3} />
      <List />
    </Box>
  )
}

export default App
