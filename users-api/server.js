const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.get('/api/users/filter', (req, res) => {
  const minAge = Number(req.query.minAge);
  const maxAge = Number(req.query.maxAge);
  if (isNaN(minAge) || isNaN(maxAge)) {
    return res.status(400).send('Invalid age');
  }
  if (minAge < 0 || maxAge < 0) {
    return res.status(400).send('Age cannot be negative');
  }
  if (minAge > maxAge) {
    return res.status(400).send('Minimum age cannot exceed maximum age');
  }
  if (
    user.age === null ||
    user.age === undefined ||
    !Number.isFinite(user.age)
  ) {
    return res.status(400).send('User age is missing or invalid');
  }

  const filteredUsers = users.filter(
    user => user.age >= minAge && user.age <= maxAge,
  );

  res.json(filteredUsers);
});

const users = JSON.parse(fs.readFileSync('users.json', 'utf8'));

app.get('/api/users', (req, res) => {
  res.json(users);
});

app.get('/api/users/:id', (req, res) => {
  const id = Number(req.params.id);

  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).send('User not found');
  }

  res.json(user);
});

app.get('/user/:id', (req, res) => {
  const id = Number(req.params.id);

  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).send('User not found');
  }

  res.send(`
        <html>
        <head>
            <title>User Details</title>
        </head>
        <body>
            <h1>${user.name}</h1>
            <p>ID: ${user.id}</p>
            <p>Email: ${user.email}</p>
            <p>Age: ${user.age}</p>
        </body>
        </html>
    `);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
