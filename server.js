const express = require("express");

const app = express();
app.use(express.json());

var projects = [];
var log = 0;

app.use((req, res, next) => {

    log += 1;

    console.log(log);

    return next();
})

function isId (req, res, next ) {

    const { id } = req.params;

    const project = projects.find(p => p.id === id)

    if (!project) {
        return res.status(404).json({ Error: 'Invalid id'});
    }
    
    return next();
}

app.post('/projects', (req, res) => {

    const { id, title } = req.body;

    projects.push({
        id,
        title,
        tasks: [],
    })

    return res.status(200).json(projects);
})

app.get('/projects', (req, res) => {

    return res.status(200).json(projects);
})

app.put('/projects/:id', isId, (req, res) => {

    const { id } = req.params;
    const { title } = req.body;

    const project = projects.find(p => p.id === id)

    project.title = title;

    return res.json(project)
})

app.delete('/projects/:id', isId, (req, res) => {

    const { id } = req.params;

    const project = projects.find(p => p.id === id)
    projects = projects.filter(p => p.id !== project.id)

    res.json(projects);
})

app.post('/projects/:id/tasks', isId, (req, res) => {

    const { id } = req.params;
    const { title } = req.body;

    const project = projects.find(p => p.id === id);

    project.tasks.push(title);

    return res.json(projects);
})

app.listen(3000);