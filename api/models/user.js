import { getSession } from "../src/neo4j.js";


export const getUserByName = async (name, sessionContext) => {
  const session = getSession(sessionContext);
  const checkupQuery = await session.executeWrite((tx) => {
    return tx.run("Match (u:User {name: $name}) RETURN u as user", {
      name: name,
    });
  });
  if (!checkupQuery.records.length) {
    return null
  }  return checkupQuery.records[0].get('user').properties
}

export const mergeUser = async (name, password, sessionContext) => {
  const session = getSession(sessionContext);

  const query = await session.executeWrite((tx) => {
    return tx.run(
      "MERGE (u:User {name: $name}) ON CREATE SET u.password = $password RETURN u as user",
      {
        name: name,
        password: password,
      }
    );
  });

  return query.records[0].get('user').properties
}