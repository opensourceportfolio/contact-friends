import { Button } from "@rneui/themed";

type DeleteButtonProps = {
  onPress: () => void;
};

export function DeleteButton({ onPress }: DeleteButtonProps) {
  return (
    <Button
      containerStyle={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#f4f4f4",
      }}
      type="clear"
      icon={{ name: "delete-outline" }}
      onPress={onPress}
    />
  );
}
