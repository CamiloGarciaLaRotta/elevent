# HOW TO
## Start the Server
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

## Testing the API via cURL
- Test the `/events` endpoint with a dummy payload
  ```bash
    curl -i -H "Content-Type: application/json" -d@events_payload.json localhost:5000/events
  ```
## Testing the API via Front-end
- Open in a browser `frontend/static/index.html`
  ```bash
    google-chrome ../frontend/static/index.html
  ```
- Open the google dev tools (right click in the website, inspect)
- Check the console output

## Shutdown server
- Shutdown server with  `ctrl-c`
- Deactivate the virtual env
  ```bash
    deactivate
  ```
