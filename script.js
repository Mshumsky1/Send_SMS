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
      return true;
    } catch (error) {
      console.log('There was an error sending the message.');
      console.error(error);
      return false;
    }
  }
  
  function isValidPhoneNumber(phone) {
    // Updated regular expression to match the format 81-70-8959-5295
    const phoneNumberRegex = /^\d{2}\d{2}\d{4}\d{4}$/;
    return phoneNumberRegex.test(phone);
  }
  
  
  // Add an event listener to the form submission
  const form = document.getElementById('contact-form');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const name = form.name.value;
    const phone = form.phone.value;
  
    if (!isValidPhoneNumber(phone)) {
      alert('Please enter a valid phone number.');
      return;
    }
  
    const success = await sendSMS(phone, name);
  
    const messageElement = document.getElementById('message');
    if (success) {
      messageElement.textContent = 'Thanks, check your phone for a code';
    } else {
      messageElement.textContent = 'There was an error sending the message.';
    }
  });
