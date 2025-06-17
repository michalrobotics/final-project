import { useState } from "react";

import LoginForm from "../components/Auth/LoginForm";
import RecoveryForm from "../components/Auth/RecoveryForm";

const LoginPage = (props) => {
   const [isLog, setIsLog] = useState(true);

   const forgotPasswordHandler = () => {
      setIsLog(false);
   }

   const backToLogHandler = () => {
      setIsLog(true);
   }

   if (!isLog) {
      return <RecoveryForm onBack={backToLogHandler} />
   }

   return <LoginForm onForgot={forgotPasswordHandler} />;
}

export default LoginPage;
