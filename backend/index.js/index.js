const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const SECRET_KEY = 'your-secret-key'; 


const user = {
  email: 'test@example.com',
  password: '123456'
};


app.post('/login', (req, res) => {
  const { login, password } = req.body;

  if (login === user.login && password === user.password) {
    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });

    return res.json({
      message: 'Login successful',
      token: token
    });
  } else {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
});


app.get('/profile', (req, res) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, SECRET_KEY, (err, userData) => {
      if (err) {
        return res.status(403).json({ message: 'Token not valid' });
      }

      res.json({ message: 'Access granted', user: userData });
    });
  } else {
    res.status(401).json({ message: 'Token missing' });
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
