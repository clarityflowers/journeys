import React from "react";
import { Route, PageComponent, RootComponent, tryComponent } from "./route";
import { Redirect } from "./redirect";

interface Page {
  path: string;
  component: PageComponent | JSX.Element;
}
interface Redirect {
  path: string;
  redirectTo: string;
}

const isRedirect = (page: Page | Redirect): page is Redirect =>
  !!(page as Redirect).redirectTo;

interface Props {
  pages: (Page | Redirect)[];
  fallback?: PageComponent | JSX.Element;
  root?: RootComponent | JSX.Element;
}
export const Switch = ({ pages, fallback, root }: Props) => (
  <Route fallback={fallback} root={root}>
    {(next, props) => {
      for (const page of pages) {
        if (page.path === next) {
          if (isRedirect(page)) return <Redirect to={page.redirectTo} />;
          return tryComponent(page.component, props);
        }
      }
      return null;
    }}
  </Route>
);
