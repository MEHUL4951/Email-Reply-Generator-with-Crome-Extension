import { useState } from 'react'
import axios from 'axios'
import CheckCircleIcon from '@mui/icons-material/CheckCircle' 

import './App.css'
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material'

function App() {
  const [emailContent, setEmailContent] = useState('')
  const [emailTone, setEmailTone] = useState('')
  const [generatedReply, setGeneratedReply] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await axios.post('http://localhost:8080/api/email/generate', {
        emailContent,
        emailTone,
      })
      setGeneratedReply(
        typeof response.data === 'string'
          ? response.data
          : JSON.stringify(response.data)
      )
    } catch (error) {
      setError('Failed to generate Email reply. Please try again')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedReply)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Email Reply Generator
      </Typography>

      <Box sx={{ mx: 3 }}>
        <TextField
          fullWidth
          multiline
          rows={6}
          variant="outlined"
          label="Original Email Content"
          value={emailContent}
          onChange={(e) => setEmailContent(e.target.value)}
          sx={{ mb: 2 }}
        />

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Tone (Optional)</InputLabel>
          <Select
            value={emailTone}
            label="Tone (Optional)"
            onChange={(e) => setEmailTone(e.target.value)}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="professional">Professional</MenuItem>
            <MenuItem value="casual">Casual</MenuItem>
            <MenuItem value="friendly">Friendly</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!emailContent || loading}
          fullWidth
        >
          {loading ? <CircularProgress size={24} /> : 'Generate Reply'}
        </Button>
      </Box>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {generatedReply && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Generated Reply
          </Typography>

          <TextField
            fullWidth
            multiline
            rows={6}
            variant="outlined"
            value={generatedReply || ''}
            inputProps={{ readOnly: true }}
          />

          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
            <Button variant="outlined" onClick={handleCopy}>
              Copy to Clipboard
            </Button>

            {copied && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  ml: 2,
                  color: 'green',
                }}
              >
                <CheckCircleIcon sx={{ mr: 0.5 }} />
                <Typography variant="body2">Copied!</Typography>
              </Box>
            )}
          </Box>
        </Box>
      )}
    </Container>
  )
}

export default App
