import midtransClient from 'midtrans-client'

export const pay = (req, res) => {
   let snap = new midtransClient.Snap({
      isProduction : false,
      serverKey : 'SB-Mid-server-8NVH_4adw6TPQYznMWYz0u6m'
   })

   let parameter = {
      "transaction_details": {
         "order_id": Math.random(0, 9999),
         "gross_amount": 10000
      },
      "credit_card":{
         "secure" : true
      },
      "customer_details": {
         "first_name": "budi",
         "last_name": "pratama",
         "email": "budi.pra@example.com",
         "phone": "08111222333"
      }
   };

   snap.createTransaction(parameter)
   .then((transaction)=>{
      // transaction token
      let transactionToken = transaction.token;
      const redirect_url = `https://app.sandbox.midtrans.com/snap/v2/vtweb/${transactionToken}`
      console.log('transactionToken:',transactionToken);
      return res.status(200).json({transactionToken, redirect_url})
   })
   
}