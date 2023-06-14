import type { NextApiRequest, NextApiResponse } from 'next';
import client from '@/libs/client';

type fontsUser = {
    user_name: string
    user_id: string
    user_pw: string
    user_session_id: string
    user_email_token: string
    user_email_confirm: string
}
  
interface data {
    fontsUser: fontsUser[],
}
  
export default async function handler(req: NextApiRequest, res: NextApiResponse<data>) {
    if (req.method === 'POST') {
        const userName = req.query.name === undefined ? '' : req.query.name as string;
        const userId = req.query.id === undefined ? '' : req.query.id as string;
        const userPw = req.query.pw === undefined ? '' : req.query.pw as string;

        const sendForm: any = await client.fontsUser.create({
            data: {
                user_name: userName,
                user_id: userId,
                user_pw: userPw,
                user_session_id: 'SESSION000001',
                user_email_token: 'randomnum',
                user_email_confirm: 'N',
            }
        });

        return res.status(200).json(sendForm);
    }
}