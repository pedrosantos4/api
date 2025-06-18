import { MongoClient, ServerApiVersion } from 'mongodb';
import express from 'express';
import dotenv from 'dotenv';
import { codeGenerator, validateRequiredFieldsValues, validateRequiredFields } from './utils/functions.js';

dotenv.config();

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const app = express();
app.use(express.json());

let isConnected = false;
const requiredFields = ['db', 'collection', 'query'];


app.post('/urlshortener', async (req, res) => {

  const missingFields = validateRequiredFields(req.body, requiredFields);
  if (missingFields.missing) {
    return res.status(400).send({
      status: 'error',
      message: `Missing fields: '${missingFields.fields.join(', ')}'`
    });
  }

  const missingFieldsValue = validateRequiredFieldsValues(req.body, requiredFields);
  if (missingFieldsValue.missing) {
    return res.status(400).send({
      status: 'error',
      message: `Missing value in fields: '${missingFieldsValue.fields.join(', ')}'`
    });
  }

  if (!isConnected) {
    try {
      await client.connect();
      isConnected = true;
      console.log("MongoDB connected");
    } catch (error) {
      res.status(500).send({ status: 'error', message: error.message });
    }
  }

  const db = client.db(req.body.db);
  const collection = db.collection(req.body.collection);
  const query = req.body.query;
  try {
    const result = await collection.findOne(query);

    //console.log(db, collection, query)
    console.log(result)
    if (result && result.urlShortened) {
      res.send({
        status: 'ok',
        data: {
          "urlShortened": result.urlShortened
        }
      });
    } else {
      res.status(404).send({
        status: 'error',
        message: 'Not Found'
      });
    }

  } catch (error) {
    console.error(error);
    res.status(500).send({ status: 'error', message: error.message });
  }
});

app.listen(5002, () => console.log("running..."));
