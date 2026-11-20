import { LOGIN_CONFIG } from "../config/login";
import AuthLayout from "./AuthLayout";
import PasswordResetForm from "./PasswordResetForm";

function PasswordResetPage() {
  return (
    <AuthLayout
      title={LOGIN_CONFIG.reset.title}
      subtitle={LOGIN_CONFIG.reset.subtitle}
    >
      <PasswordResetForm />
    </AuthLayout>
  );
}

export default PasswordResetPage;