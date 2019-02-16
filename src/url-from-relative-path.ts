import { Path } from "./types";

const getRelativePathStepBack = (path: string[]) => {
  let i = 0;
  while (i < path.length) {
    if (path[i] != "..") return i;
    i++;
  }
  return i;
};

export const urlFromRelativePath = (here: Path, to: string) => {
  const toPath = to.split("/");
  const stepBack = getRelativePathStepBack(toPath);
  const fullPath = [
    ...here.slice(0, here.length - stepBack),
    ...toPath.slice(stepBack)
  ];
  return "/" + fullPath.join("/");
};
