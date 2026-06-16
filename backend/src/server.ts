import express from 'express';

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    return res.sendStatus(204);
  }
  next();
});

const PORT = 3333;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});