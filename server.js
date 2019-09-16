let express = require('express')
let app = express()
let bodyParser = require('body-parser')
let csvEvent = require('./events/csv')
let csvRes = []
app.use(express.static("static"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.post('/api/postcode',(req,res)=>{
    let postcodeBody = req.body.postcode;
    let postcodeRev = postcodeBody.replace(" ",'');
    let postcodeReq = postcodeRev.toUpperCase();
    csvEvent.readcsv(csvRes,postcodeReq,res);
})

let port = process.env.PORT || 5000;
app.listen({port:port},()=>console.log(`Server listening on port ${port}`))