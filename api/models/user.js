import { getSession } from "../src/neo4j.js";

export const getUserByName = async (name, sessionContext) => {
  const session = getSession(sessionContext);
  const checkupQuery = await session.executeWrite((tx) => {
    return tx.run("Match (u:User {name: $name}) RETURN u as user", {
      name: name,
    });
  });
  if (!checkupQuery.records.length) {
    return null;
  }
  return checkupQuery.records[0].get("user").properties;
};

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

  return query.records[0].get("user").properties;
};

const getOppositeDirection = (direction) => {
  switch (direction) {
    case "UP":
      return "DOWN";
    case "RIGHT":
      return "LEFT";
    case "DOWN":
      return "UP";
    case "LEFT":
      return "RIGHT";
  }
};

export const verifyPartner = async (
  userName,
  partnerName,
  direction,
  hash,
  sessionContext
) => {
  const session = getSession(sessionContext);

  await session.executeWrite((tx) => {
    return tx.run(
      `MATCH (:User {name: $userName})-[v:VERIFIES{direction: $direction}]->()
      DELETE v`,
      {
        userName,
        direction,
      }
    );
  });

  await session.executeWrite((tx) => {
    return tx.run(
      `MATCH (:User {name: $userName})-[v:SUPPORTS{direction: $direction}]->()
      DELETE v`,
      {
        userName,
        direction,
      }
    );
  });

  await session.executeWrite((tx) => {
    return tx.run(
      `MATCH (:User {name: $userName})<-[v:SUPPORTS{direction: $oppositeDirection}]-()
      DELETE v`,
      {
        userName,
        oppositeDirection: getOppositeDirection(direction),
      }
    );
  });

  const partnerRecord = await session.executeRead((tx) => {
    return tx.run(
      `MATCH (u:User {name: $partnerName})
      RETURN u
      `,
      {
        partnerName,
      }
    );
  });

  if (partnerRecord.records.length) {
    await session.executeWrite((tx) => {
      return tx.run(
        `MATCH (u:User {name: $userName}), (p:User {name: $partnerName})
      MERGE (u)-[v:VERIFIES{direction: $direction, hash: $hash}]->(p)
      RETURN v
      `,
        {
          userName,
          partnerName,
          direction,
          hash,
        }
      );
    });
  
    const verifiedMe = await session.executeRead((tx) => {
      return tx.run(
        `MATCH (u:User {name: $userName})<-[:VERIFIES{direction: $oppositeDirection, hash: $hash}]-(:User {name: $partnerName})
        RETURN u
        `,
        {
          userName,
          partnerName,
          oppositeDirection: getOppositeDirection(direction),
          hash,
        }
      );
    });
  
    if (verifiedMe.records.length) {
      const supportRelations = await session.executeWrite((tx) => {
        return tx.run(
          `
          MATCH (u:User {name: $userName}), (p:User {name: $partnerName})
          CREATE (u)-[r:SUPPORTS{direction: $direction}]->(p),
          (u)<-[t:SUPPORTS{direction: $oppositeDirection}]-(p)
          RETURN r,t
          `,
          {
            userName,
            partnerName,
            direction,
            oppositeDirection: getOppositeDirection(direction),
          }
        );
      });
    }
  
  } else {
    await session.executeWrite((tx) => {
      return tx.run(
        `MATCH (u:User {name: $userName})
      MERGE (u)-[v:VERIFIES{direction: $direction, hash: $hash}]->(:User {name: $partnerName})
      RETURN v
      `,
        {
          userName,
          partnerName,
          direction,
          hash,
        }
      );
    });
  }
  return;
};
