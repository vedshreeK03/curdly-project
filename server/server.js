const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const curdRoutes = require('./routes/curdRoutes');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/curd', curdRoutes);
app.use('/api/users', userRoutes);


app.get('/', (req, res) => res.send('Curdly API running!'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
