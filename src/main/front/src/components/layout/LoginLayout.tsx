import { LoginLayoutWrap, Bubble } from "@/styles/LoginLayout.styles";
import { useMemo } from "react";
import { Outlet } from "react-router-dom";

export default function LoginLayout() {
  const bubbles = useMemo(() => {
    return Array.from({ length: 200 }).map((_, i) => {
      const size = Math.random() * 20 + 60;
      const duration = Math.random() * 10 + 5;
      const left = Math.random() * 100;
      const bottom = Math.random() * 100 - 30;

      return { i, size, left, bottom, duration };
    });
  }, []);

  return (
    <LoginLayoutWrap>
      {bubbles.map(({ i, size, left, bottom, duration }) => (
        <Bubble
          key={i}
          $duration={`${duration}s`}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${left}%`,
            bottom: `${bottom}%`,
          }}
        />
      ))}
      <Outlet />
    </LoginLayoutWrap>
  );
}
