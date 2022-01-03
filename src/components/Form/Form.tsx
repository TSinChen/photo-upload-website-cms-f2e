import { useState, FormEvent } from 'react'
import { Box, Button, Card, TextField, Backdrop, CircularProgress } from '@mui/material'

import api from '../../apis/apis'

const Form = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imageLink, setImageLink] = useState('')
  const [isWaiting, setIsWaiting] = useState(false)

  const handleClear = () => {
    setTitle('')
    setDescription('')
    setImageLink('')
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsWaiting(true)
    try {
      await api.uploadPost({ title, description, imageLink })
      handleClear()
      location.reload()
    } catch (error) {
      console.error(error)
    } finally {
      setIsWaiting(false)
    }
  }

  return (
    <Card sx={{ width: '600px' }}>
      <form onSubmit={handleSubmit}>
        <Box m={2}>
          <TextField
            label="標題"
            required
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Box>
        <Box m={2}>
          <TextField
            label="敘述"
            required
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Box>
        <Box m={2}>
          <TextField
            label="連結"
            required
            fullWidth
            value={imageLink}
            onChange={(e) => setImageLink(e.target.value)}
          />
        </Box>
        <Box m={2}>
          <Button variant="contained" type="submit">
            送出
          </Button>
        </Box>
      </form>
      <Backdrop open={isWaiting} style={{ zIndex: 99 }}>
        <CircularProgress />
      </Backdrop>
    </Card>
  )
}

export default Form
