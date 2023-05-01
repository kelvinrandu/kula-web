// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Mpesa } from "mpesa-api";

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const credentials = {
    clientKey: "0eMGuCwOgTSxvAHowumqMpxuRLV1AwtT",
    clientSecret: " ZxP4RAziIcda9MCJ",
    initiatorPassword: "Safaricom999!*!",
    initiatorName: "testapi",
    securityCredential:
      "V3TPG978MhjQ670oMd1Euo1Heki5LeZsLtjP6LOJktko7kimf5WI7NOLU0OjiUpdtX7lpEcOqUEQk1WX5U32X+CgvtAyU8/UA/vl9HBEYoS8cCyQJOFuODOUhGVBE24ARgFRNuOk9+rQLnJFl3MTweJ2/82WJXMGSt3UFIcb4SM1TlE18TLWOYm2jKNqJOEvub7qMIymEDMkcG3JRzaJhhA7SI523ZWpw25h6uK6Kz3c6MhIxofJiLeVJFOAxUlO7oK4+EpHdTVK8LsYGl/tmyZst3kwBKAQxW052hb5nJfxnA0Hkrr3z7AQQSIUvyBIhEMpTGOAS0ctoPYLsih1/A==",
    certificatePath: null,
  };
  const environment = "sandbox";
  const mpesa = new Mpesa(credentials, environment);
 
mpesa
  .c2bSimulate({
    ShortCode: 123456,
    Amount: 1000 /* 1000 is an example amount */,
    Msisdn: 254711651196,
    CommandID: "Command ID" /* OPTIONAL */,
    // BillRefNumber: "Bill Reference Number" /* OPTIONAL */,
  })
  .then((response) => {
    //Do something with the response
    //eg
    console.log('error',response);
  })
  .catch((error) => {
    //Do something with the error;
    //eg
    console.error('error',error);
  });

  res.status(200).json({ name: 'John Doe' })
}
