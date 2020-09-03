import { https, logger } from "firebase-functions";
import { initializeApp } from "firebase-admin";
initializeApp();

import * as path from "path";
import * as os from "os";
import { exec } from "child_process";

const _exec = (command: string) => {
  return new Promise((resolve, reject) => {
    exec(command, {}, (e, stdout, strerr) => {
      logger.log(stdout);
      logger.error(strerr);

      if (e) {
        reject(e);
      } else {
        resolve();
      }
    });
  });
};

export const createImage = https.onRequest(async (request, response) => {
  const { text } = request.query;
  const fontPath = path.resolve(__dirname, `../unifont_jp-13.0.03.ttf`);
  const templatePath = path.resolve(__dirname, `../ticket_base.jpg`);
  const outFile = path.join(os.tmpdir(), `ticket_${Date.now()}.jpg`);

  const command = [
    "convert",
    "-interlace JPEG",
    "-quality 85",
    "-font",
    fontPath,
    "-pointsize 35",
    "-fill black",
    `-annotate +1350+630 ${text}`,
    `-annotate +1750+645 ${text}`,
    templatePath,
    outFile,
  ].join(" ");

  await _exec(command);

  response.set("Access-Control-Allow-Origin", "*");
  response.download(outFile);
});
