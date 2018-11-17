## HOW TO
- Get the json I sent in the chat
  ```bash
  mv ~/Downloads/google_credentials.json /path/to/elevent/backend
  ```
- Create a virtual env
  ```bash
    cd backend
    python -m venv .env
  ```
- Activate the virtual env
  ```bash
    source .env/bin/activate
  ```
- Install all the dependencies
  ```bash
    pip install -r requirements.txt
  ```
- Start the server
  ```bash
    python app.py
  ```
- Test the `/events` endpoint with a dummy payload
  ```bash
    curl -i -H "Content-Type: application/json" -d@events_payload.json localhost:5000/events
  ```
- Deactivate the virtual env
  ```bash
    deactivate
  ```
