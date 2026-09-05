"use client";

import React, { useEffect, useState } from "react";

export default function ISTClock() {
  const [timeStr, setTimeStr] = useState<string>("--:--:--");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kolkata",
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    const tick = () => setTimeStr(fmt.format(new Date()));
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);

  return <span id="clock">{timeStr}</span>;
}
