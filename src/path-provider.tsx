import * as React from "react";
import { PathProvider as BasePathProvider, useHistory } from "./context";
import { Path, Queries } from "./types";
import { urlFromRelativePath } from "./url-from-relative-path";

interface Props {
  path: Path;
  here: Path;
  children?: any;
}

export const PathProvider = ({ path, here, children }: Props) => {
  const { push, replace, goBack } = useHistory();
  return (
    <BasePathProvider
      value={{
        path,
        here,
        push: (to) => push(urlFromRelativePath(here, to)),
        replace: (to) => replace(urlFromRelativePath(here, to)),
        goBack
      }}
    >
      {children}
    </BasePathProvider>
  );
};
