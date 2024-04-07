import { Client,Account, Databases, Avatars } from 'appwrite';
import {config} from '../conf/config';


export const client = new Client();

client
    .setEndpoint(config.base_url)
    .setProject(config.project_id);

export const account = new Account(client);

export const database = new Databases(client);

export const avatars = new Avatars(client);



