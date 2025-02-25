// WEB SERVER API
const { networkInterfaces } = require('os');
const http = require('https');
const url = require("url");
const fs = require("fs");
const { json } = require("stream/consumers");

const options = {
    key: fs.readFileSync('../key.pem'),
    cert: fs.readFileSync('../cert.pem')
};
const hostname = getIPv4Address();
const port = 5051;

const server = http.createServer(options, (req, res) => {
    res.statusCode = 200;

    let qo = url.parse(req.url, true).query;

    console.log(req.url);
    if (req.method == "POST") // handle GET requests
    {
        var body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = JSON.parse(Buffer.concat(body).toString());
            res.setHeader('Content-Type', '*/*');
            res.end();
            subscribtions.push(body);
        });
    } else if(req.method == "GET"){
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.write(keys.publicKey);
        res.end();
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at https://${hostname}:${port}/`);
});

function getIPv4Address() {
    const net_list = networkInterfaces();

    for (let net_key in net_list) {
        let nets = net_list[net_key];
        for (let index in nets) {
            let netInfo = nets[index];
            if (netInfo["family"] == "IPv4") {
                if (netInfo["address"] != "127.0.0.1")
                    return netInfo["address"];
            }
        }
    }

    return "127.0.0.1";
}



// PUSH API
let push = require("web-push");

//let keys = push.generateVAPIDKeys();
//console.log(keys);
let keys = {
    publicKey: 'BH69VL8FeYwTWbYD7CKbSp8MA88nm-5sBYMHuLx2Nr7ykoBnt8gTwItwbckbuw12SvXlWOMhyADk1dz2ZMkZC80',
    privateKey: 'Tisaa736V6-BF_3L5hiOTuqUnmdPW67PgauLoyhiVfk'
};

push.setVapidDetails("mailto:test@code.co.uk", keys.publicKey, keys.privateKey);

let subscribtions = [];
setInterval(()=>{
    for(sub of subscribtions){
        push.sendNotification(sub, "Message of server");
    }
}, 5000);