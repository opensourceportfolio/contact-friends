import type { PostgrestError } from "@supabase/supabase-js";
import type { ReactNode } from "react";
import { ActivityIndicator, Text } from "react-native";

type AsyncPageProps = {
  error: Error | PostgrestError | undefined | null;
  loading: boolean | undefined | null;
  children: ReactNode;
};

export function AsyncComponent({ error, loading, children }: AsyncPageProps) {
  return loading ? (
    <ActivityIndicator />
  ) : error ? (
    <Text>Error: {error.message}</Text>
  ) : (
    children
  );
}
