import * as React from "react";
import { createContext, useContext } from "react";
import { History } from "history";
import { Path, Queries, Navigators } from "./types";

type PathContextValue = {
  path: Path;
  here: Path;
} & Navigators;

interface Route {
  path: Path;
  queries: Queries;
}

const PathContext = createContext<PathContextValue | null>(null);
const QueriesContext = createContext<Queries | null>(null);
const HistoryContext = createContext<History | null>(null);

export const HistoryProvider = HistoryContext.Provider;
export const PathProvider = PathContext.Provider;
export const QueriesProvider = QueriesContext.Provider;

const makeContextHook = <T extends any>(
  context: React.Context<T | null>
) => () => {
  const result = useContext(context);
  if (!result)
    throw new Error(
      "To use Restless, you need a RouterProvider somewhere above this in your component tree"
    );
  return result;
};

export const useHistory = makeContextHook(HistoryContext);
export const usePath = makeContextHook(PathContext);
const useQueryContext = makeContextHook(QueriesContext);
export const useQueries = <T extends Queries>() => useQueryContext() as T;
