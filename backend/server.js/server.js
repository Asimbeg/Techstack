const express = require('express');
const cors = require('cors');
const multer = require('multer');
const bodyParser = require('body-parser');
const db = require('./db');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)      
});

const upload = multer({
   storage,
   fileFilter: (req, file, cb) => {
     if(file.mimetype.startsWith('image/')) cb(null, true);
     else cb(new Error('Only image files allowed'), false);     
   }
})

app.post('/signup', upload.single('profileImage'), (req, res) => {
    const { firstName, lastName, email, password, mobile, dob } = req.body;
    const profileImage = req.file?.filename || '';
    const age = new Date().getFullYear() - new Date(dob).getFullYear();

    if(age < 18) return res.status(400).send('Age must be >= 18');

    const query = 'INSERT INTO users (firstName, lastName, email, password, mobile, dob, profileImage) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [firstName, lastName, email, password, mobile, dob, profileImage], (err, result) => {
      if (err) {
        console.error('MYSQL insert error:', err);
        return res.status(500).send('Database error');
      }
      res.send({ message: 'Signup success', userId: result.insertId });
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});











