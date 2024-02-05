const express = require('express');
const path = require('path');
const { clog } = require('./middleware/clog.js');
const routing = require('./routes/routing.js');

const PORT = 3001;
const app = express();

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(clog);
app.use('/api', routing);

//Get Routing for homepage
app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

//GET Routing for notes page
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.listen(PORT, () =>
    console.log(`App listening at https://localhost:${PORT}`)
);
