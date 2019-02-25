var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db){
  app.get('/notes/:id', (request, response) => {
    const id = request.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('notes').findOne(details, (err, item) => {
      if(err) {
        response.send({ 'error': 'There was an error!' });
      } else {
        response.send(item);
      }
    });
  });

  app.get('/notes', (request, response) => {
    var notes = db.collection('notes').find().toArray((error, result)=>{
      if(error){
        response.send({'error': 'There was an error!'})
      } else {
        let res = [];
        result.map(item => {
          console.log(item);
          res.push(item.title);
        })
        response.send(res);
      }
    }); 
  });

  app.delete('/notes/:id', (request, response) => {
    const id = request.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('notes').remove(details, (err, item) => {
      if(err) {
        response.send({ 'error': 'There was an error!' });
      } else {
        response.send('Note ' + id + ' deleted!');
      }
    });
  });

  app.put('/notes/:id', (request, response) => {
    const id = request.params.id;
    const details = { '_id': new ObjectID(id) };
    const note = { text: request.body.body, title: request.body.title }
    db.collection('notes').update(details, note, (err, item) => {
      if(err) {
        response.send({ 'error': 'There was an error!' });
      } else {
        response.send(item);
      }
    });
  });

  app.post('/notes', (request, response) => {
    console.log(request.body.body, request.body.title);
    const note = { text: request.body.body, title: request.body.title }
    db.collection('notes').insert(note, (err, result) => {
      if(err) {
        response.send({ 'error': 'There was an error!' });
      } else {
        response.send(result.ops[0]);
      }
    });
  });
};