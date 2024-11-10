import { ListItem } from "@rneui/base";
import { Text } from "@rneui/themed";
import { ScrollView } from "react-native";
import { useContactFriendsStore } from "../../../store";

export default function LogViewer() {
  const logs = useContactFriendsStore((s) => s.logs);

  return (
    <ScrollView>
      {logs.reverse().map((log) => {
        return (
          <ListItem>
            <Text>{JSON.stringify(log)}</Text>
          </ListItem>
        );
      })}
    </ScrollView>
  );
}
