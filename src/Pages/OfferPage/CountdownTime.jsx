import  { useState, useEffect } from 'react';

const CountdownTimer = ({ startTime, endTime }) => {
  const [timeLeft, setTimeLeft] = useState({});
  const [timerState, setTimerState] = useState(""); // "upcoming" or "running"

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const start = new Date(startTime);
      const end = new Date(endTime);

      let diff;
      if (now < start) {
        setTimerState("upcoming");
        diff = start - now;
      } else if (now >= start && now <= end) {
        setTimerState("running");
        diff = end - now;
      } else {
        setTimerState("expired");
        clearInterval(interval);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, endTime]);

  if (timerState === "expired") {
    return <div>Offer has expired.</div>;
  }

  return (
    <div>
      {timerState === "upcoming" && (
        <div className=' text-center py-2 border-2 hover:bg-olive border-olive px-3 rounded text-Charcoal duration-300 hover:text-warm font-merriweather text-18'>
          Offer starts in: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
        </div>
      )}
      {timerState === "running" && (
        <div className=' text-center py-2 border-2 hover:bg-olive border-olive px-3 rounded text-Charcoal duration-300 hover:text-white font-merriweather text-18'>
          Offer ends in: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
        </div>
      )}
    </div>
  );
};

export default CountdownTimer;
