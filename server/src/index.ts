import cors from "cors";
import express from "express";
import type { Express, Request, Response } from "express";
import * as http from "http";
import * as https from "https";
import "dotenv/config";
import { sprintf } from "sprintf-js";
("sprintf-js");

const app: Express = express();
const port: number = 8081;
app.use(cors());

const switchbotApiUrl: string =
  "https://api.switch-bot.com/v1.0/devices/%s/commands";

app.get("/", (req: Request, res: Response): void => {
  res.send("server is working!");
});

app.get("/api/ceiling-light/on", (req: Request, res: Response) => {
  const urlObj: URL = new URL(
    sprintf(switchbotApiUrl, process.env.SB_CEILING_LIGHT_DEVICE_ID),
  );
  const body: string = JSON.stringify({
    command: "turnOn",
    parameter: "default",
    commandType: "command",
  });
  const options: https.RequestOptions = {
    hostname: urlObj.hostname,
    path: urlObj.pathname,
    port: 443,
    method: "POST",
    headers: {
      Authorization: "Bearer " + process.env.SB_TOKEN,
      "Content-Type": "application/json",
    },
  };
  const r: http.ClientRequest = https.request(
    options,
    (res: http.IncomingMessage) => {
      console.log(`Status Code: ${res.statusCode}`);
      res.on("data", (data: Buffer) => {
        console.log(data.toString());
      });
    },
  );

  r.on("error", (error) => {
    console.error(error);
  });

  r.write(body);
  r.end();
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
