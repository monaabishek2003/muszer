'use client'

import { useState, useEffect } from 'react'
import Queue from './Queue'
import Player from './Player'
import AddSongForm from './AddSongForm'

interface Song {
  id: string
  title: string
  thumbnail: string
  votes: number
}

export default function DashBoard() {
  const [songs, setSongs] = useState<Song[]>([])
  const [currentSong, setCurrentSong] = useState<Song | null>(null)

  useEffect(() => {
    if (songs.length > 0 && !currentSong) {
      setCurrentSong(songs[0])
    }
  }, [songs, currentSong])

  const addSong = (newSong: Song) => {
    setSongs(prevSongs => {
      const updatedSongs = [...prevSongs, newSong]
      if (!currentSong) {
        setCurrentSong(newSong)
      }
      return updatedSongs
    })
  }

  const vote = (id: string, increment: number) => {
    setSongs(prevSongs => 
      prevSongs.map(song => 
        song.id === id ? { ...song, votes: song.votes + increment } : song
      ).sort((a, b) => b.votes - a.votes)
    )
  }

  const playNext = () => {
    const currentIndex = songs.findIndex(song => song.id === currentSong?.id)
    if (currentIndex < songs.length - 1) {
      setCurrentSong(songs[currentIndex + 1])
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-12 text-center text-gray-100">
          Music Pool Player
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <AddSongForm addSong={addSong} />
            <Queue songs={songs} vote={vote} />
          </div>
          <div>
            <Player currentSong={currentSong} playNext={playNext} />
          </div>
        </div>
      </div>
    </div>
  )
}