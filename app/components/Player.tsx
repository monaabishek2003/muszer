'use client'

import { useState, useEffect, useRef } from 'react'
import { Play, Pause, SkipForward } from 'lucide-react'
import YouTube from 'react-youtube'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

interface Song {
  id: string
  title: string
  thumbnail: string
  votes: number
}

interface PlayerProps {
  currentSong: Song | null
  playNext: () => void
}

export default function Player({ currentSong, playNext }: PlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const playerRef = useRef<any>(null)

  useEffect(() => {
    if (currentSong) {
      setIsPlaying(true)
    }
  }, [currentSong])

  const togglePlay = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pauseVideo()
      } else {
        playerRef.current.playVideo()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const onReady = (event: { target: any }) => {
    playerRef.current = event.target
    if (isPlaying) {
      event.target.playVideo()
    }
  }

  const onEnd = () => {
    playNext()
  }

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-2xl text-gray-100">Now Playing</CardTitle>
      </CardHeader>
      <CardContent>
        {currentSong ? (
          <div className="space-y-4">
            <div className="aspect-video rounded-lg overflow-hidden">
              <YouTube
                videoId={currentSong.id}
                opts={{
                  height: '100%',
                  width: '100%',
                  playerVars: {
                    autoplay: isPlaying ? 1 : 0,
                  },
                }}
                onReady={onReady}
                onEnd={onEnd}
                className="w-full"
              />
            </div>
            <div className="text-center font-semibold text-lg text-gray-300">{currentSong.title}</div>
            <div className="flex justify-center space-x-4">
              <Button onClick={togglePlay} variant="outline" className="bg-gray-700 hover:bg-gray-600 text-gray-200 border-gray-600">
                {isPlaying ? <Pause className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}
                {isPlaying ? 'Pause' : 'Play'}
              </Button>
              <Button onClick={playNext} variant="outline" className="bg-gray-700 hover:bg-gray-600 text-gray-200 border-gray-600">
                <SkipForward className="w-5 h-5 mr-2" />
                Next
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">No song selected</p>
        )}
      </CardContent>
    </Card>
  )
}