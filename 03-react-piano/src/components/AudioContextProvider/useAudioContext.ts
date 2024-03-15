import { useRef } from "react";
import { Optional } from "../../domain/types";
import { accessContext } from "../../domain/audio";

export function useAudioContext(): Optional<AudioContextType> {
  const AudioCtx = useRef(accessContext()); // to remember the return value of our accessContext function
  return AudioCtx.current;
}
