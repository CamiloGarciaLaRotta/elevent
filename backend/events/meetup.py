
def events(city, country, keywords, limit, client):
	raw_events = client.GetOpenEvents(city=city, country=country, text=', '.join(keywords), trending='desc=true')

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

	return events
