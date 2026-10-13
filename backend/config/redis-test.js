import "dotenv/config";
import { createClient } from "redis";

const client = createClient({
  url: process.env.REDIS_URL,
});

client.on("error", (err) => {
  console.error("Redis error:", err.message);
});

try {
  await client.connect();

  console.log("Connected:", client.isReady);
  console.log("PING:", await client.ping());

  await client.set("shopnest:cloud-test", "connected");
  console.log(
    "Read back:",
    await client.get("shopnest:cloud-test")
  );

  await client.del("shopnest:cloud-test");
} catch (error) {
  console.error("Cloud test failed:", error.message);
} finally {
  if (client.isOpen) await client.quit();
}