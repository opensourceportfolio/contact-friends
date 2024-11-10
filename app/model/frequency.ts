import dayjs from "dayjs";
import type { Frequency, FriendWithVisit } from "../type/model";

export const FrequencyLabels = {
  "30": "Monthly",
  "60": "2 Months",
  "90": "3 Months",
  "180": "6 Months",
} as const;

export const frequencyOptions = Object.keys(FrequencyLabels) as Frequency[];

export const frequencyValues = Object.values(FrequencyLabels);

export const lastSeen = (friend: FriendWithVisit) =>
  friend.latest_date == null
    ? Number.POSITIVE_INFINITY
    : dayjs().diff(friend.latest_date, "day");

export const maxDate = (date1: string | null, date2: string | null) => {
  return (date1 ?? "") > (date2 ?? "") ? date1 : date2;
};
