import { useMemo } from "react";

function useSortedData<T>(data: T[], sortBy: keyof T, order: "asc" | "desc" = "asc"): T[] {
  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      if (a[sortBy] < b[sortBy]) {
        return order === "asc" ? -1 : 1;
      }
      if (a[sortBy] > b[sortBy]) {
        return order === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortBy, order]);

  return sortedData;
}

export default useSortedData;