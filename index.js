var express = require('express')
var bodyParser = require('body-parser')
var mysql = require('mysql')

//CONNECT TO MYSQL
var conn = mysql.createConnection({
    host:'us-cdbr-east-03.cleardb.com',
    user:'b1ac05f9bac715',
    password:'de7cb19a',
    database:'heroku_c21ba68034e1281'
})

var app=express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//START SERVER
let port = process.env.PORT || 4000
app.listen(port,()=>{
    console.log(`You're Connected in port : ${port}`);
})

app.get("/",(req,res,next)=>{
    res.end(JSON.stringify(`Welcome to Putra Nugroho [Absensi] RestAPI port : ${port}`))
})

// CREATE CART
app.post('/addOrder', (req, res) => {
    const sql = `INSERT INTO order (pemesan, pasien, detail_pesanan)
                VALUES ( '${req.body.pemesan}', '${req.body.pasien}', '${req.body.detail_pesanan}' )`

    conn.query(sql, (err,result) => {
        if (err) return res.send(err)

        res.send(result)
    })
})

router.get('/history', (req, res) => {
    const sql = `select * from order;`

    conn.query(sql,(err, result) => {
        if(err) return res.send(err)

        res.send(result)
    })
})

router.get('/detail_history/:trans_id', (req, res) => {
    const sql = `SELECT * FROM order
                WHERE trans_id = ?`
    const data = req.params.trans_id

    conn.query(sql, data, (err, result) => {
        if(err) return res.send(err)

        res.send(result)
    })
})