"use strict;"

// limit of events to show
// TODO this could be a radio button with options: show 10, 15, 50, all
const limit = 5

// get the events related to the footprint of the user in the chosen city
function eventsByCity(event) {
  getFootprint().then(footprint => {
    cityPayload = {
      city: {
        city: this.options[this.selectedIndex].getAttribute('value'),
        country: 'ca'
      },
      footprint: footprint,
      limit: limit
    }

    post(cityPayload).then(response => {
      console.log(response)
      displayEventsAsList(response.events);
      displayKeywordsAsList(response.keywords);
    })
  })
}

// make a POST request with the payload to the backend
async function post(payload) {
  let rawResponse = await fetch('http://localhost:5000/events', {
    method: 'POST',
    // mode: "same",/
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin" : "*",
      // "Access-Control-Allow-Credentials" : true
    },
    body: JSON.stringify(payload)
  });

  try {
    let events = await rawResponse.json()
    return events
  }catch(e){
    console.log(e)
  }
}

// generate a list of events in the DOM
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

  document.getElementById('events').innerHTML = `<ol>${eventList}</ol>`
}
// generate a list of events in the DOM
function displayKeywordsAsList(keywords) {
  let keywords_list = keywords.reduce((result, word) => {
    result += `
    <li>
      <code>${word}</code>
    </li>`
    return result;
  }, '');

  document.getElementById('keywords').innerHTML = `<ul>${keywords_list}</ul>`
}


// fetch the footprint of the logged-in user
async function getFootprint() {
  let response = await gapi.client.youtube.subscriptions.list({
    'part': 'snippet',
    'mine': 'true'
  })

  let channels = response.result.items;
  let footprint = channels.map(channel => {
    let cleanTitle = clean(channel.snippet.title)
    let cleanDescription = clean(channel.snippet.description)
    return `${cleanTitle} ${cleanDescription}`
  })

  return  footprint;
}

// remove noice from youtube channel descriptions
let clean = text =>
  text.toLowerCase().replace('subscribe', '').replace('donate', '').replace('donations', '').replace('share', '').replace('bitcoin', '')





// GOOGLE API CODE

// Client ID and API key from the Developer Console
var CLIENT_ID = '636309282143-ud66bqrocla99eok4hcq199mvlp76upo.apps.googleusercontent.com';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"];

// Authorization scopes required by the API. If using multiple scopes,
// separated them with spaces.
var SCOPES = 'https://www.googleapis.com/auth/youtube.readonly';

var authorizeButton = document.getElementById('youtube-login-button');
var signoutButton = document.getElementById('youtube-logout-button');
var cityDropDown = document.getElementById('city_select');
var output = document.getElementById('output');

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
    cityDropDown.style.display = 'block';
  } else {
    authorizeButton.style.display = 'block';
    signoutButton.style.display = 'none';
    cityDropDown.style.display = 'none';
    output.innerHTML = "";

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