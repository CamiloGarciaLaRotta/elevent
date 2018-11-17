"use strict;"

const footprint = [
    "This message is especially for beginners interested in learning French. These are not private lessons but a sharing of knowledge in a casual and informal atmosphere. I'm not a professional teacher but I can help you to acquire the basics of French language.",
    "In this class we will focus on improving your understanding of English Grammar and improving your vocabulary. The topics selected for teaching will be based on the needs of the students in the class",
    " Who we are: We are a group of people from a variety of different countries that meet once a week to chat, meet new people and practice other language(s)."
  ]

const limit = 5

function eventsByCity(event) {
  cityPayload = {
    city: {
      city: this.options[this.selectedIndex].getAttribute('value'),
      country: 'ca'
    },
    footprint: footprint,
    limit: limit
  }

  post(cityPayload).then(events => { displayEventsAsList(events); })
}

function eventsByCoord(event) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      coordPayload = {
        coord: {
          lon: position.coords.longitude,
          lat: position.coords.latitude
        },
        footprint: footprint,
        limit: limit
      }
      console.log('heeeeere')
      post(coordPayload).then(events => {
        console.log(events);
        displayEventsAsList(events); })
      console.log('not heheeeeere')
    });
  } else {
      alert("Geolocation is not supported by this browser.");
  }
}

async function post(payload) {
  const rawResponse = await fetch('http://localhost:5000/events', {
    method: 'POST',
    mode: "cors",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin" : "*",
      "Access-Control-Allow-Credentials" : true
    },
    body: JSON.stringify(payload)
  });
  return await rawResponse.json()
}

function displayEventsAsList(events) {
  let eventList = events.reduce((result, event) => {
    result += `
      <li>
        <h3>
          <a href="${event.url}">${event.name}</a>
        </h3>
        <ul>
          <li>${event.group}</li>
        </ul>
      </li>`
    return result;
  }, '');

  document.getElementById('output').innerHTML = `<ol>${eventList}</ol>`
}
