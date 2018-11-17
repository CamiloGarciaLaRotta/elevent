import os

# API keys
MEETUP_KEY = '351916153c920577a73e5927515c6b'
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = './google_credentials.json'

# server parameters
DEBUG = True

# application parameters
MIN_CONFIDENCE = 0.6
MIN_SALIENCE = 0.01
