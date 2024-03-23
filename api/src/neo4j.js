import neo4j from "neo4j-driver";

let driver;

export function getDriver() {
  return driver;
}

export async function initDriver(uri, username, password) {
  driver = neo4j.driver(uri, neo4j.auth.basic(username, password));

  const res = await driver.getServerInfo();
  console.log("RES", res)
  return driver;
}
