// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Mpesa } from "mpesa-api";

type Data = {
  name: string;
  callback: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    if (req.method === "POST") {
      // Process a POST request
      const callbackData = req.body;
      console.log('callback -->',callbackData)
       res.status(200).json({ callback: callbackData , name: "John Doe" });

    } else {
      // Handle any other HTTP method
    }

 
}
