const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.listen(3000, function() {
  console.log('Listening on port 3000!');
});



let task = ['win hackathon', 'get learnt in node'];

app.post('/addtask', function (req, res) {
  let newTask = req.body.newtask;
  if (newTask != '') {
    task.push(newTask);
  }

  res.redirect('/');
});

let complete = ['become a beast', 'finish hack'];

app.post('/removetask', function (req, res) {
  let completeTask = req.body.check;

  if(typeof completeTask === 'string') {
    complete.push(completeTask);

    task.splice(task.indexOf(completeTask), 1);
  }
  else if (typeof completeTask === 'object') {
    for (let i = 0; i < completeTask.length; i++) {
      complete.push(completeTask[i]);
      task.splice(task.indexOf(completeTask[i]), 1);
    }
  }
  res.redirect('/');
});

app.get('/', function (req, res) {
  res.render('index', { task: task});
});
