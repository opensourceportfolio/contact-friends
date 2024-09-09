import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Fontisto from "@expo/vector-icons/Fontisto";
import { SearchBar } from "@rneui/themed";
import { Tabs } from "expo-router";
import { useAuth } from "../../../../hook/useAuth";

export default function TabsLayout() {
  const { authenticated } = useAuth();

  if (!authenticated) {
    return null;
  }

  return (
    <>
      <Tabs>
        <Tabs.Screen
          name="late"
          options={{
            headerShown: false,
            tabBarLabel: "Late",
            title: "Late",
            tabBarIcon: ({ color }) => (
              <MaterialIcons
                size={28}
                style={{ marginBottom: -3 }}
                name="watch-later"
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
                name="calendar"
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
              <FontAwesome6
                size={28}
                style={{ marginBottom: -3 }}
                name="check-double"
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
              <Fontisto
                size={28}
                style={{ marginBottom: -3 }}
                name="pie-chart-1"
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
