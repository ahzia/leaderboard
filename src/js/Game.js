export default class Game {
    constructor(name) {
        this.baseUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/';
        this.name = name;
        this.gameId =null;
        this.data=null;
    }
    async get() {
        const endpoint = this.baseUrl + this.gameId + '/scores/';
        await fetch(endpoint)
            .then(response => response.json())
            .then(data => this.data = data.result);
    }
    async save(name, score) {
        const endpoint = this.baseUrl + this.gameId + '/scores/';
        const data = { user: name, score:score };
        await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
    }
    async create() {
        const data = { name: this.name };
        let id;
        await fetch(this.baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                id = (data.result.replace('Game with ID: ', '')).replace(' added.', '');
            });
        this.gameId = id;
    }
}