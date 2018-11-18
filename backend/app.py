from flask import Flask, jsonify, request, Response
from flask_cors import CORS

from google.cloud import language
import meetup.api

import json

from nlp import google_compute_engine as nlp
from events import meetup as events

app = Flask(__name__)
CORS(app)

app.config.from_object('config')
meetup_client = meetup.api.Client(app.config['MEETUP_KEY'])
nlp_client = language.LanguageServiceClient()

@app.route('/events', methods=['POST'])
def routes_get():
	'''
	Return list of events in target city,country that contain the target keywords
	Expects a payload of the form: {"city": {"city": <city>, "country": <country>}, "footprint": [<text>], "limit": <int>}
	if no "footprint", then keywords needed
	'''

	if not request.data:
		missing_payload_message = 'malformed POST request: missing payload'
		app.logger.warn(missing_payload_message)
		error = {'error' : missing_payload_message}
		res =  jsonify(error), 400
		return res


	payload = json.loads(request.data)

	limit = payload['limit']

	keywords = []
	# TODO uncomment the method that yields best results: entities or classification
	if 'footprint' in payload:
		footprint = payload['footprint']
		keywords = nlp.entities(",".join(footprint), app.config['MIN_SALIENCE'], nlp_client)
		# keywords = nlp.classifications(",".join(footprint), app.config['MIN_CONFIDENCE'], nlp_client)

	else:
		keywords = payload['keywords']

	related_events = []
	if 'city' in payload:
		city = payload['city']['city']
		country = payload['city']['country']
		related_events = events.by_city(city, country, ','.join(keywords), limit, meetup_client)
	elif 'coord' in payload:
		lat = payload['coord']['lat']
		lon = payload['coord']['lon']
		related_events = events.by_coord(lat, lon, ','.join(keywords), limit, meetup_client)
	else:
		missing_location_message = 'malformed POST request: missing city or coord field'
		app.logger.warn(missing_location_message)
		error = {'error' : missing_location_message}
		res =  jsonify(error), 400
		return res

	return jsonify({'events':related_events, 'keywords': list(keywords)}), 200


if __name__ == "__main__":
	app.run()
