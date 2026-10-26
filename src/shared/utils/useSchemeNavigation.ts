import { useCallback, useState } from "react";
import { schemeNodes, START_NODE_ID } from "../data";

export const useSchemeNavigation = () => {
  const [history, setHistory] = useState<string[]>([START_NODE_ID]);
  const [numberValues, setNumberValues] = useState<Record<string, number>>({});

  const currentId = history[history.length - 1];
  const currentNode = schemeNodes[currentId];

  const goTo = useCallback((nextId: string) => {
    setHistory((prev) => [...prev, nextId]);
  }, []);

  const goBack = useCallback(() => {
    setHistory((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  }, []);

  const submitNumber = useCallback(
    (value: number) => {
      if (currentNode.type !== "number-input") return;
      setNumberValues((prev) => ({ ...prev, [currentId]: value }));
      goTo(currentNode.getNext(value));
    },
    [currentId, currentNode, goTo],
  );

  const reset = useCallback(() => {
    setHistory([START_NODE_ID]);
    setNumberValues({});
  }, []);

  return {
    currentNode,
    currentId,
    numberValues,
    canGoBack: history.length > 1,
    goTo,
    goBack,
    submitNumber,
    reset,
  };
};
