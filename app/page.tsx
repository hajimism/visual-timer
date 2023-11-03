"use client";

import { useCallback, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useSound } from "use-sound";
import { useBoolean, useCounter } from "usehooks-ts";

import {
  DURATION_DEFAULT_VALUE,
  PRIMARY_COLOR,
  minuteSeconds,
} from "@/app/const";

import { Icons } from "@/common/components/icons";
import { Slider } from "@/common/components/slider";
import { getTimeMinutes } from "@/common/lib/time";

const timerProps = {
  size: 120,
  strokeWidth: 6,
};

const renderTime = (dimension: string, time: number) => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-3xl">{time}</div>
      <div>{dimension}</div>
    </div>
  );
};

export default function Home() {
  const {
    value: isPlayng,
    setTrue: playStart,
    setFalse: playStop,
  } = useBoolean(false);
  const { count: key, increment: setKey } = useCounter(0);
  const [duration, setDuration] = useState([DURATION_DEFAULT_VALUE]);
  const [sound] = useSound("/celebration.mp3", { volume: 0.25 });

  const reset = useCallback(() => {
    setKey();
    playStop();
  }, [playStop, setKey]);

  const currentDuration = duration[0];
  if (currentDuration === undefined) return <>error</>;
  const durationMinutes = currentDuration * minuteSeconds;

  return (
    <main className="flex min-h-screen items-center justify-center gap-12">
      <Slider
        value={duration}
        onValueChange={setDuration}
        disabled={isPlayng}
      />

      <div className="flex flex-col items-center gap-4">
        <CountdownCircleTimer
          key={key}
          {...timerProps}
          isPlaying={isPlayng}
          colors={PRIMARY_COLOR}
          duration={durationMinutes}
          onComplete={() => {
            playStop();
            sound();
          }}
        >
          {({ elapsedTime, color }) => (
            <span style={{ color }}>
              {renderTime(
                "minutes",
                getTimeMinutes(durationMinutes, elapsedTime)
              )}
            </span>
          )}
        </CountdownCircleTimer>

        <div className="flex gap-4">
          {isPlayng ? (
            <button onClick={playStop}>
              <Icons.pause />
            </button>
          ) : (
            <button
              onClick={playStart}
              disabled={currentDuration === 0}
              className="disabled:text-secondary"
            >
              <Icons.play />
            </button>
          )}
          <button onClick={reset}>
            <Icons.reset />
          </button>
        </div>
      </div>
    </main>
  );
}
