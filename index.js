const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const app = express()

require('dotenv').config();
const port = process.env.PORT || 5000


// middle ware
app.use(cors())
app.use(express.json())



app.get('/', (req, res) => {
    res.send('this is for portfolio');
})

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.k6pap.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


console.log(uri, 'successfull')



async function run() {

    await client.connect();
    console.log('connected portfolio server')

    const worksCollection = client.db('portfolio').collection('works')
    try {

        app.get('/works', async (req, res) => {
            const query = {};
            const cursor = await worksCollection.find(query).toArray()

            res.send(cursor);
        })


        app.get('/works/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const works = await worksCollection.findOne(query);
            res.send(works)
        })

    }

    finally {

    }
}

run().catch(console.dir)
