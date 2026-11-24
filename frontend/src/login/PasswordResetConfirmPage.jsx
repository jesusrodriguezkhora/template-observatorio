import { useSearchParams } from "react-router";
import { LOGIN_CONFIG } from "../config/login";
import AuthLayout from "./AuthLayout";
import PasswordResetConfirmForm from "./PasswordResetConfirmForm";

function PasswordResetConfirmPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  return (
    <AuthLayout
      title={LOGIN_CONFIG.confirm.title}
      subtitle={LOGIN_CONFIG.confirm.subtitle}
    >
      <PasswordResetConfirmForm key={token} token={token} />
    </AuthLayout>
  );
}

export default PasswordResetConfirmPage;