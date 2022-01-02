import { useState } from 'react'
import { Box, Button, Card, TextField } from '@mui/material'
import api from '../../apis/apis'

const Form = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imageLink, setImageLink] = useState('')

  const handleClear = () => {
    setTitle('')
    setDescription('')
    setImageLink('')
  }

  const handleSubmit = async () => {
    try {
      await api.uploadPost({ title, description, imageLink })
      handleClear()
      location.reload()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Card sx={{ width: '600px' }}>
      <Box m={2}>
        <TextField label="標題" fullWidth value={title} onChange={(e) => setTitle(e.target.value)} />
      </Box>
      <Box m={2}>
        <TextField
          label="敘述"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Box>
      <Box m={2}>
        <TextField label="連結" fullWidth value={imageLink} onChange={(e) => setImageLink(e.target.value)} />
      </Box>
      <Box m={2}>
        <Button variant="contained" onClick={handleSubmit}>
          送出
        </Button>
      </Box>
    </Card>
  )
}

export default Form
