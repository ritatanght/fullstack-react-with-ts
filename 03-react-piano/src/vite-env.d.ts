/// <reference types="vite/client" />

type AudioContextType = typeof AudioContext;
interface Window extends Window {
  webkitAudioContext: AudioContextType;
}
