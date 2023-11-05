import cors from "cors";
import express from "express";
import type { Express, Request, Response } from "express";
import "dotenv/config";
import { swRequestHandler } from "./requestHandler";
import "wake_on_lan";

const app: Express = express();
const port: number = 8081;
app.use(cors());

app.get("/", (req: Request, res: Response): void => {
  const r: string = JSON.stringify({ success: true });
  res.send(r);
});

app.get("/api/ceiling-light/toggle", (req: Request, res: Response) => {
  swRequestHandler(process.env.SB_CEILING_LIGHT_DEVICE_ID, "toggle").then(
    (data) => res.send(data),
    (err) => res.send(err),
  );
});

app.get("/api/ac-heating/on", (req: Request, res: Response) => {
  swRequestHandler(process.env.SB_AC_HEATING_DEVICE_ID, "turnOn").then(
    (data) => res.send(data),
    (err) => res.send(err),
  );
});

app.get("/api/ac-heating/off", (req: Request, res: Response) => {
  swRequestHandler(process.env.SB_AC_HEATING_DEVICE_ID, "turnOff").then(
    (data) => res.send(data),
    (err) => res.send(err),
  );
});

app.get("/api/tv/power", (req: Request, res: Response) => {
  swRequestHandler(process.env.SB_TV_DEVICE_ID, "turnOn").then(
    (data) => res.send(data),
    (err) => res.send(err),
  );
});

app.get("/api/pc/on", (req: Request, res: Response) => {
  let wol: any = require("wake_on_lan");
  wol.wake(process.env.MY_COMPUTER_MAC_ADDRESS, (err: string) => {
    if (err) {
      console.log("something gone wrong!", err);
    } else {
      console.log("magic packet has been sent!");
    }
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
