"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type AudioGraph = {
  context: AudioContext;
  master: GainNode;
  humGain: GainNode;
  oscillators: OscillatorNode[];
  lfo: OscillatorNode;
};

const STORAGE_KEY = "feepost-sound-enabled";

function isInteractiveElement(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  return Boolean(
    target.closest(
      "a, button, [role='button'], input[type='submit'], input[type='button'], [data-cursor='interactive']"
    )
  );
}

function createAudioGraph(): AudioGraph {
  const context = new window.AudioContext();
  const master = context.createGain();
  const humGain = context.createGain();
  const filter = context.createBiquadFilter();
  const lfo = context.createOscillator();
  const lfoGain = context.createGain();

  master.gain.value = 0.18;
  humGain.gain.value = 0.0001;
  filter.type = "lowpass";
  filter.frequency.value = 420;
  lfo.type = "sine";
  lfo.frequency.value = 0.09;
  lfoGain.gain.value = 0.0035;

  const oscillatorOne = context.createOscillator();
  oscillatorOne.type = "sine";
  oscillatorOne.frequency.value = 55;

  const oscillatorTwo = context.createOscillator();
  oscillatorTwo.type = "triangle";
  oscillatorTwo.frequency.value = 82.5;

  oscillatorOne.connect(filter);
  oscillatorTwo.connect(filter);
  filter.connect(humGain);
  humGain.connect(master);
  master.connect(context.destination);
  lfo.connect(lfoGain);
  lfoGain.connect(humGain.gain);

  oscillatorOne.start();
  oscillatorTwo.start();
  lfo.start();

  return {
    context,
    master,
    humGain,
    oscillators: [oscillatorOne, oscillatorTwo],
    lfo
  };
}

function playInteractionClick(graph: AudioGraph) {
  const { context, master } = graph;
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  const filter = context.createBiquadFilter();
  const now = context.currentTime;

  oscillator.type = "triangle";
  oscillator.frequency.setValueAtTime(520, now);
  oscillator.frequency.exponentialRampToValueAtTime(260, now + 0.08);

  filter.type = "highpass";
  filter.frequency.value = 180;

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.025, now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);

  oscillator.connect(filter);
  filter.connect(gain);
  gain.connect(master);

  oscillator.start(now);
  oscillator.stop(now + 0.11);
}

export function SoundControl() {
  const reduceMotion = useReducedMotion() ?? false;
  const [enabled, setEnabled] = useState(true);
  const [ready, setReady] = useState(false);
  const audioRef = useRef<AudioGraph | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "false") {
      setEnabled(false);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, String(enabled));
  }, [enabled]);

  useEffect(() => {
    if (!enabled || reduceMotion) {
      return;
    }

    const unlockAudio = async () => {
      if (!audioRef.current) {
        audioRef.current = createAudioGraph();
      }

      const graph = audioRef.current;
      if (graph.context.state === "suspended") {
        await graph.context.resume();
      }

      graph.humGain.gain.cancelScheduledValues(graph.context.currentTime);
      graph.humGain.gain.linearRampToValueAtTime(0.012, graph.context.currentTime + 1.4);
      setReady(true);
    };

    const handleFirstGesture = () => {
      void unlockAudio();
      window.removeEventListener("pointerdown", handleFirstGesture);
      window.removeEventListener("keydown", handleFirstGesture);
    };

    window.addEventListener("pointerdown", handleFirstGesture, { passive: true });
    window.addEventListener("keydown", handleFirstGesture);

    return () => {
      window.removeEventListener("pointerdown", handleFirstGesture);
      window.removeEventListener("keydown", handleFirstGesture);
    };
  }, [enabled, reduceMotion]);

  useEffect(() => {
    const graph = audioRef.current;
    if (!graph) {
      return;
    }

    graph.humGain.gain.cancelScheduledValues(graph.context.currentTime);
    graph.humGain.gain.linearRampToValueAtTime(
      enabled && !reduceMotion ? 0.012 : 0.0001,
      graph.context.currentTime + 0.6
    );
  }, [enabled, reduceMotion]);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!enabled || !ready || reduceMotion || !audioRef.current) {
        return;
      }

      if (isInteractiveElement(event.target)) {
        playInteractionClick(audioRef.current);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!enabled || !ready || reduceMotion || !audioRef.current) {
        return;
      }

      if ((event.key === "Enter" || event.key === " ") && isInteractiveElement(event.target)) {
        playInteractionClick(audioRef.current);
      }
    };

    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [enabled, ready, reduceMotion]);

  useEffect(() => {
    return () => {
      const graph = audioRef.current;
      if (!graph) {
        return;
      }

      graph.oscillators.forEach((oscillator) => oscillator.stop());
      graph.lfo.stop();
      void graph.context.close();
    };
  }, []);

  return (
    <motion.button
      type="button"
      className="sound-toggle"
      data-cursor="interactive"
      aria-pressed={enabled}
      aria-label={enabled ? "Mute interface sound" : "Enable interface sound"}
      onClick={() => setEnabled((current) => !current)}
      whileHover={reduceMotion ? undefined : { y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="sound-toggle__dot" aria-hidden="true" />
      <span className="sound-toggle__label">{enabled ? "Sound On" : "Sound Off"}</span>
    </motion.button>
  );
}
