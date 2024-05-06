import type { Visit } from "../type/model";

export function latestVisitDate(visits: Visit[]) {
  if (visits.length < 2) {
    return visits.at(0)?.date ?? null;
  }

  const latestVisit: Visit = visits.reduce((latest, curr) => {
    return latest.date > curr.date ? latest : curr;
  });

  return latestVisit.date;
}
