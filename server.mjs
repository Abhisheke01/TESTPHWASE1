import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;



// AMPLE  patient data
let patients = [
  {
    id: 1,
    name: 'Abhishek Naidu',
    age: 22,
    ward: 'NONE',
    bloodType: 'A+',
    disease: 'NONE'
  },
  {
    id: 2,
    name: 'CHUCK',
    age: 45,
    ward: 'Neurology',
    bloodType: 'O-',
    disease: 'Parkinson\'s disease'
  },
  {
    id: 3,
    name: 'CHUCK',
    age: 45,
    ward: 'Neurology',
    bloodType: 'O-',
    disease: 'Parkinson\'s disease'
  }
];

// GET all patients
app.get('/patients', (req, res) => {
  res.send(patients);
});

// GET a patient by ID
app.get('/patients/:id', (req, res) => {
  const patient = patients.find(p => p.id === parseInt(req.params.id));
  if (!patient) {
    return res.status(404).send({ message: 'Patient not found' });
  }
  res.send(patient);
});

// POST a new patient
app.post('/patients', (req, res) => {
  const patient = {
    id: patients.length + 1,
    name: req.body.name,
    age: req.body.age,
    ward: req.body.ward,
    bloodType: req.body.bloodType,
    disease: req.body.disease
  };
  patients.push(patient);
  res.send(patient);
});

// PUT (update) an existing patient
app.put('/patients/:id', (req, res) => {
  const patient = patients.find(p => p.id === parseInt(req.params.id));
  if (!patient) {
    return res.status(404).send({ message: 'Patient not found' });
  }
  patient.name = req.body.name;
  patient.age = req.body.age;
  patient.ward = req.body.ward;
  patient.bloodType = req.body.bloodType;
  patient.disease = req.body.disease;
  res.send(patient);
});

// DELETE a patient
app.delete('/patients/:id', (req, res) => {
  const patientIndex = patients.findIndex(p => p.id === parseInt(req.params.id));
  if (patientIndex === -1) {
    return res.status(404).send({ message: 'Patient not found' });
  }
  patients.splice(patientIndex, 1);
  res.send({ message: 'Patient deleted successfully' });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
