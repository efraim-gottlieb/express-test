import { readUsers, writeUsers } from "../utils/usersUtils.js";
import { createReceipt } from "../controllers/receiptsControllers.js";
import { readEvents, writeEvents } from "../utils/eventsUtils.js";
import { readReceipts } from "../utils/receiptsUtils.js";

async function validateUser(username, password) {
  const users = await readUsers();
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  return user || null;
}

export async function addUser(req, res) {
  if (!(req.body.username && req.body.password)) {
    res.status(400).send("body error");
    return;
  }

  const users = await readUsers();
  const userNames = users.map((uaer) => uaer.username.toLowerCase());
  const userName = req.body.username;
  if (!userNames.includes(userName.toLowerCase())) {
    const { username, password } = req.body;
    const user = {
      username,
      password,
    };
    users.push(user);
    await writeUsers(users);
    res.status(201).json({ message: "User registered successfully" });
  } else {
    res.status(400).send("user name exists already...");
  }
}

export async function buyTickets(req, res) {
  if (
    !(
      req.body.username &&
      req.body.password &&
      req.body.eventName &&
      req.body.quantity
    )
  ) {
    res.status(400).send("body error");
    return;
  }
  const { username, password, eventName, quantity } = req.body;
  if (!(await validateUser(username, password))) {
    res.json({ error: "denied" });
    return;
  }
  const events = await readEvents();
  const eventsNames = events.map((e) => e.eventName.toLowerCase());
  if (!eventsNames.includes(eventName.toLowerCase())) {
    res.status(400).send("Event not exist!");
    return;
  }
  const eventIndex = events.findIndex(
    (e) => e.eventName.toLowerCase() === eventName.toLowerCase()
  );
  if (events[eventIndex]["ticketsForSale"] < quantity) {
    res.status(400).json({ error: "not enough tickets" });
    return;
  }
  events[eventIndex]["ticketsForSale"] -= quantity;
  writeEvents(events);

  createReceipt(username, eventName, quantity);
  res.json({ message: "Tickets purchased successfully" });
}

export async function getSummaery(req, res) {
  let receipts = await readReceipts()
  receipts = receipts.filter(
    (r) => r.userName == req.params.username
  );
  const tickets = receipts.reduce((accumulator, r) => {
  return accumulator + r.ticketsBought;})
  const averageTicketsPerEvent = tickets / receipts.length
  res.json({
    totalTicketsBought: receipts.length,
    events: receipts.map((e) => e.eventName),
    averageTicketsPerEvent,
  });
}
