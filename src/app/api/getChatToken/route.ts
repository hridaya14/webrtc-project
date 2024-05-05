import { NextRequest } from "next/server";
import { StreamChat } from 'stream-chat'
import { config } from "@/conf/config";

export async function GET(request: NextRequest){
    const searchParams = request.nextUrl.searchParams
    const uid  = String(searchParams.get('uid'));

    const serverClient = StreamChat.getInstance( config.getStream_API , config.getStream_Secret );
    const token = serverClient.createToken(uid);

    if (!token || !serverClient ) {
        return {
            status: 500,
            body: "Error"
        }
    }

    return new Response(JSON.stringify({"Token" : token}),{
        headers: {"Content-Type": "application/json"},
        status: 200
    });



}