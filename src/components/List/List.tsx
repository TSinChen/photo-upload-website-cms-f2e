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

  const openDialog = (index: number) => {
    setDialogImage({ open: true, post: posts[index] })
  }

  const checkDelete = (id: Post['_id'], title: Post['title']) => {
    setDialogDelete(true)
    setDialogDeletePost({ id, title })
  }

  const deletePost = async () => {
    setIsWaiting(true)
    try {
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
              style={{ width: '400px', height: '400px', objectFit: 'contain', cursor: 'pointer' }}
              onClick={() => openDialog(index)}
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
      <Dialog open={dialogImage.open} onClose={() => setDialogImage({ open: false, post: null })}>
        <DialogTitle>{dialogImage.post?.title}</DialogTitle>
        <DialogContent>
          <img src={dialogImage.post?.imageLink} style={{ width: '100%', height: '100%' }} />
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
    </Box>
  )
}

export default List
