import type { Express, Request, Response, NextFunction } from "express";
import * as http from "http";
import * as https from "https";
import { sprintf } from "sprintf-js";
("sprintf-js");

const requestAsync = (
  options: string | URL | https.RequestOptions,
  body: string,
): Promise<any> => {
  return new Promise((resolve, reject): void => {
    let r: http.ClientRequest = https.request(options, (res) => {
      const chunks: any = [];
      res.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
      res.on("end", () => {
        let rs: Object = JSON.parse(Buffer.concat(chunks).toString());
        resolve(rs);
      });
      res.on("error", reject);
    });
    r.write(body);
    r.end();
  });
};

export function swRequestHandler(
  swDeviceID: string | undefined,
  command: string,
) {
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
  return requestAsync(options, body);
}
