console.log('js script is loaded')
    // const fetch = require('node-fetch')
fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data);
    })
})

const weatherForm = document.querySelector('form')
const search = document.getElementById('search-box')
const messageOne = document.getElementById('messageOne')
const messageTwo = document.getElementById('messageTwo')

weatherForm.addEventListener('submit', (e) => {
    const location = search.value
    messageOne.textContent = '....Loading'
    e.preventDefault()
    fetch('http://localhost:3000/wheather?adress=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = JSON.stringify(data.error)
                messageTwo.textContent = ''
            } else {
                messageTwo.textContent = JSON.stringify(data.forecast)
                messageOne.textContent = ''
            }
        })
    })


})