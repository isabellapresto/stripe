require("dotenv").config();
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(express.json());

const CLIENT_URL = "http://127.0.0.1:5173";
// "http://localhost:5173";

//Middlewares
app.use(
  cors({
    origin: "*",
  })
);

app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: req.body.map((item) => {
        return {
          price: item.product,
          quantity: item.quantity,
        };
      }),
      mode: "payment",
      success_url: `${CLIENT_URL}/confirmation`,
      cancel_url: CLIENT_URL,
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.log(error.message);
    res.status(400).json("Det gick inte bra...");
  }
});

// Funktion för att göra en GET-begäran till servern och hämta alla produkter
function getAllProducts() {
  fetch("http://localhost:3000/products")
    .then((response) => response.json())
    .then((data) => {
      // Hantera data som returneras från servern
      console.log(data);
      renderProducts(data);
    })
    .catch((error) => {
      // Hantera eventuella fel som kan uppstå
      console.error("Error:", error);
    });
}

// Funktion för att skapa tabellrader baserat på produkterna
function createProductRow(product) {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${product.id}</td>
    <td>${product.Titel}</td>
    <td>${product.Författare}</td>
    <td>${product.Pris}</td>
  `;
  return row;
}

// Funktion för att skriva ut produkterna på sidan
function renderProducts(products) {
  const tableBody = document.getElementById("productTableBody");
  tableBody.innerHTML = "";

  products.forEach((product) => {
    const row = createProductRow(product);
    tableBody.appendChild(row);
  });
}

// Kör funktionen för att hämta och visa produkterna när sidan laddas
getAllProducts();

app.listen(3000, () => console.log("Server is up and running.."));
