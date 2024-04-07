"use client";

import Link from "next/link";
import Image from "next/image";
import { account } from "@/appwrite/config"
import { OAuthProvider } from "appwrite"
import LoginForm from "./form";


export default function Login() {
  function handleGoogleOAuth ()  {
    try{
    account.createOAuth2Session(OAuthProvider.Google , "http://localhost:3000/" , "https://localhost:3000/Auth/Signup");
    
    }
    catch(error){
        console.error(error);
    }
}
  function handleGithubOAuth() {
    try{
        account.createOAuth2Session(OAuthProvider.Github, "http://localhost:3000/", "https://localhost:3000/Auth/Signup");
    }
    catch(error){
        console.error(error);
    }
}
  return (
    <div className=" container h-screen space-y-4 flex flex-col justify-center ">
      <LoginForm />
      <div className=" text-end w-full">
        <p className="text-center text-gray-500 text-sm">
          Dont Have an Account? <Link href = "/Signup">Register</Link>
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
