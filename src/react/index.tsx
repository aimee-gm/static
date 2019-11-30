import React, { useContext } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { ContentGenerator } from "../generator";

const LocationContext = React.createContext("/");

export function useLocation() {
  return useContext(LocationContext);
}

export function renderReact(
  content: () => JSX.Element
): ContentGenerator {
  return (abspath: string) => {
    const composed = (
      <LocationContext.Provider value={abspath}>
        {content()}
      </LocationContext.Provider>
    );

    return `<!doctype html>${renderToStaticMarkup(composed)}`;
  };
}
