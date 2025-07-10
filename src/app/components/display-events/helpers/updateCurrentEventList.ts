import { InplayDisplayEvent } from "../../../interfaces/DisplayEvent";
import { InplayId } from "../../../interfaces/InplayId";
import { filterOutdatedIds } from "./filterOutdatedIds";

export const updateCurrentEventList = (
    [completeInplay, ids]: [InplayDisplayEvent, Array<InplayId>], originalArray: Array<InplayDisplayEvent>) => {
    let filteredCurrentEvents = filterOutdatedIds(ids, originalArray);
    const newEventInCurrentEventsListIndex = filteredCurrentEvents
      .findIndex((currentEvent) => currentEvent.id === completeInplay.id);
    const existsInIds = ids.findIndex(({id}) => completeInplay.id === id) !== -1;

    if (newEventInCurrentEventsListIndex === -1 && existsInIds) {
      filteredCurrentEvents = [...filteredCurrentEvents, completeInplay];
    } else if (newEventInCurrentEventsListIndex > -1 && existsInIds) {
      filteredCurrentEvents[newEventInCurrentEventsListIndex] = completeInplay;
    }

    return filteredCurrentEvents;
}
