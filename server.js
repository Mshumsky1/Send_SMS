const http = require('http');
const { Vonage } = require('@vonage/server-sdk');
const url = require('url');
const querystring = require('querystring');

const vonage = new Vonage({
  apiKey: "64c2ba84",
  apiSecret: "H2yufGl5zmDzpLOq"
});

const server = http.createServer(async (req, res) => {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === 'POST' && req.url === '/send-sms') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      const params = querystring.parse(body);
      const { to, name } = params;
      const from = "Vonage APIs";
      const text = `Hello ${name}, this is a text message sent using the Vonage SMS API`;

      try {
        const responseData = await vonage.sms.send({ to, from, text });
        console.log('Message sent successfully');
        console.log(responseData);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Message sent successfully', data: responseData }));
      } catch (error) {
        console.log('There was an error sending the message.');
        console.error(error);

        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'There was an error sending the message.', error }));
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
