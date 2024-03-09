import { Link, Slot, Stack } from "expo-router";

export default function ProfileLayout() {
  return (
    <Slot
      screenOptions={{
        navigationBarHidden: true,
      }}
    />
  );
}
