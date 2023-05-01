// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Mpesa } from "mpesa-api";
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDocs,
  setDoc,
  limit,
  query,
  QueryDocumentSnapshot,
  updateDoc,
  where,
} from "@firebase/firestore";
import { Firestore } from "../../firebase";


type Data = {
  name: string;
  callback: string;
};

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//     if (req.method === "POST") {
//       // Process a POST request
//       const callbackData = req.body;
//       console.log('callback -->',callbackData)
//       await setDoc(doc(db, "cities", "LA"), {
//         name: "Los Angeles",
//         state: "CA",
//         country: "USA",
//       });
//        res.status(200).json({ callback: callbackData , name: "John Doe" });

//     } else {
//       // Handle any other HTTP method
//     }

 
// }
export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
      if (req.method === "POST") {
        // Process a POST request
        const callbackData = req.body;
        console.log('callback -->',callbackData)
     await setDoc(doc(Firestore, "orders", "LA"), {
       name: req.body,
       state: "CA",
       country: "USA",
     });
         res.status(200).json({ callback: callbackData , name: "John 1Doe" });

      } else {
        // Handle any other HTTP method
      }

 
};