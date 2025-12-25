import { readEvents, writeEvents } from "../utils/eventsUtils.js";
import { validateUser } from "../utils/usersUtils.js";

export async function createEvent(req, res) {
  if (
    !(
      req.body.eventName &&
      req.body.ticketsForSale &&
      req.body.username &&
      req.body.password
    )
  ) {
    res.status(400).send("body error !");
  } else {
    const events = await readEvents();
    const { eventName, ticketsForSale, username, password } = req.body;
    const validation = await validateUser(username, password);
    if (!validation) {
      res.status(401).json({ error: "denied" });
    } else {
      const eventsNames = events.map((e) => e.eventName.toLowerCase());
      if (eventsNames.includes(eventName.toLowerCase())) {
        res.status(400).send('Event already exist!')
        return
      }
      const event = {
        eventName,
        ticketsForSale,
        createdBy: username,
      };
      events.push(event);
      writeEvents(events);
      res.json({ message: "Event created successfully" });
    }
  }
}
