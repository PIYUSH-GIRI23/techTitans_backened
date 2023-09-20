const express = require('express');
const app = express();
const port = 80;
const cors = require('cors');
app.use(express.json());
app.use(cors());

const connectToDatabase = require('./db.js');
connectToDatabase() 
  .then(({patients,doctors,book,query}) => {
    // Define your API routes that use the collection here.
    app.use('/api/patients', require('./routes/patients.js')(patients));
    app.use('/api/doctors', require('./routes/doctors.js')(doctors));
    app.use('/api/book_contact', require('./routes/book_contact.js')(book,query));

})
.catch(error => {
    console.error('Error:', error);
});

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});