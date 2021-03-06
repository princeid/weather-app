const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#messageone')
const messageTwo = document.querySelector('#messagetwo')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.forecast.Location
                messageTwo.textContent = `${data.forecast.Forecast} with ${data.forecast.Humidity} humidity, and a temperature of ${data.forecast.Temperature} but feels like ${data.forecast.Feelslike}`
            }
        })
    })

})