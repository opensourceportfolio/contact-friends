import { Link, Stack, router } from "expo-router";
import { Button } from "@rneui/themed";

export default function TabsLayout() {
  return (
    <Stack
      screenOptions={{
        navigationBarHidden: false,
        title: "Contact Friends",
        headerRight: () => <Link href={"/screen/profile"}>+</Link>,
        headerLeft: () => <Button />,
      }}
    >
      <Stack.Screen name="/screen/main/list30" options={{}} />
    </Stack>
  );
}
