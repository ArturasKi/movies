const express = require("express"); // užkrauna biblioteką;
const app = express(); // pasakom, jog biblioteka vadinasi app;
const port = 3003; // pasako kuriam port'e veiks;
const cors = require("cors");
app.use(express.json({limit: '10mb'}));
app.use(cors());
const mysql = require("mysql");
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

const con = mysql.createConnection({
  // daromas connection prie DB
  host: "localhost",
  user: "root",
  password: "",
  database: "movie_rent",
});

app.listen(port, () => {
    console.log(`Raccoon is listening to port Nr ${port}`);
  });


//CREATE CATEGORY
app.post("/admin/categories", (req, res) => {
  // post - routeris, postinam info i serveri;
  const sql = `
  INSERT INTO categories
  (title)
  VALUES (?)
`;
  con.query(
    sql,
    [req.body.title],
    (err, result) => {
      if (err) throw err;
      res.send({ result, msg: { text: "New category was created!", type: "success" } });
    }
  );
});

  //READ CATEGORIES
app.get("/admin/categories", (req, res) => {
  // get - routeris, paimam info is serverio;
  const sql = `
  SELECT
  *
  FROM categories
  `;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

//DELETE CATEGORY
app.delete("/admin/categories/:id", (req, res) => {
  const sql = `
  DELETE FROM categories
  WHERE id = ?
  `;
  con.query(sql, [req.params.id], (err, result) => {
      if (err) throw err;
      res.send({ result, msg: { text: 'OK, Cat gone', type: 'success' } });
  });
});

//EDIT CATEGORY
app.put("/admin/categories/:id", (req, res) => {
  // delete - routeris, istrinama info is serverio;
  const sql = `
  UPDATE categories
  SET title = ?
  WHERE id = ?
`;
  con.query(
    sql,
    [req.body.title, req.params.id],
    (err, result) => {
      if (err) throw err;
      res.send({ result, msg: { text: "Category was edited", type: "info" } });
    }
  );
});

//CREATE MOVIE
app.post("/admin/movies", (req, res) => {
  // post - routeris, postinam info i serveri;
  const sql = `
  INSERT INTO movies
  (title, price, rating, category_id, photo)
  VALUES (?, ?, ?, ?, ?)
`;
  con.query(
    sql,
    [
      req.body.title ? req.body.title : 0, 
      req.body.price ? req.body.price : 0, 
      req.body.rating ? req.body.rating : 0, 
      req.body.category ? req.body.category : null,
      req.body.photo
    ],
    (err, result) => {
      if (err) throw err;
      res.send({ result, msg: { text: "New movie was created!", type: "success" } });
    }
  );
});

  //READ MOVIE
app.get("/admin/movies", (req, res) => {
  // get - routeris, paimam info is serverio;
  const sql = `
  SELECT m.id, price, m.title, rating, c.title AS cat, photo
  FROM movies AS m
  LEFT JOIN categories AS c
  ON c.id = m.category_id
  ORDER by title
  `;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

//DELETE MOVIE
app.delete("/admin/movies/:id", (req, res) => {
  const sql = `
  DELETE FROM movies
  WHERE id = ?
  `;
  con.query(sql, [req.params.id], (err, result) => {
      if (err) throw err;
      res.send({ result, msg: { text: 'OK, movie gone', type: 'success' } });
  });
});

//EDIT MOVIE
app.put("/admin/movies/:id", (req, res) => {
  const sql = `
  UPDATE movies
  SET title = ?, price = ?, rating = ?, category_id = ?, photo = ?
  WHERE id = ?
`;
  con.query(
    sql,
    [req.body.title, req.body.price, req.body.rating, req.body.category, req.body.photo, req.params.id],
    (err, result) => {
      if (err) throw err;
      res.send({ result, msg: { text: "Movie was edited", type: "info" } });
    }
  );
});

//DELETE PHOTO
app.delete("/admin/photos/:id", (req, res) => {
  const sql = `
  UPDATE movies
  SET photo = null
  WHERE id = ?
  `;
  con.query(sql, [req.params.id], (err, result) => {
      if (err) throw err;
      res.send({ result, msg: { text: 'Photo was removed', type: 'success' } });
  });
});

//FRONT CATEGORIES
app.get("/categories", (req, res) => {
  // get - routeris, paimam info is serverio;
  const sql = `
    SELECT
    c.title, c.id, COUNT(m.id) AS movies_count, GROUP_CONCAT(m.title) AS movies_titles
    FROM movies AS m
    RIGHT JOIN categories AS c
    ON m.category_id = c.id
  `;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

//FRONT MOVIES
app.get("/movies", (req, res) => {
  // get - routeris, paimam info is serverio;
  const sql = `
  SELECT
  m.title, c.title AS category, price, rating, photo, m.id, m.rates, m.rates_sum
  FROM movies AS m
  LEFT JOIN categories AS c
  ON m.category_id = c.id
  `;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

//FRONT EDIT RATE
app.put("/rates/:movieId", (req, res) => {
  const sql = `
  UPDATE movies
  SET rates = rates + 1, rates_sum = rates_sum + ?
  WHERE id = ?
`;
  con.query(sql, [req.body.rate, req.params.movieId], (err, result) => {
      if (err) throw err;
      res.send({ result, msg: { text: 'Tu prabalsavai', type: 'danger' } });
  });
});