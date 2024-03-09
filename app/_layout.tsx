import { Slot } from "expo-router";
import { SessionProvider } from "./context/Session";

export default function MainLayout() {
  return (
    <SessionProvider>
      <Slot />
    </SessionProvider>
  );
}
