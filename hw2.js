let url = 'http://numbersapi.com/';
let fav = 7;
let ul = document.querySelector('ul')

async function t() {
    let res = await axios.get(`${url}${fav}?json`)
    console.log(res)
}

async function allFacts() {
    let facts = await Promise.all([
        axios.get(`${url}${fav}?json`),
        axios.get(`${url}${fav}?json`),
        axios.get(`${url}${fav}?json`),
        axios.get(`${url}${fav}?json`)
    ])
    for(fact of facts) {
        let li = document.createElement('li')
        li.append(JSON.stringify(fact.data))
        ul.append(li)
    }
}


const deck = {
    async init() {
        let res = await axios.get('https://deckofcardsapi.com/api/deck/new/')
        this.id = res.data.deck_id
    },
    async shuffle() {
        let res = await axios.get(`https://deckofcardsapi.com/api/deck/${this.id}/shuffle/`)
    },
    async drawCard() {
        let res = await axios.get(`https://deckofcardsapi.com/api/deck/${this.id}/draw/?count=1`)
        console.log(res.data.cards[0])
        return res.data.cards[0]
    }
}

let button = document.querySelector('#deck-button');
let deckDiv = document.querySelector('.deck')

button.addEventListener('click',async function(e){
    e.preventDefault();
    let card = await deck.drawCard();
    let div = document.createElement('div')
    let img = document.createElement('img')
    img.setAttribute('src', `${card.image}`)
    div.append(img)
    deckDiv.append(div)
})

document.addEventListener("DOMContentLoaded", async function(){
    await deck.init();
    await deck.shuffle();
});