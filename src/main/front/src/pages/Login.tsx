import { useState } from "react";
import LoginIcon from "@mui/icons-material/Login";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import {
  CheckboxContainer,
  CheckboxLabel,
  CheckTick,
  HiddenCheckbox,
  IconWrap,
  Input,
  InputGroup,
  Label,
  LoginForm,
  StyleButton,
  StyledCheckbox,
  Underline,
} from "../styles/Login.styles";
import { useNavigate } from "react-router-dom";
import { useLogin } from "@/hooks/useAuth";
import axios from "axios";
import { axiosErrorMessageFormat } from "@/utils/errorUtils";
import { useAuthActions } from "@/store/authStore";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRememberMe, setIsRememberMe] = useState(false);
  const { mutate: login, isPending } = useLogin();
  const { setToken } = useAuthActions();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username) {
      alert("아이디를 입력해주세요.");
      return;
    }

    if (!password) {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    const data = {
      username,
      password,
      isRememberMe,
    };

    login(data, {
      onSuccess: (token) => {
        setToken(token);
        navigate("/", { replace: true });
      },
      onError: (e) => {
        if (axios.isAxiosError(e)) {
          alert(axiosErrorMessageFormat(e));
        }
      },
    });
  };

  return (
    <LoginForm onSubmit={handleSubmit}>
      <InputGroup>
        <IconWrap>
          <PersonIcon />
        </IconWrap>
        <Input
          type="text"
          id="username"
          placeholder=" "
          required
          value={username}
          onChange={(e) => setUsername(e.target.value.trim())}
        />
        <Label htmlFor="username">아이디를 입력하세요.</Label>
        <Underline />
      </InputGroup>

      <InputGroup>
        <IconWrap>
          <LockIcon />
        </IconWrap>
        <Input
          type="password"
          id="password"
          placeholder=" "
          required
          value={password}
          onChange={(e) => setPassword(e.target.value.trim())}
        />
        <Label htmlFor="password">비밀번호를 입력하세요.</Label>
        <Underline />
      </InputGroup>

      <CheckboxContainer>
        <HiddenCheckbox
          type="checkbox"
          id="rememberMe"
          checked={isRememberMe}
          onChange={(e) => setIsRememberMe(e.target.checked)}
        />
        <StyledCheckbox checked={isRememberMe}>
          {isRememberMe && <CheckTick />}
        </StyledCheckbox>
        <CheckboxLabel htmlFor="rememberMe">로그인 상태 유지</CheckboxLabel>
      </CheckboxContainer>

      <StyleButton
        type="submit"
        variant="contained"
        size="large"
        startIcon={<LoginIcon />}
        disabled={isPending}
      >
        로그인
      </StyleButton>
    </LoginForm>
  );
}
