import neo4j from "neo4j-driver";
import { getSession } from "../src/neo4j.js";
import { DateTime } from "luxon";

export const createClaim = async (name, title, text, level, sessionContext) => {
  const session = getSession(sessionContext);
  const dateNow = DateTime.utc();
  const createdClaim = await session.executeWrite((tx) => {
    return tx.run(
      `Match (u:User {name: $name})
    CREATE (u)-[:WRITES]->(c:Claim {title: $title, text: $text, level: ${level}, createdAt: $createdAt})
    RETURN c as claim`,
      {
        name,
        title,
        text,
        createdAt: dateNow.toString(),
      }
    );
  });
  const properties = createdClaim.records[0].get("claim").properties;
  return properties
};

export const deleteUserFocus = async (userName, sessionContext) => {
  const session = getSession(sessionContext);
  await session.executeWrite((tx) => {
    return tx.run(
      `MATCH (u:User {name: $name})-[f:FOCUSES]->(k:Dive)
      DELETE f`,
      { name: userName }
    );
  });
};

export const startNewDive = async (userName, sessionContext) => {
  const session = getSession(sessionContext);
  await deleteUserFocus(userName, sessionContext);

  const dateNow = DateTime.utc();
  const dateDayAgo = dateNow.minus({ days: 1 });
  const newDive = await session.executeWrite((tx) => {
    return tx.run(
      `
      MATCH (u:User {name: $name})
      CREATE (u)-[:INITIATES]->(d: Dive {level: 1, createdAt: $createdAt, reached: $reached})
      CREATE (u)-[:FOCUSES]->(d)
      RETURN d as dive
      `,
      {
        name: userName,
        createdAt: dateNow.toString(),
        reached: dateDayAgo.toString(),
      }
    );
  });
  const properties = newDive.records[0].get("dive").properties;
  return {
    ...properties,
  };
};

export const matchClaim = async (userName, createdAt, sessionContext) => {
  const session = getSession(sessionContext);
  // const dateTime = DateTime.fromISO(createdAt)

  const newClaim = await session.executeWrite((tx) => {
    return tx.run(
      `MATCH (u:User {name: $name})-[:WRITES]->(c:Claim {createdAt: $createdAt})
      RETURN c as claim`,
      {
        name: userName,
        createdAt,
      }
    );
  });
  const properties = newDive.records[0].get("claim");
  console.log(properties);
  return properties;
};
//"createdAt": "2024-04-05T08:56:57.808Z"
