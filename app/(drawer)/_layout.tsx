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
              <Link
                href="/screen/main/friend/edit"
                style={{ paddingRight: 20 }}
              >
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

          }}
        />
      </Drawer>
    </AuthProvider>
  );
}
