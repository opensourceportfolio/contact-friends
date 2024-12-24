import { Divider, ListItem } from "@rneui/base";
import { Text } from "@rneui/themed";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import { useContactFriendsStore } from "../../../store";

export default function LogViewer() {
  const [expandedIndex, setExpandedIndex] = useState(-1);
  const logs = useContactFriendsStore((s) => s.logs);

  return (
    <ScrollView>
      {logs.reverse().map((log, index) => {
        const logStr = JSON.stringify(log);

        return (
          <React.Fragment key={index}>
            <ListItem.Accordion
              isExpanded={index === expandedIndex}
              onPress={() => setExpandedIndex(index)}
              key={index}
              content={<Text>{logStr.substring(0, 50)}</Text>}
            >
              <Text>{logStr}</Text>
            </ListItem.Accordion>
            <Divider></Divider>
          </React.Fragment>
        );
      })}
    </ScrollView>
  );
}
