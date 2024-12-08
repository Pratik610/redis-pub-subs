import { WebSocketServer, WebSocket } from "ws";
import { createClient, RedisClientType } from "redis";
const redisSubscriber = createClient();
redisSubscriber.connect();

const wss = new WebSocket.Server({ port: 8080 });
const clientSubscriptions = new Map();

wss.on("connection", (ws: any) => {
  console.log("Connected");
  ws.on("message", async (message: string) => {
    const data = JSON.parse(message);

    if (data.type === "subscribe") {
      const channel = `crypto.${data.coin.toLowerCase()}`;
      if (!clientSubscriptions.has(channel)) {
        clientSubscriptions.set(channel, new Set());
        await redisSubscriber.subscribe(channel, (redisMessage) => {
          clientSubscriptions.get(channel)?.forEach((client: any) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(redisMessage);
            }
          });
        });
      }
      clientSubscriptions.get(channel).add(ws);
      console.log(`Client subscribed to channel: ${channel}`);
    }

    if (data.type === "unsubscribe") {
      const channel = `crypto.${data.coin.toLowerCase()}`;
      if (clientSubscriptions.has(channel)) {
        await redisSubscriber.unsubscribe(channel);

        clientSubscriptions.get(channel).delete(ws);

        console.log(`Client Unsubscribed from channel: ${channel}`);
      }
    }
  });

  ws.on("close", () => {
    clientSubscriptions.forEach((clients, channel) => {
      clients.delete(ws);
      if (clients.size === 0) {
        clientSubscriptions.delete(channel);
        redisSubscriber.unsubscribe(channel);
      }
    });
    console.log("Client disconnected");
  });
});
