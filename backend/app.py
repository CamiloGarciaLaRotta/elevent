from flask import Flask, jsonify, request, Response
from google.cloud import language
import meetup.api

from nlp import google_compute_engine as nlp

app = Flask(__name__)
app.config.from_object('config')
meetup_client = meetup.api.Client(app.config['MEETUP_KEY'])
nlp_client = language.LanguageServiceClient()

@app.route('/events', methods=['POST'])
def routes_get():
	'''
	Return list of events in target city,country that contain the target keywords
	Expects a payload of the form: {"venue": {"city": <city>, "country": <country>}, "footprint": [<text>]}
	'''

	if not request.json:
		missing_payload_message = 'malformed POST request: missing payload'
		app.logger.warn(missing_payload_message)
		error = {'error' : missing_payload_message}
		res =  jsonify(error), 400
		return res

	payload = request.json

	city = payload['venue']['city']
	country = payload['venue']['country']
	footprint = payload['footprint']
	limit = payload['limit']

	# TODO uncomment the method that yields best results: entities or classification
	keywords = nlp.entities(",".join(footprint), app.config['MIN_SALIENCE'], nlp_client)
	# keywords = nlp.classifications(",".join(footprint), app.config['MIN_CONFIDENCE'], nlp_client)

	raw_events = meetup_client.GetOpenEvents(city=city, country=country, text=', '.join(keywords), trending='desc=true')

	events = []
	processed_events = 0
	for event in raw_events.results:
		if processed_events >= limit:
				break

		processed_events += 1
		events.append({
			'url': event.get('event_url', ''),
			'name': event.get('name', ''),
			'group': event.get('group', {}).get('name',''),
			'time': event.get('time', ''),
			'address': event.get('venue', {}).get('address_1', ''),
			'description': event.get('description', '')
	})

	return jsonify(events), 200


if __name__ == "__main__":
	app.run()
