export type Path = string[];
export interface Queries {
  [prop: string]: string;
}
export interface Navigators {
  push: (to: string) => void;
  replace: (to: string) => void;
  goBack: () => void;
}
