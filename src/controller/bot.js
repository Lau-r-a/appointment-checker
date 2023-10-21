import {
  MatrixClient,
  SimpleFsStorageProvider,
  AutojoinRoomsMixin,
} from "matrix-bot-sdk";

export function initBot(homeserverUrl, accessToken, storageFile) {
  const storage = new SimpleFsStorageProvider(storageFile);
  const client = new MatrixClient(homeserverUrl, accessToken, storage);

  AutojoinRoomsMixin.setupOnClient(client);

  client.start().then(() => console.log("Client started!"));

  client.on("room.message", (roomId, event) => {
    if (!event["content"]) return;
    const sender = event["sender"];
    const body = event["content"]["body"];
    console.log(`${roomId}: ${sender} says '${body}`);

    if (body.startsWith("!echo")) {
      const replyText = body.substring("!echo".length).trim();
      client.sendMessage(roomId, {
        msgtype: "m.notice",
        body: replyText,
      });
    }
  });

  return client;
}

export function sendMessage(client, roomId, message) {
  client.sendMessage(roomId, {
    msgtype: "m.notice",
    body: message,
  });
}
