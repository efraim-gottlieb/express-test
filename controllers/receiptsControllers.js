import {readReceipts, writeReceipts} from "../utils/receiptsUtils.js"

export async function createReceipt(userName, eventName, ticketsBought) {
  const receipts = await readReceipts()
  const receipt = {
    userName,
    eventName,
    ticketsBought
  }
  receipts.push(receipt)
  writeReceipts(receipts)
}