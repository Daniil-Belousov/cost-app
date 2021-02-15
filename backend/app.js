const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const mongoose = require("mongoose");
const app = express();

const apiRoutes = require('./src/modules/routes/routes');

app.use(cors());

const url = "mongodb+srv://dbUser:dbUserPass@firstcluster.as11g.mongodb.net/<dbUserDB>?retryWrites=true&w=majority";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());
app.use('/', apiRoutes);


app.listen(8000, () => {
  console.log("The server is running!!!");
});
