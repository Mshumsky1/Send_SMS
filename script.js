// script.js
async function sendSMS(to, name) {
    const url = 'http://localhost:3000/send-sms';
    const params = new URLSearchParams({ to, name });
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const responseData = await response.json();
      console.log('Message sent successfully');
      console.log(responseData);
    } catch (error) {
      console.log('There was an error sending the message.');
      console.error(error);
    }
  }
  
  // Add an event listener to the form submission
  const form = document.getElementById('contact-form');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const name = form.name.value;
    const phone = form.phone.value;
  
    await sendSMS(phone, name);
  });