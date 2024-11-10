import type { StateCreator } from "zustand";
import type { State } from ".";

type LogSliceData = {
  logs: string[];
};

export type LogsSlice = LogSliceData & {
  log: (message: any) => void
  logs: string[]
}

export const createLogsSlice: StateCreator<State, [], [], LogsSlice> = (
  set, get
) => ({
  logs: [], 

  log(data: any) {
    console.log(data)
    set({
      logs: get().logs.concat(data),
    });
  },
});
