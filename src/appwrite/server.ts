import  { Client,Account } from 'node-appwrite'
import { config } from '@/conf/config';

const client = new Client();
client
    .setEndpoint(config.base_url)
    .setProject(config.project_id) 
    .setKey(config.Api_Key)

export const users = new Account(client)

