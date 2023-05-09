const https = require('https');
const cors = require('cors');
const express = require('express');
const bodyparser = require("body-parser");
const { get } = require('http');
const app = express();
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.set('view engine', 'ejs');

const port = process.env.PORT || 7070;

let count = 0;

app.get('/', (req, res) => {
    res.render('home')
    }
);

app.get('/suggest/:q', (req, res) => {
    count++;
    https.get(`https://www.google.com/complete/search?client=chrome&q=${req.params.q}`, (resp) => {
    let data = '';
    
    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
        data += chunk;
    });
    
    // The whole response has been received.
    resp.on('end', () => {
        res.send(JSON.parse(data)[1]);
    });
    
    }
    ).on("error", (err) => {
        console.log("Error: " + err.message);
    });
 

})

app.listen(port, () => {
    console.log(`Search Suggest app listening at http://localhost:${port}`);
    }
);