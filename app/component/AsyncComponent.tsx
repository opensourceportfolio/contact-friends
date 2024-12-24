import type { PostgrestError } from "@supabase/supabase-js";
import { useEffect, useState, type ReactNode } from "react";
import { ActivityIndicator, Text } from "react-native";

type AsyncPageProps =
  | {
      error: Error | PostgrestError | undefined | null;
      loading: boolean | undefined | null;
      children: ReactNode;
    }
  | {
      action: Promise<unknown>;
      children: ReactNode;
    };

function readError(value: unknown) {
  if (
    value != null &&
    typeof value === "object" &&
    "error" in value &&
    value.error instanceof Error
  ) {
    return value.error;
  }
}

export function AsyncComponent(props: AsyncPageProps) {
  const [actionError, setActionError] = useState<Error>();
  const [actionLoading, setActionLoading] = useState<boolean>();
  const { action } = "action" in props ? props : {};
  const { loading, error } = "action" in props ? {} : props;
  const { children } = props;

  useEffect(() => {
    if (action) {
      setActionLoading(true);
      action
        .then((res) => {
          setActionError(readError(res));
        })
        .catch((err) => {
          setActionError(err);
        })
        .finally(() => {
          setActionLoading(false);
        });
    }
  }, [action]);

  const asyncError = error || actionError;
  const asyncLoading = loading || actionLoading;

  return asyncLoading ? (
    <ActivityIndicator />
  ) : asyncError ? (
    <Text>Error: {asyncError.message}</Text>
  ) : (
    children
  );
}
