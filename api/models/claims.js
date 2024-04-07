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
    null,
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
      `MATCH (u:User {name: $name})-[f:FOCUSES]->(d:Dive)
      Return d as dive`,
      { name: userName }
    );
  });
  if (!dive.records.length) {
    return null;
  }
  return dive.records[0].get("dive").properties;
};

export const getLastDiveInRange = async (
  name,
  rangeStop,
  level,
  sessionContext
) => {
  const session = getSession(sessionContext);
  const lastDive = await session.executeRead((tx) => {
    return tx.run(
      `MATCH (u:User {name: $name})-[:INITIATES]->(d:Dive)
      WHERE d.createdAt > $rangeStop AND d.level > $level
      RETURN d as dive
      ORDER BY d.createdAt DESC
      SKIP 1
      LIMIT 1
      `,
      {
        name,
        rangeStop: rangeStop.toString(),
        level: neo4j.int(level),
      }
    );
  });
  if (!lastDive.records.length) return null;
  return lastDive.records[0].get("dive").properties;
};

export const incrementDive = async (userName, sessionContext) => {
  const session = getSession(sessionContext);
  const focusedDive = await getUserFocus(userName, sessionContext);
  const focusedDateRangeStop = DateTime.fromISO(focusedDive.createdAt)
    .setZone("utc")
    .minus(getReadDelta(focusedDive.level + 1));
  console.log(focusedDive, focusedDateRangeStop);
  const previousDives = await getLastDiveInRange(
    userName,
    focusedDateRangeStop,
    focusedDive.level,
    sessionContext
  );
  const incrementedDive = await session.executeWrite((tx) => {
    return tx.run(
      `
        MATCH (u:User {name: $name})-[:FOCUSES]->(d:Dive)
        SET d.level = d.level + 1
        SET d.stopAt = $stopTime
        RETURN d as dive
        `,
      {
        name: userName,
        stopTime: previousDives
          ? previousDives.createdAt
          : focusedDateRangeStop.toString(),
      }
    );
  });

  return incrementedDive.records[0].get("dive").properties;
};

export const startNewDive = async (userName, sessionContext) => {
  const session = getSession(sessionContext);
  const previousDive = await getUserFocus(userName, sessionContext);
  let finalDate;
  const dateNow = DateTime.utc();
  const dateCurrent = dateNow.minus(getReadDelta(1));

  if (previousDive) {
    await deleteUserFocus(userName, sessionContext);

    const datePrevious = DateTime.fromISO(previousDive.createdAt).setZone(
      "utc"
    );
    console.log(dateCurrent, datePrevious);
    finalDate = dateCurrent > datePrevious ? dateCurrent : datePrevious;
  } else {
    finalDate = dateCurrent;
  }

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

  const dive = await session.executeWrite((tx) => {
    return tx.run(
      `
      MATCH (u:User {name: $name})-[:FOCUSES]->(d:Dive)
      SET d.stopAt = $creationTime
      SET d.acknowledgmentLogs = d.acknowledgmentLogs + $logs
      RETURN d as dive
      `,
      {
        name: userName,
        creationTime,
        logs: JSON.stringify({
          createdBy: creatorName,
          createdAt: creationTime,
          readAt: DateTime.utc().toString(),
        }),
      }
    );
  });
  return dive.records[0].get("dive").properties;
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
