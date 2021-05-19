import './style.css'
import iconMarker from '../images/icon-location.svg'


// DOM Elements
const ipAddressSpan = document.getElementById('ipAddress');
const locationSpan = document.getElementById('location');
const timezoneSpan = document.getElementById('timezone');
const ispSpan = document.getElementById('isp');
let inputString = document.getElementById('ipDomainInput');
const submitButton = document.getElementById('submitButton');


// would normally hide in config file
const api_key = 'at_hlldI2XUhNd2GIJ4XptHrsXlIZEga';

let ipAddressInput = '';
let domainAddress = '';

// initialize map container
let myMap = L.map('mapid', { zoomControl: false });
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })
    .addTo(myMap);

const onClickButton = () => {
    
    // check if incoming search is IP address or domain name
    const ipFormat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    

    if (inputString.value.match(ipFormat)) {
        ipAddressInput = inputString.value;
    } else if (inputString.value === '') {
        ipAddressInput = '';
        domainAddress = '';
    } else {
        domainAddress = inputString.value;
    }
    getGeolocation();
}

// initialize marker
let marker;

// import map
function loadMap(lat, long) {
    
    // set view on map with lat and long passed in from getGeolocation
    myMap.setView([lat, long], 13);

    // set icon style
    const myIcon = L.icon({
        iconUrl: iconMarker,
        iconSize: [34, 40],
        iconAnchor: [17, 40]
    })

    // remove current marker and reset marker on map
    if (marker) {
        marker.remove();
    }
    marker = L.marker([lat, long], {icon: myIcon}).addTo(myMap);
}

// call geolocationAPI
async function getGeolocation() {
    loadInformationCardData('--', '--', '--', '--'); 
    try {
        const res = await fetch(`https://geo.ipify.org/api/v1?apiKey=${api_key}&ipAddress=${ipAddressInput}&domain=${domainAddress}`, {
            method: 'GET'
        });
        const data = await res.json();
    
        // variables for loadMap
        let latitude = data.location.lat;
        let longitude = data.location.lng;

        // variables for loadInformationCardData
        const ipAddress = data.ip;
        const location = `${data.location.city}, ${data.location.region} ${data.location.postalCode}`
        const timezone = `UTC ${data.location.timezone}`
        const isp = data.isp;

        
        loadMap(latitude, longitude);
        loadInformationCardData(ipAddress, location, timezone, isp);        

    } catch (error) {
        console.log(error.message)
    }
}

// add information to informationCard
function loadInformationCardData (ip, location, timezone, isp) {
    ipAddressSpan.innerHTML=ip;
    locationSpan.innerHTML=location;
    timezoneSpan.innerHTML=timezone;
    ispSpan.innerHTML=isp;
}

window.addEventListener('load', getGeolocation);
submitButton.addEventListener('click', onClickButton);