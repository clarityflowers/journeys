import React, { isValidElement } from "react";
import { usePath } from "./context";
import { Path, Queries } from "./types";
import { PathProvider } from "./path-provider";

export type RootComponent = React.ComponentType<{
  path: Path;
  here: Path;
}>;

export type PageComponent = React.ComponentType<{
  path: Path;
  here: Path;
  match: string;
}>;

type RouteFn = (
  next: string,
  props: {
    path: string[];
    here: string[];
  }
) => any;

type Props = {
  children: RouteFn | JSX.Element;
  root?: RootComponent | JSX.Element;
  fallback?: PageComponent | JSX.Element;
};

export const tryComponent = <T extends {}>(
  component: React.ComponentType<T> | JSX.Element | undefined,
  props: T
) => {
  const Component = component as React.ComponentType<T>;
  return (
    (component &&
      (isValidElement(component) ? component : <Component {...props} />)) ||
    null
  );
};

export const Route = ({ root, children, fallback }: Props) => {
  const { path, here } = usePath();
  const [next, ...rest] = path;
  return next ? (
    <PathProvider path={rest} here={[...here, next]}>
      {typeof children === "function"
        ? children(next, {
            path,
            here
          }) ||
          tryComponent(fallback, {
            path: rest,
            here: [...here, next],
            match: next
          })
        : children}
    </PathProvider>
  ) : (
    tryComponent(root, { path, here })
  );
};
