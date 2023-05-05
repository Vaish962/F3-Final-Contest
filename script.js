const userIP = GetUserIP();
const accessToken = '447574e3dba83f';
const getDataBtn = document.getElementById('get-data');
const getData = document.getElementById('get-data');

let lat = document.getElementById('lat');
let city = document.getElementById('city');
let organisation = document.getElementById('Organisation');
let long = document.getElementById('Long');
let region = document.getElementById('Region');

const map = document.getElementById('map');

const timeZone = document.getElementById('time-zone');
const dateTime = document.getElementById('date-time');
const pincode = document.getElementById('pincode');
const message = document.getElementById('message');

const postOfficesList = document.getElementById('post-offices-list');

document.getElementById('ip').innerHTML = userIP;

function GetUserIP(){
    var ret_ip;
    $.ajaxSetup({async: false});
    $.get('https://api.ipify.org?format=json', function(r){ 
        ret_ip = r.ip; 
    });
    return ret_ip;
}

getDataBtn.addEventListener('click', fetchData);
async function fetchData()
{
    let res = await fetch(`https://ipinfo.io/${userIP}/json?token=${accessToken}`);
    let data = await res.json();
    console.log(data);

    lat.innerHTML = `Lat : ${data.loc.split(',')[0]}`;
    long.innerHTML = `Long : ${data.loc.split(',')[1]}`;
    city.innerHTML = `City : ${data.city}`;
    organisation.innerHTML = `Organisation : ${data.org}`;
    region.innerHTML = `Region : ${data.region}`;
    map.innerHTML = `<iframe src="https://maps.google.com/maps?q=${data.loc.split(',')[0]}, ${data.loc.split(',')[1]}&z=15&output=embed" width="360" height="270" frameborder="0" style="border:0"></iframe>`;
    
    timeZone.innerHTML = data.timezone;
    const today = new Date();
    dateTime.innerHTML = today.toISOString().split('T')[0] + " & " + today.toISOString().split('T')[1];
    pincode.innerHTML = data.postal;
    let postalOne = data.postal;
    postalData(postalOne);
}
async function postalData(pincode)
{
    let postalRes = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
    let postalData = await postalRes.json();
    console.log(postalData);
    message.innerHTML = postalData[0].Message;
                const postOffices = postalData[0].PostOffice;
                console.log(postOffices);
                postOffices.forEach((post) => {
                    postOfficesList.innerHTML += `<div class="post-office">
                    <div class="post-office-name">Name : ${post.Name}</div>
                    <div class="branch-type">Branch Type : ${post.BranchType}</div>
                    <div class="delivery-status">Delivery Status : ${post.DeliveryStatus}</div>
                    <div class="district">District : ${post.District}</div>
                    <div class="division">Division : ${post.Division}</div>
                </div>`
    })
}


fetchData();

function updatePostOffices() {
    
}