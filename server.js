let express = require('express')
const cors=require('cors')
const jwt=require('express-jwt')
const connectDB=require('./config/db')

const http=require('http');
const dotenv=require('dotenv')
const helmet = require("helmet");
const cron=require('node-cron')
const user=require('./api/routes/userRoutes')
const gymcenter=require('./api/routes/gymcenterRoutes')
const gymcenterdetails=require('./api/routes/gymcenterdetailsRoutes')
const gymequipment=require('./api/routes/gymequipmentsRoutes');
const sporttrainer=require('./api/routes/sporttrainerRoutes')
const faqs=require('./api/routes/gymfaqsRoutes')
const role=require('./api/routes/roleRoutes')
const plan=require('./api/routes/plansRoutes')
const contact=require('./api/routes/contactusRoutes')
const career=require('./api/routes/careerRoutes')

// const facilties=require('./api/routes/facilitiesRoutes')
const verfiy=require('./api/routes/verifyRoutes')
const revieworder=require('./api/routes/revieworderRoutes')
const memberofplan=require('./api/routes/memberofplanaccountRoutes')
const refundPlan=require('./api/routes/refundplanRoutes');
const { refunding } = require('./api/controllers/cronController');
const dashboard=require('./api/routes/dashboardRoutes')
const team=require('./api/routes/teamRoutes')
const voucher=require('./api/routes/voucherRoutes');
const feedbackWithRating = require('./api/routes/feedbackwithratingRoutes');
const subscribe = require('./api/routes/subscribeRoutes');
const app=express()
const axios = require('axios');
const server=http.createServer(app)
const VendorRouter=require('./routes/vendor/router')
const centerTyperoute=require('./api/routes/centerTypeRoute')
const orderReview=require('./api/routes/createorderRoute')
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended: 'false'}))

connectDB()
PORT=process.env.PORT||8000


// HELMET Content Security Policy
app.use(
    helmet({
      crossOriginEmbedderPolicy: false,
      // ...
    })
  );

const razorpay = require("razorpay");

app.get("/order", async (req, res, next) => {
  var instance = new razorpay({
      key_id: 'rzp_test_VYQEOXFEnP5Ni5',
      key_secret: 'hN6IH4bHPTBO3utx9uDymYtM'
  })

  const payment_capture = 1;
  const amount = 499;
  const currency = "INR";

  const options = {
      amount: amount * 100,
      currency,
      receipt: "somehastage#id",
      payment_capture,
  };

  try {
      const response = await instance.orders.create(options); 
      res.json({
          id: response.id,
          currency: response.currency,
          amount: response.amount,
      });
  } catch (error) {
      console.log(error);
  }

})

  //  Vendor Routes start
  app.use('/vendor',VendorRouter )
  // Vendor Routes end
app.use(express.static(__dirname + '/assets'));
app.use('/assets',express.static('./assets'))
app.use('/orderapi',orderReview)
app.use('/api',centerTyperoute)
app.use('/v1.0/user',user)
app.use('/v1.0/gymcenter',gymcenter)
app.use('/v1.0/gymcenterdetails',gymcenterdetails)
app.use('/v1.0/gymequipment',gymequipment)
app.use('/v1.0/sporttrainer',sporttrainer)
app.use('/v1.0/faqs',faqs)
app.use('/v1.0/role',role)
app.use('/v1.0/plan',plan)
app.use('/v1.0/contact',contact)
app.use('/v1.0/career',career)
// app.use('/v1.0/facilities',facilties)
app.use('/v.1.0/verfiy',verfiy)
app.use('/v.1.0/review-order',revieworder)
app.use('/v.1.0/memberofplan',memberofplan)
app.use('/v.1.0/refundPlan',refundPlan)
app.use('/v.1.0/dashboard',dashboard)
app.use('/v.1.0/team',team)
app.use('/v.1.0/voucher',voucher)
app.use('/v.1.0/feedbackwithrating',feedbackWithRating)
app.use('/v.1.0/subscribe',subscribe)
app.post('/v.1.0/googlemap',(req,res)=>{
  let {lat1,lng1,lat2,lng2}=req.body
let url1=`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${lat1},${parseFloat(lng1)}&destinations=${parseFloat(lat2)},${parseFloat(lng2)}&key=AIzaSyBb4tKYYFZpXBdaaKbVvEIFfEFy4SdjcRg`
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: url1,
    headers: { }
  };
  
  axios.request(config)
  .then((response) => {
    
    res.status(200).send({status:true,data:response.data})
    
  })
  .catch((error) => {
    console.log(error);
  });
})

app.get('/',(req, res)=>{
  res.send('server is running')
})
app.listen(PORT,function(){
    console.log("Server started at",PORT)
})


