const MongoClient = require('mongodb').MongoClient;
const express = require('express')
const app = express()
const port = 3000

var dbuser = process.env.DATABASE_USER;
var url    = process.env.DATABASE_URL;
var pass   = process.env.DATABASE_PASS;
var dbname = process.env.DATABASE_NAME;

async function listDatabases(client){
  var str = "Databases:"
  databasesList = await client.db().admin().listDatabases();
  databasesList.databases.forEach(db => str+=`${db.name} `);

  return str;
};

async function main(res) {
  const uri = `mongodb://${dbuser}:${pass}@${url}/${dbname}?retryWrites=true&w=majority`;
  //const uri = `mongodb://${dbuser}:${pass}@${url}/`;
  const client = new MongoClient(uri, { useNewUrlParser: true });
  try {
    await client.connect();
    var result = await listDatabases(client);
    res.send(result);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

app.get('/', (req, res) => {
  //res.send('Hello World!');
  main(res).catch(console.error);
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))


