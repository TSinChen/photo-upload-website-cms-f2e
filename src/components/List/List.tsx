import { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import {
  Box,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  CardActions,
  Button,
  DialogActions,
  Backdrop,
  CircularProgress,
} from '@mui/material'

import api from '../../apis/apis'
import { Post } from '../../types/post'

const List = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [dialogImage, setDialogImage] = useState<{ open: boolean; post: Post | null }>({
    open: false,
    post: null,
  })
  const [dialogDelete, setDialogDelete] = useState(false)
  const [dialogDeletePost, setDialogDeletePost] = useState<{ id: Post['_id']; title: Post['title'] }>({
    id: '',
    title: '',
  })
  const [isWaiting, setIsWaiting] = useState(false)

  const fetchPosts = async () => {
    try {
      const result = await api.getPosts()
      setPosts(result.data.reverse())
    } catch (error) {
      console.error(error)
    }
  }

  const openDialogImage = (index: number) => {
    setDialogImage({ open: true, post: posts[index] })
  }

  const closeDialogImage = () => {
    setDialogImage({ open: false, post: null })
  }

  const checkDelete = (id: Post['_id'], title: Post['title']) => {
    setDialogDelete(true)
    setDialogDeletePost({ id, title })
  }

  const deletePost = async () => {
    setIsWaiting(true)
    try {
      setDialogDelete(false)
      await api.deletePost(dialogDeletePost.id)
      setDialogDelete(false)
      setDialogDeletePost({ id: '', title: '' })
      await fetchPosts()
    } catch (error) {
      console.error(error)
    } finally {
      setIsWaiting(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
      {posts.map((post, index) => (
        <Card sx={{ margin: '8px' }} key={post._id}>
          <CardContent>
            <Typography variant="h5" my={1}>
              {post.title}
            </Typography>
            <Typography variant="body1" my={1}>
              {post.description}
            </Typography>
            <img
              src={post.imageLink}
              style={{ width: '400px', height: '400px', objectFit: 'contain', cursor: 'zoom-in' }}
              onClick={() => openDialogImage(index)}
            />
            <Typography variant="body1" mt={1} textAlign="right">
              {`上傳時間 ${dayjs(post.createdAt).format('YYYY/MM/DD HH:mm')}`}
            </Typography>
          </CardContent>
          <CardActions style={{ justifyContent: 'flex-end' }}>
            <Button variant="contained" color="error" onClick={() => checkDelete(post._id, post.title)}>
              刪除
            </Button>
          </CardActions>
        </Card>
      ))}
      <Dialog open={dialogImage.open} onClose={closeDialogImage}>
        <DialogTitle>
          <Typography variant="h5" my={1}>
            {dialogImage.post?.title}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <img
            src={dialogImage.post?.imageLink}
            style={{ width: '100%', height: '100%', cursor: 'zoom-out' }}
            onClick={closeDialogImage}
          />
        </DialogContent>
      </Dialog>
      <Dialog open={dialogDelete} onClose={() => setDialogDelete(false)}>
        <DialogTitle>{`確認刪除 ${dialogDeletePost.title} ？`}</DialogTitle>
        <DialogActions>
          <Button variant="contained" color="error" onClick={deletePost}>
            刪除
          </Button>
        </DialogActions>
      </Dialog>
      <Backdrop open={isWaiting} style={{ zIndex: 99 }}>
        <CircularProgress />
      </Backdrop>
    </Box>
  )
}

export default List
