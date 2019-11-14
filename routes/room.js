const express = require("express");
const router = express.Router();

const Room = require("./../models/Room");

router.post("/api/room/publish", async (req, res) => {
  try {
    // const room = new Room({
    //   title: req.body.title,
    //   description: req.body.description,
    //   photos: req.body.photos,
    //   price: req.body.price,
    //   ratingValue: req.body.ratingValue,
    //   reviews: req.body.reviews,
    //   city: req.body.city,
    //   loc: req.body.loc
    // });

    const room = new Room(req.body);
    await room.save();
    res.send(room);
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});

const createFilters = req => {
  const filters = {};

  if (req.query.city) {
    filters.city = req.query.city;
  }

  if (req.query.priceMin) {
    if (filters.price === undefined) {
      filters.price = {};
    }
    filters.price.$gte = req.query.priceMin;
  }
  if (req.query.priceMax) {
    if (filters.price === undefined) {
      filters.price = {};
    }
    filters.price.$lte = req.query.priceMax;
  }

  return filters;
};

// /api/rooms?city=Paris

// Filtrer par city
// const filters = {};
// if (req.query.city) {
// filters.city = new RexExp(req.query.city,"i"};   // creer un filter avec regexp, case non sensitive
// }

router.get("/api/rooms", async (req, res) => {
  try {
    const filters = createFilters(req);
    // { city: 'Paris' }
    console.log(filters);
    // const search = Room.find(filters).populate("Room");
    // const search = Room.find(filters);
    const search = Room.find(filters).populate();

    if (req.query.sort === "price-asc") {
      search.sort({ price: 1 });
    } else if (req.query.sort === "price-desc") {
      search.sort({ price: -1 });
    }

    const rooms = await search;
    res.json(rooms);
  } catch (error) {
    res.status(400).send({
      message: error.message
    });
  }
});

module.exports = router;
