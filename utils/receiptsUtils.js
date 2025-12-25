import jsonHandler from "./jsonHandeling.js";
const receiptsFile = "data/receipts.json";

export async function readReceipts() {
  const receipts = jsonHandler.read(receiptsFile);
  return receipts;
}

export async function writeReceipts(receipts) {
  await jsonHandler.write(receiptsFile, receipts);
}
