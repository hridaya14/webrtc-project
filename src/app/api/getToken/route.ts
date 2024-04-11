import {RtcRole,RtcTokenBuilder} from 'agora-token';
import { config } from '@/conf/config';

export async function POST(request: Request){
    const {channel,uid,expire} = await request.json();

    const expireTimeValue = expire ? parseInt(expire, 10) : 3600;
    const currentTime = Math.floor(Date.now() / 1000);
    const privilegeExpireTime = currentTime + expireTimeValue;
    
    const tokenA = RtcTokenBuilder.buildTokenWithUid(config.App_ID, config.Certificate, channel, 0, RtcRole.PUBLISHER, expireTimeValue, privilegeExpireTime);

    return Response.json({ token : tokenA });

}