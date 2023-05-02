let url = 'http://numbersapi.com/';
let fav = 7;
let ul = document.querySelector('ul')
axios.get(`${url}${fav}?json`)
    .then(res => {
        console.log(res)
    })

let allFacts = [];

for(let i = 0; i < 4; i++){
    allFacts.push(axios.get(`${url}${fav}?json`))
}

Promise.all(allFacts)
    .then(facts => {
        for (res of facts) {
            let li = document.createElement('li')
            console.log(JSON.stringify(res.data) )
            li.append(JSON.stringify(res.data) )
            ul.append(li)
        }
    })





