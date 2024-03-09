import { useContext } from "react";
import { SessionContext } from "../context/Session";

export function useSession() {
  return useContext(SessionContext);
}
