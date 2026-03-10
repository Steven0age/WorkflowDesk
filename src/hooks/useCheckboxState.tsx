import { useState, type ChangeEvent } from "react";
import type { CheckboxStateTypes } from "../types/types";
import type { PhaseCardTypes } from "../components/TicketModal/PhaseCard";

export default function useCheckboxState({ phaseItem }: PhaseCardTypes) {
  const [checkboxStates, setCheckboxStates] = useState(() =>
    phaseItem
      ? phaseItem.tasks.map((i) => ({ key: i.id, checked: i.is_done }))
      : [],
  );

  function handleCheckboxChange(
    event: ChangeEvent<HTMLInputElement>,
    keyID: CheckboxStateTypes["key"],
  ) {
    const changedItem = checkboxStates.findIndex((i) => i["key"] === keyID);
    const newStates = [...checkboxStates];
    newStates.splice(changedItem, 1, {
      key: keyID,
      checked: event.target.checked,
    });
    setCheckboxStates(newStates);
  }

  return { checkboxStates, handleCheckboxChange };
}
