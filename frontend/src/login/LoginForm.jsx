import { useState } from "react";
import { Link as RouterLink } from "react-router";
import {
  Alert,
  Box,
  Button,
  InputAdornment,
  Link,
  Stack,
  TextField,
} from "@mui/material";
import { useAuth } from "../auth/AuthContext";
import { AuthError } from "../services/errors";
import { LOGIN_CONFIG } from "../config/login";
import { PASSWORD_RESET_PATH } from "../config/navigation";
import { validateEmail, validatePassword } from "./validation";

const TEXT = LOGIN_CONFIG.login;

function LoginForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  function handleChange(setter, field) {
    return (event) => {
      setter(event.target.value);
      setFieldErrors((current) => ({ ...current, [field]: null }));
      setFormError(null);
    };
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const errors = {
      email: validateEmail(email),
      password: validatePassword(password),
    };
    setFieldErrors(errors);
    if (errors.email || errors.password) {
      return;
    }

    setSubmitting(true);
    setFormError(null);
    try {
      await login(email.trim(), password);
    } catch (error) {
      setFormError(
        error instanceof AuthError
          ? error.message
          : LOGIN_CONFIG.errors.unexpected,
      );
      setSubmitting(false);
    }
  }

  return (
    <Box component="form" noValidate onSubmit={handleSubmit}>
      <Stack spacing={2.5}>
        <TextField
          label={TEXT.emailLabel}
          placeholder={TEXT.emailPlaceholder}
          type="email"
          autoComplete="username"
          autoFocus
          fullWidth
          value={email}
          onChange={handleChange(setEmail, "email")}
          error={Boolean(fieldErrors.email)}
          helperText={fieldErrors.email}
          disabled={submitting}
          slotProps={{ htmlInput: { inputMode: "email" } }}
        />
        <TextField
          label={TEXT.passwordLabel}
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          fullWidth
          value={password}
          onChange={handleChange(setPassword, "password")}
          error={Boolean(fieldErrors.password)}
          helperText={fieldErrors.password}
          disabled={submitting}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    size="small"
                    onClick={() => setShowPassword((value) => !value)}
                    aria-pressed={showPassword}
                    disabled={submitting}
                  >
                    {showPassword ? TEXT.hidePassword : TEXT.showPassword}
                  </Button>
                </InputAdornment>
              ),
            },
          }}
        />
        {formError && (
          <Alert severity="error" role="alert">
            {formError}
          </Alert>
        )}
        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          disabled={submitting}
        >
          {submitting ? TEXT.submitting : TEXT.submit}
        </Button>
        <Link
          component={RouterLink}
          to={PASSWORD_RESET_PATH}
          variant="body2"
          sx={{ alignSelf: "center" }}
        >
          {TEXT.forgotPassword}
        </Link>
      </Stack>
    </Box>
  );
}

export default LoginForm;