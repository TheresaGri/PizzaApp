const mongoose = require("mongoose");
const express = require("express");
const app = express();
app.use(express.json());
mongoose.connect(
  "mongodb+srv://theresagri:XcsNUtaP9GJdX3i@cluster0.jycu5sj.mongodb.net/pizzas"
);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

let Pizza = require("./model/Pizza.js");
let Allergen = require("./model/Allergen.js");
let Order = require("./model/Order.js");

async function insertPizzas() {
  await Pizza.create({
    id: 1,
    name: "Margherita",
    ingredients: ["tomato sauce", "cheese", "oregano"],
    price: 9,
    allergens: ["A", "G"],
  });
  await Pizza.create({
    id: 2,
    name: "Salami",
    ingredients: ["tomato sauce", "cheese", "oregano", "salami"],
    price: 10,
    allergens: ["A", "G"],
  });
  await Pizza.create({
    id: 3,
    name: "Marinara",
    ingredients: ["tomato sauce", "oregano", "garlic"],
    price: 8,
    allergens: ["A"],
  });
  await Pizza.create({
    id: 4,
    name: "Funghi",
    ingredients: ["tomato sauce", "cheese", "oregano", "mushrooms"],
    price: 9,
    allergens: ["A", "G"],
  });
  await Pizza.create({
    id: 5,
    name: "Frutti di Mare",
    ingredients: [
      "tomato sauce",
      "cheese",
      "oregano",
      "shrimp",
      "mussel",
      "tuna",
      "calamari",
      "garlic",
    ],
    price: 16,
    allergens: ["A", "B", "D", "G", "R"],
  });
  await Pizza.create({
    id: 6,
    name: "Diavolo",
    ingredients: [
      "tomato sauce",
      "cheese",
      "oregano",
      "salami",
      "ham",
      "capers",
      "anchovies",
      "hot pepperoni",
    ],
    price: 11,
    allergens: ["A", "D", "G", "O"],
  });
  await Pizza.create({
    id: 7,
    name: "Cardinale",
    ingredients: ["tomato sauce", "cheese", "oregano", "ham"],
    price: 10,
    allergens: ["A", "G"],
  });
  await Pizza.create({
    name: "Capri",
    allergens: ["G", "E", "N"],
    ingredients: ["ham", "shrimp", "salami"],
    price: 10,
    id: 8,
  });
}

/* insertPizzas();
 */

async function insertAllergens() {
  await Allergen.create({
    letter: "A",
    name: "Gluten",
  });
  await Allergen.create({
    letter: "B",
    name: "Crustaceans",
  });
  await Allergen.create({
    letter: "C",
    name: "Egg",
  });
  await Allergen.create({
    letter: "D",
    name: "Fish",
  });
  await Allergen.create({
    letter: "E",
    name: "Peanut",
  });
  await Allergen.create({
    letter: "F",
    name: "Soy",
  });
  await Allergen.create({
    letter: "G",
    name: "Lactose",
  });
  await Allergen.create({
    letter: "H",
    name: "Nuts",
  });
  await Allergen.create({
    letter: "L",
    name: "Celery",
  });
  await Allergen.create({
    letter: "M",
    name: "Mustard",
  });
  await Allergen.create({
    letter: "N",
    name: "Sesame",
  });
  await Allergen.create({
    letter: "O",
    name: "Sulphites",
  });
  await Allergen.create({
    letter: "P",
    name: "Lupines",
  });
  await Allergen.create({
    letter: "R",
    name: "Molluscs",
  });
}

/* insertAllergens();
 */

