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












// Client ID and API key from the Developer Console
var CLIENT_ID = '636309282143-ud66bqrocla99eok4hcq199mvlp76upo.apps.googleusercontent.com';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"];

// Authorization scopes required by the API. If using multiple scopes,
// separated them with spaces.
var SCOPES = 'https://www.googleapis.com/auth/youtube.readonly';

var authorizeButton = document.getElementById('authorize-button');
var signoutButton = document.getElementById('signout-button');

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
  gapi.client.init({
    discoveryDocs: DISCOVERY_DOCS,
    clientId: CLIENT_ID,
    scope: SCOPES
  }).then(function () {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    authorizeButton.onclick = handleAuthClick;
    signoutButton.onclick = handleSignoutClick;
  });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    authorizeButton.style.display = 'none';
    signoutButton.style.display = 'block';
    getChannel();
  } else {
    authorizeButton.style.display = 'block';
    signoutButton.style.display = 'none';
  }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}

/**
 * Append text to a pre element in the body, adding the given message
 * to a text node in that element. Used to display info from API response.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
  var pre = document.getElementById('content');
  var textContent = document.createTextNode(message + '\n');
  pre.appendChild(textContent);
}

/**
 * Print files.
 */
function getChannel() {
  gapi.client.youtube.channels.list({
    'part': 'snippet,contentDetails,statistics',
    'forUsername': 'GoogleDevelopers'
  }).then(function(response) {
    var channel = response.result.items[0];
    appendPre('This channel\'s ID is ' + channel.id + '. ' +
              'Its title is \'' + channel.snippet.title + ', ' +
              'and it has ' + channel.statistics.viewCount + ' views.');
  });
}
