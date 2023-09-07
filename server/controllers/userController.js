// backend/src/controllers/authController.js

const fs = require('fs');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

// Läser användare från JSON-filen
function getUsers() {
  const usersData = fs.readFileSync('data/users.json', 'utf-8');
  return JSON.parse(usersData);
}

// Skriver användare till JSON-filen
function saveUsers(users) {
  fs.writeFileSync('data/users.json', JSON.stringify(users, null, 2), 'utf-8');
}

// Kontroller för användarregistrering
async function registerUser(req, res) {
  // Validera inmatningsdata (använd express-validator här om du har det)
  // ...

  const { username, password } = req.body;

  // Kryptera lösenordet
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Skapa en ny användare
  const newUser = {
    username,
    password: hashedPassword,
  };

  // Lägg till den nya användaren i användarlistan och spara i JSON-filen
  const existingUsers = getUsers();
  existingUsers.push(newUser);
  saveUsers(existingUsers);

  res.status(201).json({ message: 'Användare registrerad.' });
}

module.exports = {
  registerUser,
};
