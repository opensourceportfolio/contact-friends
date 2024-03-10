import FontAwesome from "@expo/vector-icons/FontAwesome";
import { SearchBar } from "@rneui/themed";
import { Stack, Tabs } from "expo-router";
import { Text } from "react-native";
import { useAuth } from "../../../../hook/useAuth";

export default function TabsLayout() {
  const { authenticated } = useAuth();

  if (!authenticated) {
    return null;
  }

  return (
    <>
      <SearchBar placeholder="Type Here..." />
      <Tabs>
        <Tabs.Screen
          name="late"
          options={{
            headerShown: false,
            tabBarLabel: "Late",
            title: "Late",
            tabBarIcon: ({ color }) => (
              <FontAwesome
                size={28}
                style={{ marginBottom: -3 }}
                name="home"
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="list30"
          options={{
            headerShown: false,
            tabBarLabel: "30",
            title: "30",
            tabBarIcon: ({ color }) => (
              <FontAwesome
                size={28}
                style={{ marginBottom: -3 }}
                name="home"
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="list60"
          options={{
            headerShown: false,
            tabBarLabel: "60",
            title: "60",
            tabBarIcon: ({ color }) => (
              <FontAwesome
                size={28}
                style={{ marginBottom: -3 }}
                name="home"
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="list90"
          options={{
            headerShown: false,
            tabBarLabel: "90",
            title: "90",
            tabBarIcon: ({ color }) => (
              <FontAwesome
                size={28}
                style={{ marginBottom: -3 }}
                name="home"
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
