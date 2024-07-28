import { ListItem } from "@rneui/themed";
import type { ReactNode } from "react";
import { DeleteButton } from "./DeleteButton";
import { UpdateButton } from "./UpdateButton";

type SwipeableRowProps = {
  children: ReactNode;
  onRemove?: () => void;
  onUpdate?: () => void;
  onPress?: () => void;
};

export function SwipeableRow({
  children,
  onRemove,
  onUpdate,
  onPress,
}: SwipeableRowProps) {
  return (
    <ListItem.Swipeable
      bottomDivider
      leftWidth={80}
      leftContent={() =>
        onUpdate ? <UpdateButton onPress={onUpdate} /> : undefined
      }
      rightWidth={80}
      rightContent={() =>
        onRemove ? <DeleteButton onPress={onRemove} /> : undefined
      }
      onPress={onPress}
    >
      {children}
    </ListItem.Swipeable>
  );
}
