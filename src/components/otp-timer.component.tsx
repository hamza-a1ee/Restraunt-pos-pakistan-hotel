import React, { useEffect, useState } from "react";

interface Props {
  duration: number;
  onTimerEnd: () => void;
}

export default function OtpTimer({ duration, onTimerEnd }: Props) {
  const [timeLeft, setTimeLeft] = useState<number>(duration);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else {
      onTimerEnd();
    }
    return () => clearTimeout(timer);
  }, [timeLeft, onTimerEnd]);

  return (
    <p className="mt-2 text-label-secondary text-sm">
      Resend available in {timeLeft}s
    </p>
  );
}