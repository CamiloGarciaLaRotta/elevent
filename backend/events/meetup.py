def by_city(city, country, keywords, limit, client):
	raw_events = client.GetOpenEvents(city=city, country=country, text=', '.join(keywords), limited_events=True, trending='desc=true')
	return _process_events(raw_events, limit)

def by_coord(lat, lon, keywords, limit, client):
	raw_events = client.GetOpenEvents(lat=lat, lon=lon, text=', '.join(keywords), limited_events=True, trending='desc=true')
	return _process_events(raw_events, limit)

def _process_events(raw_events, limit):
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
