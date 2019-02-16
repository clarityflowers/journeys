import { useEffect } from "react";
import { usePath } from "./context";

interface Props {
  to: string;
  push?: boolean;
}
export const Redirect = ({ to, push = false }: Props) => {
  const { replace, push: doPush } = usePath();
  useEffect(() => {
    push ? doPush(to) : replace(to);
  }, []);
  return null;
};
