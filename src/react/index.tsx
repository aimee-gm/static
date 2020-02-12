import React, { useContext } from "react";
import { renderToStaticMarkup } from "react-dom/server";

const LocationContext = React.createContext("/");

export function useLocation(): string {
  return useContext(LocationContext);
}

export const renderReact = (Content: () => JSX.Element) => (
  abspath: string
): string => {
  const composed = (
    <LocationContext.Provider value={abspath}>
      <Content />
    </LocationContext.Provider>
  );

  return `<!doctype html>${renderToStaticMarkup(composed)}`;
};
