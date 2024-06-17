import { useEffect } from "react";

interface Props {
  time: number;
  onCountdownEnd?: () => void;
  startCountdown?: boolean;
  setTime?: React.Dispatch<React.SetStateAction<number>>;
}

/**
 *
 * @param time The time in seconds
 * @param onCountdownEnd A callback function that is called when the countdown ends
 * @param startCountdown A boolean that determines when the countdown should start
 * @returns countdown timer
 */
const CountDown = ({
  time,
  onCountdownEnd,
  startCountdown,
  setTime,
}: Props) => {
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (startCountdown) {
      timer = setInterval(() => {
        if (setTime)
          setTime((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              onCountdownEnd && onCountdownEnd();
              return 0;
            }
            return prev - 1;
          });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [startCountdown]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return (
    <span>
      {minutes < 10 ? `0${minutes}` : minutes}:
      {seconds < 10 ? `0${seconds}` : seconds}
    </span>
  );
};

export default CountDown;
