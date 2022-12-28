const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.jlfv4.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const mediaCollection = client.db('mediaPortal').collection('media')

        app.get('/medias', async (req, res) => {
            const query = {};
            const media = await mediaCollection.find(query).toArray();
            res.send(media);
        })
        app.post('/medias', async (req, res) => {
            const media = req.body;
            const result = await mediaCollection.insertOne(media);
            res.send(result);
        })
    }
    finally {

    }
}
run().catch(console.log);

app.get('/', (req, res) => {
    res.send('job task get running')
})

app.listen(port, () => {
    console.log(`job tusk listening running ${port}`);
})