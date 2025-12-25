import jsonHandler from "./jsonHandeling.js";
const eventsFile = "data/events.json";

export async function readEvents() {
  const events = jsonHandler.read(eventsFile);
  return events;
}

export async function writeEvents(events) {
  await jsonHandler.write(eventsFile, events);
}
