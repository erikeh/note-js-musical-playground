const express = require('express')
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;

app.use(express.json());
// app.use(express.static(process.env.PUBLIC_URL))
app.use(express.static(path.join(__dirname, '../../build')))


app.listen(port, () => {
  console.log(`listening on port ${port}`)
})