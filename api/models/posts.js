import neo4j from "neo4j-driver";
import { getSession } from "../src/neo4j.js";

export const createPost = async (name, title, text, level, sessionContext) => {
  const session = getSession(sessionContext);
  const createdPost = await session.executeWrite((tx) => {
    return tx.run(
      `Match (u:User {name: $name})
    CREATE (u)-[:WRITES]->(p:Post {title: $title, text: $text, level: ${level}, createdAt: datetime()})
    RETURN p as post`,
      {
        name,
        title,
        text,
      }
    );
  });
  const properties = createdPost.records[0].get("post").properties;
  console.log(properties, properties.toString());
  return {
    ...properties,
    createdAt: properties.createdAt.toStandardDate()
  };
};
