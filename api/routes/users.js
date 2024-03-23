import express from 'express';
import { getSession } from '../src/neo4j.js';

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', async function(req, res, next) {
  try {
  const session = getSession()
  // console.log(session)
  const query = await session.executeWrite(tx => {
    return tx.run(
      'CREATE (u:User {name: $name}) RETURN u.name as name',
      {name: req.body.name}
    )
  })
  res.send({name: query.records[0].get('name')});
  } catch (e) {
    res.status(500).send({
      message: "Error creating user",
      error: e
    })
  }
});

export default router;
