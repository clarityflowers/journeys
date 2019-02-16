import { usePath, useQueries } from "./context";

export const useRouter = () => {
  const path = usePath();
  const queries = useQueries();
  return {
    ...path,
    queries
  };
};
