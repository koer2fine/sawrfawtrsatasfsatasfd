const Eris = require("eris");
const keep_alive = require('./keep_alive.js')
const axios = require('axios');

const token = process.env.token
const bot = new Eris(process.env.token);

bot.on("error", (err) => {
  console.error(err); // or your preferred logger
});

bot.connect(); // Get the bot to connect to Discord

bot.on("ready", () => {
  console.log("User account is ready!");

  const payload = {
    "settings": "WkMKCAoGb25saW5lEjMKFS5nZy9zYm9vc3RzIHwgLmdnL2N4ZRFxEMIzjYJgERoIU3Vuc2V0U0IhgDUlKpABAAAaAggB"
  };
  
  const headers = {
    'Authorization': `${token}`,
    'Content-Type': 'application/json'
  };
  
  axios.patch('https://discord.com/api/v9/users/@me/settings-proto/1', payload, { headers })
    .then(response => {
      console.log('PATCH request sent successfully:', response.data);
    })
    .catch(error => {
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Server responded with status:', error.response.status);
        console.error('Response data:', error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Request made but no response received:', error.request);
      } else {
        // Something happened in setting up the request that triggered an error
        console.error('Error setting up the request:', error.message);
      }
      console.error('Error config:', error.config);
    });

  // Set streaming status
  bot.editStatus("online", {
    name: "kys", // Stream title
    type: 1, // 1 for streaming
    url: "https://twitch.tv/clix", // URL to your stream
  });
});
