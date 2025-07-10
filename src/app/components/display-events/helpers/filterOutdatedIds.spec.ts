import { mockExistingInplayEvent } from "../../../test-utils/mockExistingInplayEvent";
import { mockNonExistingInplayEvent } from "../../../test-utils/mockNonExistingInplayEvent";
import { filterOutdatedIds } from "./filterOutdatedIds";

describe('filterOutdatedIds', () => {
  const originalArray = [mockExistingInplayEvent, mockNonExistingInplayEvent];
  const inplayIds = [{ id: 10 }];

  it('should filter out any events no longer in the inplay list of ids', () => {
     expect(filterOutdatedIds(inplayIds, originalArray)).toEqual([mockExistingInplayEvent]);
  });

  it('should filter out any events no longer in the inplay list of ids', () => {
     expect(filterOutdatedIds(inplayIds, originalArray)).toEqual([mockExistingInplayEvent]);
  });
});
