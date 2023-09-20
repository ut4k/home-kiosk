import type { Express, Request, Response, NextFunction } from "express";
import * as http from "http";
import * as https from "https";
import { sprintf } from "sprintf-js";
("sprintf-js");

export function swRequestHandler(
  swDeviceID: string | undefined,
  command: string,
): void {
  const switchbotApiUrl: string =
    "https://api.switch-bot.com/v1.0/devices/%s/commands";
  const urlObj: URL = new URL(sprintf(switchbotApiUrl, swDeviceID));
  const body: string = JSON.stringify({
    command: command,
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
}
