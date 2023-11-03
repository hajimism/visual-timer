import { minuteSeconds } from "@/app/const";

export const getTimeMinutes = (duration: number, time: number) =>
  ((duration - time) / minuteSeconds) | 0;
