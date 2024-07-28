import { useVisitsData } from "./useVisitsData";

type VisitData = {
  friendId: number;
  visitId: number;
};

export function useVisitData(friendId: number, visitId: number) {
  const { visits, loading, error } = useVisitsData(friendId);
  const visit = visits?.find((v) => v.id === visitId);

  return { visit, loading, error };
}
