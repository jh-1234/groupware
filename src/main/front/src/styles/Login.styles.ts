import { Button } from "@mui/material";
import styled from "styled-components";

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 40px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  z-index: 1;

  .dark & {
    background-color: rgba(15, 23, 42, 0.8);
  }
`;

export const InputGroup = styled.div`
  position: relative;
`;

export const IconWrap = styled.span`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  color: #999;
`;

export const Label = styled.label`
  position: absolute;
  top: 6px;
  left: 40px;
  font-size: 16px;
  color: #999;
  pointer-events: none;
  transition:
    top 0.4s ease,
    bottom 0.4s ease,
    font-size 0.4s ease;
`;

export const Underline = styled.span`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  width: 0;
  background-color: #4284ff;
  transition: width 0.3s ease;
`;

export const Input = styled.input`
  padding: 10px 10px 10px 40px;
  font-size: 16px;
  border: none;
  border-bottom: 1px solid #333;
  background-color: transparent;
  outline: none;
  position: relative;
  width: 300px;

  &:focus {
    border-bottom: none;
  }

  &:focus + ${Label}, &:not(:placeholder-shown) + ${Label} {
    top: -10px;
    font-size: 10px;
    color: #2b87ff;
  }

  &:focus ~ ${Underline} {
    width: 100%;
  }

  &:-webkit-autofill {
    transition: background-color 7200s ease-in-out 7200s;
  }
`;

export const StyleButton = styled(Button)`
  && {
    background-color: #67c2ff;
    padding: 12px 24px;
    border-radius: 8px;
    cursor: pointer;

    &:hover {
      background-color: #2d70ff;
      color: #fff;
    }
  }
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 4px 0 8px 0;
  cursor: pointer;
`;

export const HiddenCheckbox = styled.input`
  display: none;
`;

export const StyledCheckbox = styled.div<{ checked: boolean }>`
  width: 18px;
  height: 18px;
  border: 2px solid ${(props) => (props.checked ? "#4284ff" : "#999")};
  background-color: ${(props) => (props.checked ? "#4284ff" : "transparent")};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
`;

export const CheckTick = styled.div`
  width: 10px;
  height: 5px;
  border-left: 2px solid white;
  border-bottom: 2px solid white;
  transform: rotate(-45deg);
  margin-bottom: 2px;
`;

export const CheckboxLabel = styled.label`
  font-size: 14px;
  color: #666;
  cursor: pointer;
  user-select: none;

  .dark & {
    color: #ccc;
  }
`;
