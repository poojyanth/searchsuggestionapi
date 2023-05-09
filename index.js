const https = require('https');
const express = require('express');
const bodyparser = require("body-parser");
const { get } = require('http');
const app = express();
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 7070;

app.get('/', (req, res) => {
    res.send('<h1>Search Suggest</h1><p>Search Suggest API is working</p><p>Try <a href="/suggest/india">/suggest/india</a></p>');
    }
);

app.get('/suggest/:q', (req, res) => {
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