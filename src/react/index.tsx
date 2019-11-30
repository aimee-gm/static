import React, { useContext } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { ContentGenerator } from "../generator";

const LocationContext = React.createContext("/");

export function useLocation() {
  return useContext(LocationContext);
}

export function renderReact<T>(
  content: (data: T) => JSX.Element
): ContentGenerator<T> {
  return (abspath: string, data: T) => {
    const composed = (
      <LocationContext.Provider value={abspath}>
        {content(data)}
      </LocationContext.Provider>
    );

    return `<!doctype html>${renderToStaticMarkup(composed)}`;
  };
}
