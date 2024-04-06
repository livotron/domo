import neo4j from "neo4j-driver";
import { getSession } from "../src/neo4j.js";
import { DateTime } from "luxon";

const getReadDelta = (level) => {
  const deltas = [
    null,
    { hours: 20 },
    { hours: 10 },
    { hours: 5 },
    { hours: 2 },
    { hours: 1 },
    { minutes: 30 },
    { minutes: 15 },
    { minutes: 5 },
  ];
  return deltas[level];
};

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
  return properties;
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

export const getUserFocus = async (userName, sessionContext) => {
  const session = getSession(sessionContext);
  const dive = await session.executeRead((tx) => {
    return tx.run(
      `MATCH (u:User {name: $name})-[f:FOCUSES]->(k:Dive)
      Return k as dive`,
      { name: userName }
    );
  });
  return dive.records[0].get("dive").properties;
};

export const startNewDive = async (userName, sessionContext) => {
  const session = getSession(sessionContext);
  const previousDive = await getUserFocus(userName, sessionContext);

  await deleteUserFocus(userName, sessionContext);

  const dateNow = DateTime.utc();
  const dateCurrent = dateNow.minus(getReadDelta(1));
  const datePrevious = DateTime.fromISO(previousDive.createdAt).setZone('utc');
  console.log(dateCurrent, datePrevious);
  const finalDate = dateCurrent > datePrevious ? dateCurrent : datePrevious;
  const newDive = await session.executeWrite((tx) => {
    return tx.run(
      `
      MATCH (u:User {name: $name})
      CREATE (u)-[:INITIATES]->(d:Dive {level: 1, createdAt: $createdAt, stopAt: $stopAt, acknowledgmentLogs: []})
      CREATE (u)-[:FOCUSES]->(d)
      RETURN d as dive
      `,
      {
        name: userName,
        createdAt: dateNow.toString(),
        stopAt: finalDate.toString(),
      }
    );
  });
  const properties = newDive.records[0].get("dive").properties;
  return properties;
};

export const getClaims = async (userName, sessionContext) => {
  const session = getSession(sessionContext);

  const claims = await session.executeRead((tx) => {
    return tx.run(
      `
      MATCH (u:User {name: $name})-[:FOCUSES]->(d:Dive)
      WITH d.createdAt as from, d.stopAt as to, d.level as level
      MATCH (c:Claim)
      WHERE c.level = level AND c.createdAt < from AND c.createdAt > to
      return c as claims
      ORDER BY c.createdAt ASC
      `,
      {
        name: userName,
      }
    );
  });
  console.log(claims.records);
  const properties = claims.records.map((rec) => rec.get("claims").properties);
  return properties;
};

export const acknowlegeClaim = async (
  userName,
  creationTime,
  creatorName,
  sessionContext
) => {
  const session = getSession(sessionContext);

  const claims = await session.executeWrite((tx) => {
    return tx.run(
      `
      MATCH (u:User {name: $name})-[:FOCUSES]->(d:Dive)
      SET d.stopAt = $creationTime
      SET d.acknowledgmentLogs = d.acknowledgmentLogs + $logs
      `,
      {
        name: userName,
        creationTime,
        logs: JSON.stringify({ name: creatorName, time: creationTime }),
      }
    );
  });
  return null;
};

export const matchClaim = async (userName, createdAt, sessionContext) => {
  const session = getSession(sessionContext);
  const newClaim = await session.executeRead((tx) => {
    return tx.run(
      `MATCH (u:User {name: $name})-[:WRITES]->(c:Claim {createdAt: $createdAt})
      RETURN c as claim`,
      {
        name: userName,
        createdAt,
      }
    );
  });
  if (!newClaim.records.length) return null;
  const properties = newClaim.records[0].get("claim").properties;
  return properties;
};

