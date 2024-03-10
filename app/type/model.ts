import { Database } from "../lib/database.types";

type Table = Database["public"]["Tables"];

type View = Database["public"]["Views"];

type SupabaseType<T extends { Row: unknown }> = Omit<
  T["Row"],
  "created_at" | "user_id"
>;

type PostLeftJoin<T, L, R> = {
  [K in keyof T]: K extends keyof L ? L[K] : T[K];
};

export type Friend = SupabaseType<Table["friends"]>;

export type Visit = SupabaseType<Table["visits"]>;

export type Profile = SupabaseType<Table["profiles"]>;

export type Frequency = Database["public"]["Enums"]["frequency"];

export type FriendWithVisit = {
  avatar: string | null;
  frequency: "30" | "60" | "90" | "180";
  id: number;
  name: string;
  latest_date: string | null;
};
