import { ListItem } from "@rneui/themed";
import { useContactFriendsStore } from "../../store";
import type { Visit } from "../../type/model";
import { SwipeableRow } from "../SwipeableRow";
import { router } from "expo-router";

type VisitRowProps = {
  visit: Visit;
};

export function VisitRow({ visit }: VisitRowProps) {
  const removeVisit = useContactFriendsStore((s) => s.removeVisit);

  const handleRemoveVisit = () => {
    removeVisit(visit.friend, visit.id);
  };

  const handleUpdateVisit = () => {
    router.navigate(`/screen/main/friend/${visit.friend}/visits/${visit.id}`);
  };

  return (
    <SwipeableRow onRemove={handleRemoveVisit} onUpdate={handleUpdateVisit}>
      <ListItem.Content>
        <ListItem.Title>{visit.date}</ListItem.Title>
      </ListItem.Content>
    </SwipeableRow>
  );
}
