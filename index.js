var crypto = require('crypto')
var express = require('express')
var bodyParser = require('body-parser')
var axios = require('axios')

var app=express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//START SERVER
let port = process.env.PORT || 4000
app.listen(port,()=>{
    console.log(`You're Connected in port : ${port}`);
})

var sha256 = function (signature,secret_key) {
    var hash = crypto.createHmac('sha256',secret_key)
    hash.update(signature)
    var value = hash.digest('hex')
    return value
    
}

app.get("/",(req,res,next)=>{
    res.end(JSON.stringify(`Welcome to Putra Nugroho [Absensi] RestAPI port : ${port}`))
})

app.post("/check_saldo",(req,res,next)=>{

    const clientID = "ATMPNN"
    const ClientSecret = `52TK3zfB")feeX};`
    const timestamp = req.body.timestamp
    const mti = req.body.mti
    const kd = req.body.trn_code
    const userid = req.body.termid
    const trcid = req.body.rrn
    const data = req.body.data
    const card_no = req.body.data.card_no
    const amount = req.body.data.amount
    const trace_id = req.body.data.trace_id
    const time_trn = req.body.data.time_trn
    const date_trn = req.body.data.date_trn
    const merch_type = req.body.data.merch_type
    const pos_entry = req.body.data.pos_entry
    const network = req.body.data.network
    const acquirer_id = req.body.data.acquirer_id
    const merch_id = req.body.data.merch_id
    const location = req.body.data.location
    const iss_acct_dr = req.body.data.iss_acct_dr

    const response = {
        mti: mti,
        trn_code: kd,
        termid: userid,
        timestamp: timestamp,
        rrn: trcid,
        rcode: '00',
        rc_desc: 'SUKSES',
        data: {    
            card_no : card_no,
            trn_code : kd,
            amount : amount,
            trace_id : trace_id,
            time_trn : time_trn,
            date_trn : date_trn,
            merch_type : merch_type,
            pos_entry : pos_entry,
            network : network,
            acquirer_id : acquirer_id,
            location : location,
            iss_acct_dr : iss_acct_dr,
            acct_balance : `150000000.00`
        }
        }

    res.end(JSON.stringify(response))
    // const body = `{"kd":"8001","userid":"ATM01","trcid":"20210531094415","data":{"noacc":"1100100023"}}`
    // const signature = clientID+body+timestamp
    // const secret_key = ClientSecret+trcid

    // const api_signature = sha256(signature,secret_key)  

    // axios({
    //     method: 'post',
    //     url: 'http://103.101.225.212:12413/mgp/api-atm',
    //     headers: {
    //         'api-signature': 'a594fb1651356e3ef5f8c32f4d779212717ea2c9d5d9fbb98060a499e4aa0e57',
    //         'api-timestamp': '20210723152334'
    //         },
    //     data: {
    //         "kd": "8001",
    //         "userid": "ATM01",
    //         "trcid": "20210531094415",
    //         "data": {
    //             "noacc": "1100100023"
    //         }
    //     }
    // }).then(function (response) {
    //     console.log(response.data)
    //     res.end(JSON.stringify(response.data))
    // });
})