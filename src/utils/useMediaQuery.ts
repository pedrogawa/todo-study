import { useState, useEffect } from "react";

export function useMediaQuery(query: string) {
  const [match, setMatch] = useState(false);

  useEffect(() => {
    let mediaQuery: MediaQueryList = window.matchMedia(query);

    const onChange = () => {
      setMatch(mediaQuery.matches);
    };

    onChange();
    mediaQuery.addEventListener("change", onChange);

    return () => {
      mediaQuery.removeEventListener("change", onChange);
    };
  }, [query]);

  return match;
}
