import { ListItem } from "@rneui/themed";
import { useContactFriendsStore } from "../../store";
import { Visit } from "../../type/model";
import { DeleteButton } from "../DeleteButton";

type VisitRowProps = {
  visit: Visit;
};

export function VisitRow({ visit }: VisitRowProps) {
  const removeVisit = useContactFriendsStore((s) => s.removeVisit);

  const handleRemoveVisit = () => {
    removeVisit(visit.id);
  };

  return (
    <ListItem.Swipeable
      bottomDivider
      leftWidth={80}
      rightWidth={90}
      rightContent={() => <DeleteButton onPress={handleRemoveVisit} />}
    >
      <ListItem.Content>
        <ListItem.Title>{visit.date}</ListItem.Title>
      </ListItem.Content>
    </ListItem.Swipeable>
  );
}
