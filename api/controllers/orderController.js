exports.createOrder=async ()=>{
    const options = {
        amount: req.body.amount,
        currency: req.body.currency,
        receipt: req.body.receipt,
      };
      razorpay.orders.create(options, (error, order) => {
        if (error) {
          console.log(error);
          res.status(500).json({ error: 'Failed to create order' });
        } else {
          res.json(order);
        }
      });
}