const express = require('express');
const cors = require('cors');
// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// tamimahmed12bd
// eXWhg4LNUfzpgfZw


app.get('/', (req, res) => {
    res.send('BRANDSHOP SERVER IS RUNNING')
})

app.listen(port, () => {
    console.log(`BRANDSHOP is running on PORT: ${port}`)
})