import { createClient, RedisClientType } from "redis";
import axios from "axios";
const redisPublisher = createClient();
redisPublisher.connect();

setInterval(async () => {
  const { data } = await axios.get(
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd"
  );

  for (const crypto in data) {
    // console.log(`${crypto}: $${data[crypto].usd}`);
    redisPublisher.publish(`crypto.${crypto}`, String(data[crypto].usd));
  }
}, 5000);
