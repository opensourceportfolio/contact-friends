import dayjs from "dayjs";
import { FriendWithVisit } from "../type/model";

export const FrequencyLabels = {
  "30": "Monthly",
  "60": "2 Months",
  "90": "3 Months",
  "180": "6 Months",
} as const;

export const lastSeen = (friend: FriendWithVisit) =>
  friend.latest_date == null
    ? Infinity
    : dayjs().diff(friend.latest_date, "day");
