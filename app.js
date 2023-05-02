/*let planet;

$.getJSON('https:/swapi.coapi/planets/1/', response => {
    planet = response;
    console.log(planet);
});*/
/*
let url = 'https:/swapi.dev/api/planets/1/';

let ourFirstPromise = axios.get(url);

ourFirstPromise.then(res =>{ 
    console.log(res.data)
     axios.get(res.data.residents[0])
        .then(res => {
            console.log(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    });
ourFirstPromise.catch(err => console.log(err));*/

let url = 'https:/swapi.dev/api/planets/1/';
const h1 = document.querySelector('h1');

/*setTimeout(function() {
    h1.style.color = 'red'
    setTimeout(() => {
        h1.style.color = 'blue'
        setTimeout(() => {
            h1.style.color = 'green'
        },1000)
    },1000)
},1000)*/

function changeColor(el,color){
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            el.style.color = color;
            resolve()
        },1000)
    })
}
changeColor(h1,'red')
    .then(() => {
        return changeColor(h1,'orange')
    })
    .then(() => changeColor(h1,'blue'))
    .then(() => changeColor(h1,'green'))
    .then(() => changeColor(h1,'white'))
    .then(() => changeColor(h1,'violet'))

axios.get(url)
    .then(res => {
        console.log(res.data)
        return axios.get(res.data.residents[0])
    })
    .then(res => {
        console.log(res.data)
        return axios.get(res.data.films[0])
    })
    .then(res => {
        console.log(res.data)
    })
    .catch(err => console.log('rejected',err))

function wait3Seconds() {
    return new Promise((resolve,reject) => {
        setTimeout(resolve,3000) 
    })
}

wait3Seconds()
.then(() => console.log('DONE'))
.catch(() => console.log('ERROR'))


let mock = new Promise(function (resolve,reject) {
    let prob = .5;
    let time = 1000;

    setTimeout(function () {
        let random = Math.random();
        if (random < prob){
            let data = 'heres the data'
            resolve(data)
        }
        else {
            reject('you failed fuck u')
        }
    },time)
})

mock
.then (data => {
    console.log(data)
    return data
})
.then(data => console.log(data))
.catch(err => console.log(err))


function get (url) {
    const request = new XMLHttpRequest;
    return new Promise((resolve,reject) => {
        request.onload = function () {
            if (request.readyState !== 4) return;

            if (request.status >= 200 && request.status < 300){
                resolve({
                    data : JSON.parse(request.response),
                    status: request.status,
                    request:request,
                    headers: request.getAllResponseHeaders()
                })
            }
            else {
                reject(request.status)
            }
        }
        request.onerror = function handleError() {
            request = null;
            reject('NEtWORK')
        };
        request.open('GET',url);
        request.send();
    })
}

get('https:/swapi.dev/api/planets/1/')
    .then(res => {
        console.log(res,'THIS IS OTHER THING')
        return get('https:/swapi.dev/api/planets/2/')
    })
    .then(res => console.log(res))
    .catch(err => console.log(err))

let fourPoke = [];

for (let i = 1; i < 5 ; i++){
    fourPoke.push(
        axios.get(`https://pokeapi.co/api/v2/pokemon/${i}/`)
    );
}

Promise.all(fourPoke)
    .then(PokemonArr => {
        for (res of PokemonArr){
            console.log(res.data.name)
        }
    })
    .catch(err => console.log(err))

console.log(fourPoke)


class Pokemon {
    constructor(id) {
        this.id = id;
        this.types = [];
    }
    async getInfo() {
        let res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${this.id}`);
        this.name = res.data.name;
        for (let type of res.data.types) {
            this.types.push(type.type.name)
        }
    }
}

async function catchSome() {
    let url = `https://pokeapi.co/api/v2/pokemon`;
    let pokemon = await Promise.all([
        axios.get(`${url}/1/`),
        axios.get(`${url}/2/`),
        axios.get(`${url}/3/`)
    ]);
    
}