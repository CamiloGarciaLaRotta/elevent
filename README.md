# Elevent
CodeJam 2018 Pattern Recognition Project

## The problem
When looking for events nearby you, you manually have to input your fields of interest.
There is an inherent bias in the results due to the fact that you cannot possibly list everything that defines you.
Elevent makes the asumption that your digital footprint is a good-enough estimate of your general interests.

## From the user's perspective
1. Grant access to Elevent to your Google account's public data
2. Choose a location for which you wish to find events
3. Optionally add and remove keywords to tailor suit the event search
4. Optionally change the amount of events to be displayed

## Under the hood
1. Elevent will gather public information on your online accounts.
  In this demo, we leverage Google's OAuth2 to access the user's subscribed channels.
2. From this footprint, we query Google's Cloud Natural Language API to extract and categorize key entities.
3. With the resulting keywords, We query event web services and forums for events nearby a given location.
  In this demo, we use Meetup's API.
  
## The Tech Stack
### Backend
- Flask
- Google OAuth2
- Google Youtube API v3
- Meetup API

### Frontend
- vanilla Javascript (ES6)
- vanilla CSS
- Materialize

<img src="https://raw.githubusercontent.com/arasatasaygin/openlogos/master/docs/logos/blush.jpg" width="200" />
