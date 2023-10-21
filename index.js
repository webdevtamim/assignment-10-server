const express = require('express');
const cors = require('cors');
require('dotenv').config();
// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4zmtojm.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const productCollection = client.db("productsDB").collection("products");
    const cartCollection = client.db("productsDB").collection("myCart");


    // product related api 
    app.get('/products', async (req, res) => {
        const cursor = productCollection.find()
        const result = await cursor.toArray();
        res.send(result);
    })

    app.post('/products', async (req, res) => {
        const newProducts = req.body;
        const result = await productCollection.insertOne(newProducts);
        res.send(result);
    })


    // my cart related api 
    app.get('/cart', async (req, res) => {
        const cursor = cartCollection.find()
        const cartData = await cursor.toArray();
        res.send(cartData);
    })

    app.post('/cart', async (req, res) => {
        const newCart = req.body;
        const result = await cartCollection.insertOne(newCart);
        res.send(result);
    })



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('BRANDSHOP SERVER IS RUNNING')
})

app.listen(port, () => {
    console.log(`BRANDSHOP is running on PORT: ${port}`)
})