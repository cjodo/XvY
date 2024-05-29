import { useEffect, useState } from "react";

export const useResizeLoad = () => {
  const [innerWidth, setInnerWidth] = useState(0);
  useEffect(() => {
    const handleUpdate = () => {
      setInnerWidth(window.innerWidth);
    };

    handleUpdate();

    window.addEventListener("load", handleUpdate);
    window.addEventListener("resize", handleUpdate);

    return () => {
      window.removeEventListener("load", handleUpdate);
      window.removeEventListener("resize", handleUpdate);
    };
  }, []);

  return innerWidth;
};
