const express = require('express');
const cors = require('cors');
const app = express();

const mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost:27017/dashboard') 
.then(function() { 
console.log('Conectat la MongoDB!'); 
}) 
.catch(function(err) { 
console.error('Eroare conectare MongoDB:', err); 
}); 
const Project = require('./models/Project');
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Prima ruta: raspunde la GET /
app.get('/', function(req, res) {
 res.json({ message: 'Serverul functioneaza!' });
});


// Date (temporar in memorie, vom folosi MongoDB mai tarziu)
// const projects = [
//  { id: 1, title: "Pagina Personala", tech: "HTML, CSS", done: true },
//  { id: 2, title: "Calculator Buget", tech: "JS", done: true },
//  { id: 3, title: "Dashboard React", tech: "React", done: false },
//  { id: 4, title: "API Meteo", tech: "React, API", done: false },
// ];
// GET /api/projects - returneaza toate proiectele
app.get('/api/projects', async function(req, res) {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: 'Eroare ' + err });
    }
});


// app.get('/api/projects/:id', function(req, res) {
//  const id = parseInt(req.params.id);
//  const project = projects.find(p => p.id === id);
//  if (!project) {
//      return res.status(404).json({ error: 'Not found' });
//  }
//  res.json(project);
// });

// app.get('/api/stats', function(req, res) {
//  const stats = {
//      total: projects.length,
//      finalizate: projects.filter(p => p.done).length,
//      inLucru: projects.filter(p => !p.done).length
//  };
//  res.json(stats);
// });

// POST /api/projects - adauga un proiect nou
app.post('/api/projects', function(req, res) {
 const newProject = {
 id: projects.length + 1,
 title: req.body.title,
 tech: req.body.tech,
 done: req.body.done || false,
 };
 projects.push(newProject);
 res.status(201).json(newProject);
});

app.delete('/api/projects/:id', function (req, res) {
 const id = parseInt(req.params.id);
 const index = projects.findIndex(p => p.id === id);

 if (index === -1) {
     return res.status(404).json({ error: 'Not found' });
 }

 projects.splice(index, 1);
 res.json({ message: 'Deleted' });
});

// Porneste serverul
app.listen(PORT, function() {
 console.log('Server pornit pe http://localhost:' + PORT);
});
