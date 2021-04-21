// require('dotenv').config();

alert('connected')

// console.log(process.env)
// import map
var mymap = L.map('mapid').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// call geolocationAPI
async function getGeolocation() {
    try {
        const res = await fetch(`https://geo.ipify.org/api/v1?apiKey=at_hlldI2XUhNd2GIJ4XptHrsXlIZEga&ipAddress=8.8.8.8
        `)

        const data = await res.json();
        console.log(data)
    } catch (error) {
        console.error(error)
    }
    
}

getGeolocation()