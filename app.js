import express, { json } from "express";
const app = express();
const PORT = 3000;

import {
  getQuotes,
  getQuoteByID,
  addQuote,
  editQuote,
  deleteQuote,
} from "./quote.js";

app.use(express.json());

app.get("/", function (req, res) {
  res.send("Welcome to the inspirational quotes API");
});

app.get("/quotes", async function (req, res) {
  // get the quotes
  const quote = await getQuotes()
  res.json(quote)
  // return the quotes to user
});

app.get("/quotes/:id", async function (req, res){
  // grab the id from the request
  const id = req.params.id;
  //find quote by id
  const quote = await getQuoteByID(id)
  // responde with quote attached to id
  res.json(quote)

})

app.post("/quotes", async function (req, res) {

  const { author, quoteText } = req.body;
  const newQuote = await addQuote(author, quoteText)
  res.status(201).json(newQuote)

})

// Write a request handler to return the correct response 

app.patch("/quotes/:id", async function (req, res){
  // grab the id that needs the update
  const id = req.params.id
  // grab the area to update from the request
  const { author, quoteText } = req.body;
  // make changes to the body
  const quote = await getQuoteByID(id);

  res.json({
    messaage: "Quote updated",
    quote: quote,
  })
})

app.listen(PORT, function () {
  console.log(`Server is now listening on http://localhost:${PORT}`);
});





// import fs from "node:fs/promises";
// import { v4 as uuidv4 } from "uuid";
// import { FILENAME } from "./config.js";

// async function readQuotes() {
//   try {
//     const data = await fs.readFile(FILENAME, "utf8");
//     return JSON.parse(data);
//   } catch (error) {
//     console.error("Error reading file:", error);
//     return null;
//   }
// }

// async function writeQuotes(data) {
//   try {
//     await fs.writeFile(FILENAME, JSON.stringify(data), "utf8");
//     return true;
//   } catch (error) {
//     console.error("Error writing file:", error);
//     return false;
//   }
// }

// export async function getQuotes() {
//   const quotes = await readQuotes();
//   return quotes;
// }

// export async function addQuote(quoteText) {
//   const id = uuidv4();
//   const quote = { id, quoteText };
//   const quotes = await readQuotes();
//   quotes.push(quote);
//   await writeQuotes(quotes);
//   return quote;
// }

// export async function getRandomQuote() {
//   const quotes = await readQuotes();
//   return quotes[Math.floor(Math.random() * quotes.length)];
// }

// export async function editQuote(id, quoteText) {
//   const quotes = await readQuotes();
//   const quote = quotes.find((quote) => quote.id === id);
//   if (!quote) {
//     return null;
//   }
//   quote.quoteText = quoteText;
//   await writeQuotes(quotes);
//   return quote;
// }

// export async function deleteQuote(id) {
//   const quotes = await readQuotes();
//   const index = quotes.findIndex((quote) => quote.id === id);
//   if (index === -1) {
//     return null;
//   }
//   const deleted = quotes.splice(index, 1);
//   await writeQuotes(quotes);
//   return deleted[0];
// }