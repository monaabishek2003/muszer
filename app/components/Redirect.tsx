"use client"

import { useSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Redirect = () => {
  const session = useSession();
  const router = useRouter()
  useEffect(()=>{
    if(session.data?.user){
      router.push("/dashboard")
    }
  },[session])
  return null;
}

export default Redirect