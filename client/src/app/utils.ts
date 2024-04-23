import { Dive } from "features/claims/types";
import { DateTime, Duration } from "luxon";

const deltas = [
  { delta: { hours: 26 }, level: 1 },
  { delta: { hours: 14 }, level: 2 },
  { delta: { hours: 6 }, level: 3 },
  { delta: { hours: 3 }, level: 4 },
  { delta: { hours: 2 }, level: 5 },
  { delta: { hours: 1 }, level: 6 },
  { delta: { minutes: 30 }, level: 7 },
  { delta: { minutes: 10 }, level: 8 },
  { delta: { minutes: 5 }, level: 9 },
];

export const getCurrentLevel = (dive: Dive) => {
  const timeDelta = DateTime.now().diff(DateTime.fromISO(dive.createdAt));
  let returnedLevel = dive.level;
  const fittingDelta = deltas.find(
    (del) => Duration.fromObject(del.delta) < timeDelta
  );
  if (fittingDelta && fittingDelta.level -1 < returnedLevel)
    returnedLevel = fittingDelta.level - 1;
  return returnedLevel;
};
