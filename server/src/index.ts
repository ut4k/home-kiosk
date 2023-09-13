import express from "express";
import type { Express, Request, Response } from "express";

const app: Express = express();
const port: number = 3001;

app.get("/", (req: Request, res: Response) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
