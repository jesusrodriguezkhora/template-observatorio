import { LOGIN_CONFIG } from "../config/login";
import AuthLayout from "./AuthLayout";
import LoginForm from "./LoginForm";

function LoginPage() {
  return (
    <AuthLayout
      title={LOGIN_CONFIG.login.title}
      subtitle={LOGIN_CONFIG.login.subtitle}
    >
      <LoginForm />
    </AuthLayout>
  );
}

export default LoginPage;