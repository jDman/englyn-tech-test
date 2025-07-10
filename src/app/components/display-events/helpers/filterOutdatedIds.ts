import { InplayDisplayEvent } from "../../../interfaces/DisplayEvent";
import { InplayId } from "../../../interfaces/InplayId";

export const filterOutdatedIds = (inplayIds: Array<InplayId>, originalArray: Array<InplayDisplayEvent>): Array<InplayDisplayEvent> => {
    const filteredArray = [...originalArray.filter((currentEvent) => {
      return inplayIds.findIndex(({id}) => currentEvent.id === id) !== -1;
    })];

    return filteredArray;
  }
