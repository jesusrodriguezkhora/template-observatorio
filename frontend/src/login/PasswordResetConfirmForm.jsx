import { useRef, useState } from "react";
import { Link as RouterLink } from "react-router";
import { Alert, Box, Button, Link, Stack } from "@mui/material";
import { confirmPasswordReset } from "../services/authService";
import { ResetLinkError } from "../services/errors";
import { LOGIN_CONFIG } from "../config/login";
import { LOGIN_PATH, PASSWORD_RESET_PATH } from "../config/navigation";
import PasswordField from "./PasswordField";
import { validateNewPassword, validatePasswordRepeat } from "./validation";

const TEXT = LOGIN_CONFIG.confirm;
const ERRORS = LOGIN_CONFIG.errors;

function BackLink({ to, children }) {
  return (
    <Link
      component={RouterLink}
      to={to}
      variant="body2"
      sx={{ alignSelf: "center" }}
    >
      {children}
    </Link>
  );
}

function InvalidLink() {
  return (
    <Stack spacing={2.5}>
      <Alert severity="error" role="alert">
        {ERRORS.linkInvalid}
      </Alert>
      <Button
        component={RouterLink}
        to={PASSWORD_RESET_PATH}
        variant="contained"
        size="large"
        fullWidth
      >
        {TEXT.requestNewLink}
      </Button>
    </Stack>
  );
}

function PasswordResetConfirmForm({ token }) {
  const [password, setPassword] = useState("");
  const [repeat, setRepeat] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(token ? "form" : "invalid");
  const passwordRef = useRef(null);
  const repeatRef = useRef(null);

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
      password: validateNewPassword(password),
      repeat: validatePasswordRepeat(password, repeat),
    };
    setFieldErrors(errors);
    if (errors.password) {
      passwordRef.current.focus();
      return;
    }
    if (errors.repeat) {
      repeatRef.current.focus();
      return;
    }

    setSubmitting(true);
    try {
      await confirmPasswordReset(token, password);
      setStatus("done");
    } catch (error) {
      if (error instanceof ResetLinkError) {
        setStatus("invalid");
      } else {
        setFormError(ERRORS.confirmUnexpected);
      }
    } finally {
      setSubmitting(false);
    }
  }

  if (status === "invalid") {
    return <InvalidLink />;
  }

  if (status === "done") {
    return (
      <Stack spacing={2.5}>
        <Alert severity="success" role="status">
          {TEXT.success}
        </Alert>
        <Button
          component={RouterLink}
          to={LOGIN_PATH}
          variant="contained"
          size="large"
          fullWidth
        >
          {TEXT.goToLogin}
        </Button>
      </Stack>
    );
  }

  return (
    <Box component="form" noValidate onSubmit={handleSubmit}>
      <Stack spacing={2.5}>
        <PasswordField
          label={TEXT.passwordLabel}
          autoComplete="new-password"
          autoFocus
          inputRef={passwordRef}
          value={password}
          onChange={handleChange(setPassword, "password")}
          error={fieldErrors.password}
          disabled={submitting}
        />
        <PasswordField
          label={TEXT.repeatLabel}
          autoComplete="new-password"
          inputRef={repeatRef}
          value={repeat}
          onChange={handleChange(setRepeat, "repeat")}
          error={fieldErrors.repeat}
          disabled={submitting}
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
        <BackLink to={LOGIN_PATH}>{LOGIN_CONFIG.reset.backToLogin}</BackLink>
      </Stack>
    </Box>
  );
}

export default PasswordResetConfirmForm;