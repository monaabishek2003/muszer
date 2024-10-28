import { ThumbsUp, ThumbsDown } from 'lucide-react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

interface Song {
  id: string
  title: string
  thumbnail: string
  votes: number
}

interface QueueProps {
  songs: Song[]
  vote: (id: string, increment: number) => void
}

export default function Queue({ songs, vote }: QueueProps) {
  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-2xl text-gray-100">Queue</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {songs.map((song) => (
            <li key={song.id} className="flex items-center space-x-4 bg-gray-800 p-3 rounded-lg transition-all hover:bg-gray-700">
              <Image src={song.thumbnail} alt={song.title} width={60} height={45} className="rounded" />
              <span className="flex-grow text-sm text-gray-300">{song.title}</span>
              <span className="font-bold text-gray-400">{song.votes}</span>
              <Button variant="ghost" size="sm" onClick={() => vote(song.id, 1)} className="text-gray-400 hover:text-gray-200 hover:bg-gray-600">
                <ThumbsUp className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => vote(song.id, -1)} className="text-gray-400 hover:text-gray-200 hover:bg-gray-600">
                <ThumbsDown className="w-5 h-5" />
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}