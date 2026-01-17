import styled, { keyframes } from "styled-components";

interface BubbleProps {
  delay?: string;
  $duration?: string;
}

export const floatUp = keyframes`
  0% { transform: translateY(0) translateX(0); }
  25% { transform: translateY(-30vh) translateX(10px); }
  50% { transform: translateY(-60vh) translateX(-10px); }
  75% { transform: translateY(-90vh) translateX(10px); }
  100% { transform: translateY(-120vh) translateX(-10px); }
`;

const BaseBubble = styled.div<BubbleProps>`
  position: absolute;
  border-radius: 50%;
  background:
    radial-gradient(
      circle at 30% 30%,
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0.05) 70%
    ),
    conic-gradient(
      from 0deg,
      rgba(255, 0, 0, 0.1),
      rgba(255, 154, 0, 0.1),
      rgba(208, 222, 33, 0.1),
      rgba(79, 220, 74, 0.1),
      rgba(63, 218, 216, 0.1),
      rgba(47, 201, 226, 0.1),
      rgba(28, 127, 238, 0.1),
      rgba(95, 21, 242, 0.1),
      rgba(186, 12, 248, 0.1),
      rgba(251, 7, 217, 0.1),
      rgba(255, 0, 0, 0.1)
    );
  box-shadow:
    inset -10px -10px 20px rgba(255, 255, 255, 0.4),
    inset 8px 8px 15px rgba(173, 216, 230, 0.2),
    0 0 25px rgba(173, 216, 230, 0.3);
  backdrop-filter: blur(0px);
  animation: ${floatUp} linear infinite;
  opacity: 0.6;
  border: 1px solid rgba(255, 255, 255, 0.5);
  background-blend-mode: screen;
`;

export const Bubble = styled(BaseBubble).attrs(({ $duration }) => ({
  style: {
    animationDuration: $duration || "30s",
  },
}))``;

export const LoginLayoutWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
  background-color: #d6bcff;
  position: relative;

  .dark & {
    background-color: #1e293b;
  }
`;
