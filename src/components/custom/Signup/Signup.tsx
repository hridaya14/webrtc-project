"use client";
import Link from "next/link";
import Image from "next/image";
import SignUp from "@/components/custom/Signup/form";
import { account } from "@/appwrite/config"
import { OAuthProvider } from "appwrite"



export default function Signup(){
  function handleGoogleOAuth ()  {
    try{
    account.createOAuth2Session(OAuthProvider.Google , "https://webrtc-project-six.vercel.app/Home" , "https://webrtc-project-six.vercel.app/Auth/Signup");
    
    }
    catch(error){
        console.error(error);
    }
}
  function handleGithubOAuth() {
    try{
        account.createOAuth2Session(OAuthProvider.Github, "https://webrtc-project-six.vercel.app/Home" , "https://webrtc-project-six.vercel.app/Auth/Signup");
    }
    catch(error){
        console.error(error);
    }
}
  return (
    
    <div className=" container h-screen space-y-4 flex flex-col justify-center ">
      <SignUp />
      <div className=" text-end w-full">
        <p className="text-center text-gray-500 text-sm">
          Already have an account? <Link href = "/Login">Sign In</Link>
        </p>
      </div>
      <div className="flex justify-center gap-8 w-full">
        <span className=" bg-white p-4 rounded-xl">
          <button onClick={handleGoogleOAuth}>
            <Image src="/google-icon.svg" alt="Google" width={28} height={28} />
          </button>
        </span>
        <span className="bg-black p-4 rounded-xl">
          <button onClick={handleGithubOAuth}>
            <Image
              src="/github-mark-white.svg"
              alt="Github"
              width={28}
              height={28}
            />
          </button>
        </span>
      </div>
    </div>
  );
}
