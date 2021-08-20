import sleep from './sleep.js';
import request from './request.js';
import { env } from 'process';

const {
    TG_BOT_TOKEN,
    TG_CHAT,
} = env;

/** @arg {string} text */
export default async function sendMessage(text){
    let sent = false;
    while(!sent) try{
        await request(`https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`, JSON.stringify({
            chat_id: TG_CHAT,
            parse_mode: 'HTML',
            text,
        }), {
            'Content-Type': 'application/json',
        });
        sent = true;
    } catch(e){
        console.error('Failed to send message: ' + e.message + '. Retry in 5s');
        await sleep(5000);
    }
}
