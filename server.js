const express = require('express');
const app = express();
const PORT = process.env.PORT || 3008u;

app.use(express.json()); // Middleware to parse JSON request bodies

// Sample data: List of available health checkup services
const services = [
  { id: 1, name: 'Basic Health Checkup', price: 500, details: 'Includes basic tests for BP, sugar, and cholesterol.' },
  { id: 2, name: 'Advanced Health Checkup', price: 1500, details: 'Includes full body tests and consultations.' },
  { id: 3, name: 'Diabetes Checkup', price: 800, details: 'Specialized tests for diabetes management.' },
];

// Endpoint to get the list of services
app.get('/services', (req, res) => {
  res.json(services);
});

// Endpoint to get details of a specific service by ID
app.get('/services/:id', (req, res) => {
  const service = services.find(s => s.id === parseInt(req.params.id));
  if (!service) {
    return res.status(404).send('Service not found.');
  }
  res.json(service);
});

// Endpoint to book an appointment
app.post('/book', (req, res) => {
  const { name, serviceId, date } = req.body;

  if (!name || !serviceId || !date) {
    return res.status(400).send('Please provide name, service ID, and appointment date.');
  }

  const service = services.find(s => s.id === serviceId);
  if (!service) {
    return res.status(404).send('Selected service not found.');
  }

  res.json({
    message: 'Appointment booked successfully!',
    appointmentDetails: {
      name,
      service: service.name,
      date,
      price: service.price,
    },
  });
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Healthcare Checkup App running at http://0.0.0.0:${PORT}`);
});