async function insertOrders() {
  await Order.create({
    pizzas: [
      {
        id: 1,
        amount: 2,
      },
    ],
    date: {
      year: 2022,
      month: 6,
      day: 7,
      hour: 18,
      minute: 47,
    },
    customer: {
      name: "John Doe",
      email: "jd@example.com",
      address: {
        city: "Palermo",
        street: "Via Appia 6",
      },
    },
    completed: true,
  });
  await Order.create({
    pizzas: [
      {
        id: 2,
        amount: 5,
      },
    ],
    date: {
      year: 2022,
      month: 11,
      day: 11,
      hour: 17,
      minute: 10,
    },
    customer: {
      name: "Alex MCKarty",
      email: "AMC@example.com",
      address: {
        city: "Vienna",
        street: "erste gasse 8",
      },
    },
    completed: true,
  });

  await Order.create({
    pizzas: [
      {
        id: 3,
        amount: 1,
      },
    ],
    date: {
      year: 2022,
      month: 12,
      day: 12,
      hour: 12,
      minute: 12,
    },
    customer: {
      name: "Alan Donald",
      email: "AD@example.com",
      address: {
        city: "bern",
        street: "zweite gasse 9",
      },
    },
    completed: true,
  });
  await Order.create({
    pizzas: [
      {
        id: 2,
        amount: 10,
      },
    ],
    date: {
      year: 2023,
      month: 1,
      day: 11,
      hour: 17,
      minute: 10,
    },
    customer: {
      name: "postman test",
      email: "Postrequest@postman.com",
      address: {
        city: "Vienna",
        street: "zweite gasse 8",
      },
    },
    completed: false,
  });

  await Order.create({
    completed: false,
    pizzas: [
      {
        id: 3,
        amount: 1,
      },
      {
        id: 4,
        amount: 1,
      },
      {
        id: 5,
        amount: 1,
      },
      {
        id: 2,
        amount: 1,
      },
    ],
    date: {
      year: 2023,
      month: 2,
      day: 25,
      hours: 10,
      minutes: 36,
    },
    customer: {
      name: "Person",
      email: "person@gmx.at",
      address: {
        city: "Vienna",
        street: "Person street 22",
      },
    },
  });
}

/* insertOrders(); */

app.get("/api/pizzas", async (req, res) => {
  let query = {};
  if (req.query["max-price"] !== undefined) {
    query = { ...query, price: { $lte: req.query["max-price"] } };
  }
  if (req.query["avoid-allergen"] !== undefined) {
    query = { ...query, allergens: { $nin: [req.query["avoid-allergen"]] } };
  }
  if (req.query["name"] !== undefined) {
    query = { ...query, name: { $regex: req.query["name"], $options: "i" } };
  }
  if (req.query["avoid-allergen-by-name"] !== undefined) {
    let allergen = req.query["avoid-allergen-by-name"];
    let chosenAllergen = await Allergen.findOne({
      name: { $regex: allergen, $options: "i" },
    });
    let letter = chosenAllergen.letter;

    if (letter !== null) {
      query = { ...query, allergens: { $nin: [letter] } };
    }
  }

  let pizzas = await Pizza.find(query);

  if (req.query["sort-asc"] !== undefined) {
    if (req.query["sort-asc"] === "name") {
      pizzas = await Pizza.find(query).sort({ name: 1 });
    } else if (req.query["sort-asc"] === "price") {
      pizzas = await Pizza.find(query).sort({ price: 1 });
    }
  }
  if (req.query["sort-desc"] !== undefined) {
    if (req.query["sort-desc"] === "name") {
      pizzas = await Pizza.find(query).sort({ name: -1 });
    } else if (req.query["sort-desc"] === "price") {
      pizzas = await Pizza.find(query).sort({ price: -1 });
    }
  }

  res.json(pizzas);
});

app.post("/api/orders", async (req, res) => {
  try {
    const completed = req.body.completed;
    const pizzas = req.body.pizzas;
    const dateOfMoment = req.body.date;
    const customer = req.body.customer;
    let newOrder = new Order({
      completed,
      pizzas,
      dateOfMoment,
      customer,
    });
    console.log(newOrder);
    const order = await newOrder.save();
    res.json(order);
  } catch (error) {
    console.error(error);
  }
});

app.get("/api/orders", async (req, res) => {
  let orders = await Order.find();
  res.json(orders);
});

app.get("/api/allergens", async (req, res) => {
  let allergens = await Allergen.find();
  res.json(allergens);
});

app.listen(4000);

/* async function findMoviesWithIMDbandGenre(imdbRating, genreOfMovies) {
  const movies = await Movie.find({
    $and: [
      { "imdb.rating": { $gte: imdbRating } },
      { genres: { $in: genreOfMovies } },
    ],
  });
  const newMovies = await Movie.find({"imdb.rating": {$gte:imdbRating},{genres: {$in: genreOfMovies}}});
} */
