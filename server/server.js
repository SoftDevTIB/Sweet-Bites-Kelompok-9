const express = require('express');
const cors = require('cors');


const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// prefix semua route auth dengan /api/auth
app.use('/api/auth', require('./routes/auth'));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
