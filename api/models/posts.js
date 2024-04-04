import neo4j from "neo4j-driver";
import { getSession } from "../src/neo4j.js";

export const createPost = async (name, title, text, level, sessionContext) => {
  const session = getSession(sessionContext);
  const createdPost = await session.executeWrite((tx) => {
    return tx.run(
      `Match (u:User {name: $name})
    CREATE (u)-[:WRITES]->(p:Post {title: $title, text: $text, level: ${level}, createdAt: timestamp()})
    RETURN u as user, p as post`,
      {
        name,
        title,
        text,
      }
    );
  });
  console.log(createdPost);
  return {
    user: createdPost.records[0].get("user").properties,
    post: {
      ...createdPost.records[0].get("post").properties,
      createdAt: createdPost.records[0]
        .get("post")
        .properties.createdAt.toNumber(),
      level: createdPost.records[0].get("post").properties.level.toNumber(),
    },
  };
};
