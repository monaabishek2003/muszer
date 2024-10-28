'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { PlusCircle } from 'lucide-react'

interface Song {
  id: string
  title: string
  thumbnail: string
  votes: number
}

interface AddSongFormProps {
  addSong: (song: Song) => void
}

export default function AddSongForm({ addSong }: AddSongFormProps) {
  const [url, setUrl] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const videoId = url.split('v=')[1]?.split('&')[0]
    
    if (videoId) {
      const placeholderSong: Song = {
        id: videoId,
        title: `Song Title for ${videoId}`,
        thumbnail: `https://img.youtube.com/vi/${videoId}/default.jpg`,
        votes: 0
      }
      addSong(placeholderSong)
      setUrl('')
    }
  }

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-2xl text-gray-100">Add a Song</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter YouTube URL"
            className="bg-gray-800 border-gray-700 placeholder-gray-500 text-gray-200"
          />
          <Button type="submit" className="w-full bg-gray-700 hover:bg-gray-600 text-gray-200">
            <PlusCircle className="w-5 h-5 mr-2" />
            Add Song
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}