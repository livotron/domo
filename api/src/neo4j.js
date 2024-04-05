import neo4j from "neo4j-driver";

let driver;

export function getDriver() {
  return driver;
}

export async function initDriver(uri, username, password) {
  driver = neo4j.driver(uri, neo4j.auth.basic(username, password), {
    disableLosslessIntegers: true,
  });

  const res = await driver.getServerInfo();
  console.log("Neo4jDriver:", res);
  return driver;
}

export const getSession = (context) => {
  if (context.neo4jSession) {
    return context.neo4jSession;
  } else {
    context.neo4jSession = driver.session();
    return context.neo4jSession;
  }
};

export function neo4jSessionCleanup(req, res, next) {
  res.on("finish", function () {
    if (req.neo4jSession) {
      req.neo4jSession.close();
      delete req.neo4jSession;
    }
  });
  next();
}
