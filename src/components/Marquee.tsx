import React from "react";

const items = [
  "node.js",
  "typescript",
  "react",
  "postgresql",
  "mongodb",
  "aws lambda",
  "docker",
  "redis",
  "express",
  "nginx",
  "openwhisk",
];

export default function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {items.map((item, idx) => (
          <span key={`m1-${idx}`}>{item}</span>
        ))}
        {items.map((item, idx) => (
          <span key={`m2-${idx}`}>{item}</span>
        ))}
      </div>
    </div>
  );
}
