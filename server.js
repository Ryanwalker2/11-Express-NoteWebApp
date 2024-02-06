const express = require('express');
const path = require('path');
const { clog } = require('./middleware/clog.js');
const routing = require('./routes/routing.js');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(clog);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', routing);

app.use(express.static('public'));

//GET Routing for notes page
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

//Get Routing for homepage
app.get('*', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
    console.log(`App listening at https://localhost:${PORT}`)
);
