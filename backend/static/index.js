function main() {

  const payload = {
    venue: {
      'city': "montreal",
      'country': "ca"
    },
    footprint: [
      "This message is especially for beginners interested in learning French. These are not private lessons but a sharing of knowledge in a casual and informal atmosphere. I'm not a professional teacher but I can help you to acquire the basics of French language.",
      "In this class we will focus on improving your understanding of English Grammar and improving your vocabulary. The topics selected for teaching will be based on the needs of the students in the class",
      " Who we are: We are a group of people from a variety of different countries that meet once a week to chat, meet new people and practice other language(s)."
    ],
    limit: 1
  };

  (async () => {
    const rawResponse = await fetch('http://localhost:5000/events', {
      method: 'POST',
      mode: "cors",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin" : "*",
        "Access-Control-Allow-Credentials" : true
      },
      body: JSON.stringify(payload)
    });
    const content = await rawResponse.json()

    console.log(content);
  })();
}

(() => main())()
