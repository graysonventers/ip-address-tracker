// DOM Elements
const ipAddressSpan = document.getElementById('ipAddress');
const locationSpan = document.getElementById('location');
const timezoneSpan = document.getElementById('timezone');
const ispSpan = document.getElementById('isp');


let ipAAddress = '';
let domainAddress = 'ebay.com';
const api_key = 'at_hlldI2XUhNd2GIJ4XptHrsXlIZEga';

// import map
function loadMap(lat, long) {
    var mymap = L.map('mapid').setView([lat, long], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mymap);
}

// add information to informationCard
function loadInformationCardData (ip, location, timezone, isp) {
    ipAddressSpan.innerHTML=ip;
    locationSpan.innerHTML=location;
    timezoneSpan.innerHTML=timezone;
    ispSpan.innerHTML=isp;
}


// call geolocationAPI
async function getGeolocation() {
    try {
        const res = await fetch(`https://geo.ipify.org/api/v1?apiKey=${api_key}&ipAddress=${ipAAddress}&domain=${domainAddress}`);
        const data = await res.json();
        console.log(data)
        // variables for loadMap
        const latitude = data.location.lat;
        const longitude = data.location.lng;

        // variables for loadInformationCardData
        const ipAddress = data.ip;
        const location = `${data.location.city}, ${data.location.region} ${data.location.postalCode}`
        const timezone = `UTC ${data.location.timezone}`
        const isp = data.isp;

        loadInformationCardData(ipAddress, location, timezone, isp);        
        loadMap(latitude, longitude);

    } catch (error) {
        console.error(error)
    }
    
}

getGeolocation()