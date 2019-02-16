import * as React from "react";
import { forwardRef } from "react";
import { usePath } from "./context";
import cx from "classnames";
import { Path } from "./types";
import { urlFromRelativePath } from "./url-from-relative-path";

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

type NavProps =
  | {
      nav: true;
      exact?: boolean;
      activeClassName?: string;
      activeStyle?: React.StyleHTMLAttributes<HTMLAnchorElement>;
    }
  | {
      nav: false;
      exact?: undefined;
      activeClassName?: undefined;
      activeStyle?: undefined;
    };
type Props = {
  to?: string;
  disabled?: boolean;
  replace?: boolean;
} & NavProps &
  Omit<
    React.DetailedHTMLProps<
      React.AnchorHTMLAttributes<HTMLAnchorElement>,
      HTMLAnchorElement
    >,
    "href"
  >;

const match = (path: Path, subpath: Path): "none" | "subpath" | "exact" => {
  if (path.length < subpath.length) return "none";
  for (let i = 0; i < subpath.length; i++) {
    if (subpath[i] !== path[i]) return "none";
  }
  if (path.length === subpath.length) return "exact";
  return "subpath";
};

export const Link = forwardRef<HTMLAnchorElement, Props>(
  (
    {
      to = "",
      disabled = false,
      replace = false,
      className,
      nav = false,
      activeClassName = "active",
      activeStyle = {},
      exact = false,
      style = {},
      onClick,
      ...rest
    },
    ref
  ) => {
    const { here, path, push, replace: doReplace } = usePath();
    const [next] = path;
    const linkMatch = match([...here, next], to.split("/"));
    const active =
      nav && (exact ? linkMatch === "exact" : linkMatch !== "none");

    return (
      <a
        ref={ref}
        style={{ ...style, ...(active ? activeStyle : {}) }}
        href={urlFromRelativePath(here, to)}
        className={cx(className, {
          [activeClassName]: active,
          disabled
        })}
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();
          if (!active && !disabled) {
            if (replace) {
              doReplace(to);
            } else {
              push(to);
            }
          }
        }}
        {...rest}
      />
    );
  }
);
