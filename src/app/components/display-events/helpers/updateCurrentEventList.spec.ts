import { InplayDisplayEvent } from "../../../interfaces/DisplayEvent";
import { mockExistingInplayEvent } from "../../../test-utils/mockExistingInplayEvent";
import { mockNonExistingInplayEvent } from "../../../test-utils/mockNonExistingInplayEvent";
import { updateCurrentEventList } from "./updateCurrentEventList";

describe('updateCurrentEventList', () => {
  const originalInplayEventArray = [mockExistingInplayEvent, mockNonExistingInplayEvent];
  
  it('should, update original inplay event array', () => {
    const inplayIds = [{ id: 10 }];
    expect(updateCurrentEventList([mockExistingInplayEvent, inplayIds], originalInplayEventArray))
      .toEqual([mockExistingInplayEvent]);
  });

  it('should add new event if not already in the list, but in the inplay ids', () => {
    const inplayIds = [{ id: 10 }, { id: 11 }];
    const newEvent = {
      id: 11,
      homeTeam: "Brighton",
      awayTeam: "Everton",
      homeScore: 1,
      awayScore: 2,
      marketId: 114,
      home: "15.45",
      draw: "6.20",
      away: "10.50"
    };

    expect(updateCurrentEventList([newEvent, inplayIds], originalInplayEventArray))
      .toEqual([mockExistingInplayEvent, newEvent]);
  })

  it('should update an existing event if it already exists with updated data', () => {
    const inplayIds = [{ id: 10 }, { id: 1 }];
    const updatedEvent: InplayDisplayEvent = {
      ...mockExistingInplayEvent,
      homeScore: 3
    }

    expect(updateCurrentEventList([updatedEvent, inplayIds], originalInplayEventArray))
      .toEqual([updatedEvent, mockNonExistingInplayEvent]);
  })
});
