var ObjectId = require('mongodb').ObjectID;

module.exports = function(app, db) {
  
  app.get('/notes', (req, res) => {
  	db.collection('notes').find().toArray( (err, result) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(result);
      }
    });
  });

  app.get('/notes/:id', (req, res) => {
  	const id = req.params.id;
  	const details = { '_id': ObjectId(id) };
  	db.collection('notes').findOne(details, (err, result) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(result);
      }
    });
  });

  app.post('/notes', (req, res) => {
    const note = { text: req.body.body, title: req.body.title };
    db.collection('notes').insert(note, (err, result) => {
      if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
        res.send(result.ops[0]);
      }
    });
  });

   app.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectId(id) };
    db.collection('notes').remove(details, (err, result) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('Note ' + id + ' deleted!');
      } 
    });
  });

   app.put('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectId(id) };
    const note = { text: req.body.body, title: req.body.title };
    db.collection('notes').update(details, note, (err, result) => {
      if (err) {
          res.send({'error':'An error has occurred'});
      } else {
          res.send(note);
      } 
    });
  });

};