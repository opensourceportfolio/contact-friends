import { Database } from "../lib/database.types";

type Table = Database["public"]["Tables"];

type SupabaseType<T extends { Row: unknown }> = Omit<T["Row"], "created_at" | "user_id">;

export type Friend = SupabaseType<Table["friends"]>;

export type Visit = SupabaseType<Table["visits"]>;

export type Profile = SupabaseType<Table["profiles"]>;

export type Frequency = Database["public"]["Enums"]["frequency"];
