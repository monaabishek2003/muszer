import { prismaClient } from "@/lib/db";
import { error, log } from "console";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod"; 
import youtubeSearchApi from "youtube-search-api";
import { title } from "process";
//@ts-ignore

const YT_REGEX = /^(?:(?:https?:)?\/\/)?(?:www\.)?(?:m\.)?(?:youtu(?:be)?\.com\/(?:v\/|embed\/|watch(?:\/|\?v=))|youtu\.be\/)((?:\w|-){11})(?:\S+)?$/;

const CreateStreamSchema = z.object({
  creatorId : z.string(),
  url : z.string()
})

export async function POST(req : NextRequest){
  try { 
    const data = CreateStreamSchema.parse(await req.json())
    const isYT = data.url.match(YT_REGEX);
    console.log(isYT);
    
    if(!isYT){
      return NextResponse.json({
        message : "Error While parsing URL"
      },{
        status:411
      }
      )
    };
    const extractedId = data.url.split('?v=')[1];

    const videoDetails = await youtubeSearchApi.GetVideoDetails(extractedId)
    console.log(videoDetails);
    
    const thumbnails = videoDetails.thumbnail.thumbnails
    const stream = await prismaClient.stream.create({
      data : {
        userId : data.creatorId,
        url : data.url,
        type: "Youtube",
        extractedId,
        addedBy: data.creatorId,
        smallImg: (thumbnails.length > 1 ? thumbnails[thumbnails.length-2].url : thumbnails[thumbnails.length-1].url ) ?? "",
        bigImg : thumbnails[thumbnails.length-1].url ?? "",
        title : videoDetails.title ?? ""
      }
    });

    return NextResponse.json({
      message : "Sucessfully Created a Stream",
      id : stream.id,
      title : videoDetails.title,
      thumbnail : videoDetails.thumbnail,
      smallImg: (thumbnails.length > 1 ? thumbnails[thumbnails.length-2] : thumbnails[thumbnails.length-1] ) ?? "",
      bigImg : thumbnails[thumbnails.length-1] ?? "",
    })
  }catch(e)
  { 
    console.error(e);
    return NextResponse.json({
      message : "Error While adding a Stream",
    },{
      status:411
    }
  )
  }
}

export async function GET(req : NextRequest) { 
  const creatorId = req.nextUrl.searchParams.get("creatorId");  
  const streams = await prismaClient.stream.findMany({
    where: { 
      userId : creatorId ?? "",
    }
  })

  return NextResponse.json({
    streams
  })
}
  