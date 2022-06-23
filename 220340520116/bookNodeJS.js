const express = require('express');
const app = express();
// const cors = require('cors');
// app.use(cors());
const mysql = require('mysql2');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'vivek',
    password: 'cdac',
    database: 'wpt',
	port:3306
});                                     // connection to database is working



// const bodyParser = require('body-parser');

app.use(express.static('abc'));

app.get("/getBook", (req, resp) => {            // this method is working

    let output = {
        status: false
    }

    console.log("Object from HTML page is received.");      // working 
    let id = req.query.id;
    console.log(id);


    con.query('select bookid, bookname, price from book where bookid = ?', [id], (error, rows) => {
        if(rows.length > 0){
            output.status = true;
            output.details = rows[0];
            console.log(rows[0]);           // working properly
        }
        
        resp.send(output);

    })

})

// --------------------------------------------------

app.get("/update", (req, resp) => {            // this method is working

    let output = {
        status: false
    }

    console.log("Object from HTML page is received.");      // working 
    let id = req.query.id;
    console.log(id);


    con.query('update  bookid, bookname, price from book where bookid = ?', [id], (error, rows) => {
        if(rows.length > 0){
            output.status = true;
            output.details = rows[0];
            console.log(rows[0]);           // working properly
        }
        
        resp.send(output);

    })

})

// --------------------------------------------------

app.get("/insert", (req, resp) => {            // this method is working

    let output = {
        status: false
    }

    console.log("Object from HTML page is received.");      // working 
    let id = req.query.id;
    let name = req.query.name;
    let price = req.query.price;

    console.log(id + " " + name + " " + price);


    con.query('insert into book values (?, ?, ?);,', [id, name, price], (error, rows) => {
        if(rows.affectedRows > 0){
            output.status = true;
            console("sending object from server");
            // output.details = rows[0];
            // console.log(rows[0]);           // working properly
        }
        
        resp.send(output);

    })

})


app.listen(8081, () => {
    console.log("Server is Running...");
})