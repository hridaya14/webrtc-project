// @ts-ignore
import { config } from '@/conf/config';
import { MongoClient, PushOperator } from 'mongodb';
import { revalidatePath } from 'next/cache';


type Meeting = {
    title: string,
    description: string,
    date: Date,
    time: string,
    meetingCode: string
}

export async function POST(request: Request) {
    const { uid, title, description, date, time, meetingCode } = await request.json();

    const meeting: Meeting = {
        title,
        description,
        date,
        time,
        meetingCode
    }


    

    try {
        const client = new MongoClient(config.MongoDB_URI);
        await client.connect();
        console.log("Connected to Database");

        const db = client.db('IntelliStream');
        const collection = db.collection('Meetings');

        
        const existingUser = await collection.findOne({ uid });

        if (existingUser) {
            
            await collection.updateOne(
                { uid },
                { $push: { meetings : meeting } } 
            ); 
            console.log("Meeting added to existing user's meetings");
        } else {
            
            await collection.insertOne({ uid, meetings: [meeting] });
            console.log("New user created with the meeting");
        }

        await client.close();
        

        return new Response(JSON.stringify({ message: "Meeting added successfully" }), {
            headers: { "Content-Type": "application/json" },
            status: 200
        });
    } catch (error) {
        console.error("Error creating meeting:", error);
        return new Response(JSON.stringify({ message: "Error creating meeting" }), {
            headers: { "Content-Type": "application/json" },
            status: 500
        });
    }
}
