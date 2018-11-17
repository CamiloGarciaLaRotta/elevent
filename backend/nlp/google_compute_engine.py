# Google Compute Engine implementation of the elevent NLP API

from google.cloud.language import enums
from google.cloud.language import types

def entities(text, salience, client):
		'''Detects entities in the text with a minimum salience'''

		document = types.Document(content=text, type=enums.Document.Type.PLAIN_TEXT)
		entities = client.analyze_entities(document).entities

		keywords = set()
		for entity in entities:
			if entity.salience > salience:
				keywords.add(entity.name.lower().replace('.',''))

		return keywords


def classifications(text, confidence, client):
		'''Classifies the text with a minimum confidence'''

		document = types.Document(content=text.encode('utf-8'), type=enums.Document.Type.PLAIN_TEXT)
		categories = client.classify_text(document).categories

		unique_words = set()
		for category in categories:
			if category.confidence > confidence:
				keywords = category.name.lower().replace('/', ' ').replace('&', '').split()
				for word in keywords:
					unique_words.add(word)

		return unique_words
