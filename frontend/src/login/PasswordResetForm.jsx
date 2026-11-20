import { useRef, useState } from "react";
import { Link as RouterLink } from "react-router";
import { Alert, Box, Button, Link, Stack, TextField } from "@mui/material";
import { requestPasswordReset } from "../services/authService";
import { LOGIN_CONFIG } from "../config/login";
import { LOGIN_PATH } from "../config/navigation";
import { validateEmail } from "./validation";

const TEXT = LOGIN_CONFIG.reset;
const FIELD = LOGIN_CONFIG.login;

function BackToLogin() {
  return (
    <Link
      component={RouterLink}
      to={LOGIN_PATH}
      variant="body2"
      sx={{ alignSelf: "center" }}
    >
      {TEXT.backToLogin}
    </Link>
  );
}

function PasswordResetForm() {
  const [email, setEmail] = useState("");
  const [fieldError, setFieldError] = useState(null);
  const [formError, setFormError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const emailRef = useRef(null);

  function handleChange(event) {
    setEmail(event.target.value);
    setFieldError(null);
    setFormError(null);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const error = validateEmail(email);
    setFieldError(error);
    if (error) {
      emailRef.current.focus();
      return;
    }

    setSubmitting(true);
    setFormError(null);
    try {
      await requestPasswordReset(email.trim());
      setSent(true);
    } catch {
      setFormError(LOGIN_CONFIG.errors.resetUnexpected);
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <Stack spacing={2.5}>
        <Alert severity="success" role="status">
          {TEXT.success}
        </Alert>
        <BackToLogin />
      </Stack>
    );
  }

  return (
    <Box component="form" noValidate onSubmit={handleSubmit}>
      <Stack spacing={2.5}>
        <TextField
          label={FIELD.emailLabel}
          placeholder={FIELD.emailPlaceholder}
          type="email"
          autoComplete="email"
          autoFocus
          fullWidth
          inputRef={emailRef}
          value={email}
          onChange={handleChange}
          error={Boolean(fieldError)}
          helperText={fieldError}
          disabled={submitting}
          slotProps={{ htmlInput: { inputMode: "email" } }}
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
        <BackToLogin />
      </Stack>
    </Box>
  );
}

export default PasswordResetForm;