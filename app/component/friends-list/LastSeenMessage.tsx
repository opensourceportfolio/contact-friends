import type { FriendWithVisit } from "../../type/model";
import { lastSeen } from "../../model/frequency";

type LastSeenMessageProps = { friend: FriendWithVisit };

export const LastSeenMessage = ({ friend }: LastSeenMessageProps) => {
  if (friend.latest_date) {
    return `${lastSeen(friend)} days ago`;
  }

  return "have not seen";
};
