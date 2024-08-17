import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        title: "Sign In",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          // Hide the header for all other routes.
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="confirm"
        options={{
          // Set the presentation mode to modal for our modal route.
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
