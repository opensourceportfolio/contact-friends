import dayjs from "dayjs";
import { FriendWithVisit } from "../../type/model";
import { lastSeen } from "../../model/frequency";

type LastSeenMessageProps = { friend: FriendWithVisit };

export const LastSeenMessage = ({ friend }: LastSeenMessageProps) => {
  if (friend.latest_date) {
    return `${lastSeen(friend)} days ago`;
  } else {
    return "have not seen";
  }
};
