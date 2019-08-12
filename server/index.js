const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const db = require('../database/index.js');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, '..', 'public')));

app.get('/goodies', (req, res) => {
  db.query('SELECT * FROM items ORDER BY created_at DESC LIMIT 12', (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      console.log('successful GET request');
      res.status(200).send(results.rows);
    }
  });
})

// app.get('/goodies/next/:itemid', (req, res) => {
//   let itemId = req.params.itemid;
//   db.query(`SELECT * FROM items WHERE id < ${itemId} ORDER BY created_at DESC LIMIT 6`, (err, results) => {
//     if (err) {
//       console.log(err);
//       res.status(500).send(err);
//     } else {
//       console.log('successful GET request');
//       res.status(200).send(results.rows);
//     }
//   });
// })

app.get('/goodies/profile/:userid', (req, res) => {
  let user = req.params.userid;
  db.query(`SELECT * FROM items WHERE posted_by = ${user} ORDER BY created_at DESC LIMIT 6`, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      console.log('successful GET request by user');
      res.status(200).send(results.rows[0]);
    }
  });
})

app.post('/goodies', (req, res) => {
  db.query(`INSERT INTO items (main_img, item_type, color, size, claimed, confirmed, brand, info, extra_imgs, posted_by) 
    VALUES ('${req.body.main_img}', '${req.body.item_type}', '${req.body.color}', '${req.body.size}', 
    ${req.body.claimed}, ${req.body.confirmed}, '${req.body.brand}', '${req.body.info}', ARRAY['${req.body.extra_imgs}'], 
    ${req.body.posted_by})`, (err) => {
    if (err) {
      console.log('POST ERROR: ', err);
      res.status(500).send(err);
    } else {
      res.status(200).send('successful POST request');
    }
  });
})

app.patch('/goodies/claim/:itemid', (req, res) => {
  let item = req.params.itemid;
  db.query(`UPDATE items SET claimed = ${req.body.claimed} WHERE id = ${item}`, (err) => {
    if (err) {
      console.log('PATCH ERROR: ', err);
      res.status(500).send(err);
    } else {
      res.status(200).send('successful PATCH request');
    }
  });
})

app.patch('/goodies/confirm/:itemid', (req, res) => {
  let item = req.params.itemid;
  db.query(`UPDATE items SET confirmed = ${req.body.confirmed} WHERE id = ${item}`, (err) => {
    if (err) {
      console.log('PATCH ERROR: ', err);
      res.status(500).send(err);
    } else {
      res.status(200).send('successful PATCH request');
    }
  });
})

app.listen(port, console.log(`${port} is listening!`));

module.exports = app;