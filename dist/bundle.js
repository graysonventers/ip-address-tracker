(()=>{const t=document.getElementById("ipAddress"),e=document.getElementById("location"),o=document.getElementById("timezone"),n=document.getElementById("isp");let i=document.getElementById("ipDomainInput");const a=document.getElementById("submitButton");let c,l="",d="",s=L.map("mapid",{zoomControl:!1});async function r(){m("--","--","--","--");try{const t=await fetch(`https://geo.ipify.org/api/v1?apiKey=at_hlldI2XUhNd2GIJ4XptHrsXlIZEga&ipAddress=${l}&domain=${d}`,{method:"GET"}),e=await t.json();let o=e.location.lat,n=e.location.lng;const i=e.ip,a=`${e.location.city}, ${e.location.region} ${e.location.postalCode}`,r=`UTC ${e.location.timezone}`,p=e.isp;!function(t,e){s.setView([t,e],13);const o=L.icon({iconUrl:"../images/icon-location.svg",iconSize:[34,40],iconAnchor:[17,40]});c&&c.remove(),c=L.marker([t,e],{icon:o}).addTo(s)}(o,n),m(i,a,r,p)}catch(t){console.log(t.message)}}function m(i,a,c,l){t.innerHTML=i,e.innerHTML=a,o.innerHTML=c,n.innerHTML=l}L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(s),window.addEventListener("load",r),a.addEventListener("click",(()=>{i.value.match(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/)?l=i.value:""===i.value?(l="",d=""):d=i.value,r()}))})();