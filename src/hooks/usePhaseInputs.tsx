import { useState } from "react";

export default function usePhaseInputs() {
  const [inputState, setInputState] = useState(false);

  function handleInputChangeEvent(event: any) {
    console.log("event =", event.target.checked);
    setInputState(event.target.checked);
  }

  function setInput(input: any) {
    setInputState(input);
  }
  return { inputState, handleInputChangeEvent, setInput };
}
