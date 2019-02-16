import * as React from "react";
import { parse } from "qs";
import { History, Location, createBrowserHistory } from "history";
import { useState, useEffect } from "react";
import { Path, Queries } from "./types";
import { HistoryProvider, QueriesProvider } from "./context";
import { PathProvider } from "./path-provider";

interface Route {
  path: Path;
  queries: Queries;
}

interface Props {
  history?: History;
  children?: any;
}

const parseRoute = (location: Location) => ({
  path: location.pathname.split("/").slice(1),
  queries: location.search ? parse(location.search.slice(1)) : {}
});

export const RouterProvider = ({ history: inputHistory, children }: Props) => {
  const [history, setCurrentHistory] = useState<History>(
    () => inputHistory || createBrowserHistory()
  );
  useEffect(() => {
    if (inputHistory && inputHistory !== history)
      setCurrentHistory(inputHistory);
  });

  const [{ path, queries }, setRoute] = useState<Route>({
    path: [],
    queries: {}
  });

  useEffect(
    () => history.listen((location) => setRoute(parseRoute(location))),
    [history]
  );

  return (
    <HistoryProvider value={history}>
      <QueriesProvider value={queries}>
        <PathProvider path={path} here={[]}>
          {children}
        </PathProvider>
      </QueriesProvider>
    </HistoryProvider>
  );
};
