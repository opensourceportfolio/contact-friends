import { Button } from "@rneui/themed";

type UpdateButtonProps = {
  onPress: () => void;
};

export function UpdateButton({ onPress }: UpdateButtonProps) {
  return (
    <Button
      containerStyle={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#f4f4f4",
      }}
      type="outline"
      icon={{ type: "antdesign", name: "edit" }}
      onPress={onPress}
    />
  );
}
