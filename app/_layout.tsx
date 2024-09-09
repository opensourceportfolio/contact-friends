import { Slot } from "expo-router";
import Toast from "react-native-toast-message";
import { SessionProvider } from "./context/Session";

export default function MainLayout() {
  return (
    <SessionProvider>
      <Slot />
      <Toast />
    </SessionProvider>
  );
}
