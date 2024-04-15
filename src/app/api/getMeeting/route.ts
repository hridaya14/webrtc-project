import { config } from '@/conf/config';
import { MongoClient, PushOperator } from 'mongodb';
import { type NextRequest } from 'next/server'



export async function GET(request: NextRequest){
    const searchParams = request.nextUrl.searchParams
    const uid  = searchParams.get('uid')
    const limit = parseInt(searchParams.get('limit') || "2");
    
    try{
        const client = new MongoClient(config.MongoDB_URI);
        await client.connect();
        const db = client.db('IntelliStream');
        const collection = db.collection('Meetings');
        const user = await collection.findOne({uid});

        if(!user){
            return new Response(JSON.stringify({message: "User not found"}),{
                headers: {"Content-Type": "application/json"},
                status: 404
            });
        }

        const meetings = user.meetings;

        if(meetings.length === 0){
            return new Response(JSON.stringify({message: "No meetings found"}),{
                headers: {"Content-Type": "application/json"},
                status: 404
            });
        }

        const upcomingMeetings = meetings.filter((meeting: any) => {
            const meetingDate = new Date(meeting.date);
            const currentDate = new Date();
            return meetingDate >= currentDate;
        });

        return new Response(JSON.stringify({meetings: upcomingMeetings.slice(0,limit)}),{
            headers: {"Content-Type": "application/json"},
            status: 200
        });



    }
    catch(error){
        console.error("Error getting meetings:", error);
        return new Response(JSON.stringify({message: "Error getting meetings"}),{
            headers: {"Content-Type": "application/json"},
            status: 500
        });
    }
    
}