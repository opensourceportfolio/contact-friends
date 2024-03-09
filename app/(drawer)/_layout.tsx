import { Icon } from "@rneui/themed";
import { Link } from "expo-router";
import Drawer from "expo-router/drawer";
import { AuthProvider } from "../context/Auth";

export default function DrawerLayout() {
  return (
    <AuthProvider>
      <Drawer>
        <Drawer.Screen
          name="screen/main"
          options={{
            drawerLabel: "Friends",
            title: "Friends",
            headerRight: () => (
              <Link href="/screen/main/AddFriend">
                <Icon name="account-plus" type="material-community" />
              </Link>
            ),
          }}
        />
        <Drawer.Screen
          name="screen/profile"
          options={{
            drawerLabel: "Profile",
            title: "Profile",
            headerRight: () => (
              <Link href="/screen/main/AddFriend">
                <Icon name="account-plus" type="material-community" />
              </Link>
            ),
          }}
        />
      </Drawer>
    </AuthProvider>
  );
}
