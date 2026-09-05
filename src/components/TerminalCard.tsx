"use client";

import React, { useEffect, useState } from "react";
import SpotlightCard from "@/components/SpotlightCard";


const CMD = "deploy --prod";

export default function TerminalCard() {
  const [typed, setTyped] = useState("");
  const [showDeployed, setShowDeployed] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      const timer = setTimeout(() => {
        setTyped(CMD);
        setShowDeployed(true);
      }, 0);
      return () => clearTimeout(timer);
    }

    let i = 0;
    let interval: ReturnType<typeof setInterval> | null = null;

    const timer = setTimeout(() => {
      interval = setInterval(() => {
        i++;
        setTyped(CMD.slice(0, i));
        if (i >= CMD.length) {
          if (interval) clearInterval(interval);
          setShowDeployed(true);
        }
      }, 50 + Math.random() * 40);
    }, 1400);

    return () => {
      clearTimeout(timer);
      if (interval) clearInterval(interval);
    };
  }, []);

  return (
    <SpotlightCard className="code-card">
      <div className="code-head">
        <i></i>
        <i></i>
        <i></i>
        <span>~/engineer.ts</span>
      </div>
      <pre>
        <code>
          <span className="tk">export const</span> <span className="tf">engineer</span> = &#123;{"\n"}
          {"  "}name: <span className="ts">&apos;Abhijeet Rana&apos;</span>,{"\n"}
          {"  "}stack: [<span className="ts">&apos;Node&apos;</span>, <span className="ts">&apos;React&apos;</span>, <span className="ts">&apos;AWS&apos;</span>],{"\n"}
          {"  "}focus: <span className="ts">&apos;systems that scale&apos;</span>,{"\n"}
          {"  "}shipping: <span className="tn">true</span>,  <span className="tc">&#47;&#47; always</span>{"\n"}
          &#125;;{"\n"}
          <span className="tc">$ </span>
          <span id="typeLine">{typed}</span>
          <span className="caret"></span>{"\n"}
          <span id="typeOut" className={showDeployed ? "" : "hidden"}>
            <span className="tk">✓</span> deployed to production — 1.2s
          </span>
        </code>
      </pre>
    </SpotlightCard>
  );
}
