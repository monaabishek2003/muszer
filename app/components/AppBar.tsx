"use client";
import { log } from "console";
import { signIn, useSession, signOut } from "next-auth/react";

const AppBar: React.FC = (): React.ReactNode => {
  const session = useSession();
  console.log(session.data);

  return (
    <div className="flex justify-between px-20">
      <div className="text-lg font-bold flex flex-col justify-center text-white">
        MUsZER
      </div>
      <div>
        {session.data?.user ? (
          <button className="bg-purple-600 text-white hover:bg-purple-700 p-2" onClick={() => signOut()}>
            Signout
          </button>
        ) : (
          <button className="bg-purple-600 text-white hover:bg-purple-700 p-2 " onClick={() => signIn()}>
            SignIn
          </button>
        )}
      </div>
    </div>
  );
};

export default AppBar;
