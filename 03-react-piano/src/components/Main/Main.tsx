import React, { FunctionComponent } from "react";
import { Keyboard } from "../Keyboard/Keyboard";
import { NoAudioMessage } from "../NoAudioMessage/NoAudioMessage";
import { useAudioContext } from "../AudioContextProvider/useAudioContext";

export const Main: FunctionComponent = () => {
  const AudioContext = useAudioContext();
  // Check whether the browser supports Audio API or not and decides which component to render
  return !!AudioContext ? <Keyboard /> : <NoAudioMessage />;
};
