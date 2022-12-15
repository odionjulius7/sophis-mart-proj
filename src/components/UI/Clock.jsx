import React, { useState, useEffect } from "react";

import "../../styles/Clock.scss";

const Clock = () => {
  const [days, setDays] = useState();
  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();

  let interval;

  const countDown = () => {
    const destination = new Date("dec 25, 2022").getTime();

    interval = setInterval(() => {
      const now = new Date().getTime();
      //   get the diff btwn the set date and the present date
      const different = destination - now;
      //   get day, hr, min, sec
      // const days = Math.floor(different / (1 seconds * 1 minute * 1 hour * 1 day)) gives us the days
      const days = Math.floor(different / (1000 * 60 * 60 * 24));
      // const hours = Math.floor(different % (1 seconds * 1 minute * 1 hour * 1 day) / (1 seconds * 1 minute * 1 hour ) gives us the hours
      const hours = Math.floor(
        (different % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      // const minutes = Math.floor(different % (1 seconds * 1 minute * 1 hour ) / (1 seconds * 1 minute  ) gives us the minutes
      const minutes = Math.floor((different % (1000 * 60 * 60)) / (1000 * 60));
      // const minutes = Math.floor(different % (1 seconds * 1 minute  ) / (1 seconds  ) gives us the seconds
      const seconds = Math.floor((different % (1000 * 60)) / 1000);

      //   if the destination is < 0 the clear the interval and don't pass any data to the state
      if (destination < 0) clearInterval(interval.current);
      else {
        setDays(days);
        setHours(hours);
        setMinutes(minutes);
        setSeconds(seconds);
      }
    });
  };

  useEffect(() => {
    countDown();
  });

  return (
    <div className="clock_wrapper d-flex align-items-center gap-3">
      <div className="clock__data d-flex align-items-center gap-3">
        <div className="text-center">
          <h1 className="text-white fs-3 mb-2">{days}</h1>
          <h5 className="text-white fs-6">Days</h5>
        </div>
        <span className="text-white fs-3">:</span>
      </div>
      <div className="clock__data d-flex align-items-center gap-3">
        <div className="text-center">
          <h1 className="text-white fs-3 mb-2">{hours}</h1>
          <h5 className="text-white fs-6">Hours</h5>
        </div>
        <span className="text-white fs-3">:</span>
      </div>
      <div className="clock__data d-flex align-items-center gap-3">
        <div className="text-center">
          <h1 className="text-white fs-3 mb-2">{minutes}</h1>
          <h5 className="text-white fs-6">Minutes</h5>
        </div>
        <span className="text-white fs-3">:</span>
      </div>
      <div className="clock__data d-flex align-items-center gap-3">
        <div className="text-center">
          <h1 className="text-white fs-3 mb-2">{seconds}</h1>
          <h5 className="text-white fs-6">Seconds</h5>
        </div>
      </div>
    </div>
  );
};

export default Clock;
