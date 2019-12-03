const express = require('express');
const routers = require('./routes');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routers(app);

app.listen(port, () => console.log(`app run on port ${port}`));
