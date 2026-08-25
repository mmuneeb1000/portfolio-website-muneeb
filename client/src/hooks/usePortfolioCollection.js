import { useEffect, useState } from "react";
import { fetchPortfolioCollection } from "../api/portfolio";

export default function usePortfolioCollection(type) {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let ignore = false;

    async function loadItems() {
      try {
        const data = await fetchPortfolioCollection(type);

        if (!ignore) {
          setItems(data);
          setStatus("ready");
        }
      } catch (error) {
        console.error(error);

        if (!ignore) {
          setItems([]);
          setStatus("error");
        }
      }
    }

    loadItems();

    return () => {
      ignore = true;
    };
  }, [type]);

  return {
    items,
    isLoading: status === "loading",
    hasError: status === "error",
  };
}
