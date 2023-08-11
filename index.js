const cors = require("cors");
const express = require("express");
require("dotenv").config();
const connect = require("./connect/connect");
const app = express();
const Movie = require("./model/Movie");

const PORT = process.env.PORT || 8000;

connect();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/movies", async (req, res) => {
  try {
    const category = req.query.category;

    let filter = {};
    if (category) {
      filter.category = category;
    }

    const movies = await Movie.find(filter);
    res.json(movies);

    if (!movies) {
      throw new Error("Error fetching");
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/movies/:slug", async (req, res) => {
  try {
    const slugParams = req.params.slug;
    const data = await Movie.findOne({ slug: slugParams });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/movies", async (req, res) => {
  try {
    const movieId = req.body.movieId;
    const { title, slug, description, year, thumbnail, link, stars, category } =
      req.body;

    console.log(req.body);

    const updateMovie = {
      title,
      slug,
      description,
      stars,
      year,
      thumbnail,
      link,
      category,
    };

    await Movie.findByIdAndUpdate(movieId, updateMovie);
    res.json(updateMovie);
    console.log(updateMovie);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/movies", async (req, res) => {
  try {
    const { title, slug, description, year, thumbnail, link, stars, category } =
      req.body;

    const Moviedoc = await Movie.create({
      title,
      slug,
      description,
      stars,
      year,
      thumbnail,
      link,
      category,
    });

    res.json(Moviedoc);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error!" });
  }
});

app.delete("/movies/:id", async (req, res) => {
  try {
    const movieId = req.params.id;
    await Movie.deleteOne({ _id: movieId });
    res.json("Delete successfully");
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT);
});
