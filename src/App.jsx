import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Main Components
import Header from "./components/Header";
import Footer from "./components/Footer";

// Pages & UI
import Body from "./components/Body";
import Peepee from "./components/Peepee";
import CreateAnewAccount from "./components/CreateAnewAccount";
import EmailVerification from "./components/EmailVerification";
import Login from "./components/Login";
import PassRecovery from "./components/PassRecovery";
import IdentityVerify from "./components/IdentityVerify";
import ChangePass from "./components/ChangePass";
import UsernameRecovery from "./components/UsernameRecovery";
import UsernameSent from "./components/UsernameSent";
import DashBoard from "./components/DashBoard";
import AccountCenter from "./components/AccountCenter";
import NavConsole from "./components/ui/nav/NavConsole";
import GamerTag from "./components/GamerTag";
import Password from "./components/Password";
import { NoticeCard } from "./components/homepage/NoticeCard";
import UsernameOTP from "./components/UsernameOTP";
import HeaderPR from "./components/HeaderPR";
import Sample from "./components/Sample";
import BgmiPage from "./pages/BgmiPage";
import { Hero } from "./components/bgmipage/Hero";
import NightHunter from "./pages/NightHunter";
import ProfileMenu from "./components/overlays/ProfileMenu";
import GamingProfile from "./components/GamingProfile";
import Personalinfo from "./components/PersonalInfoPage/Personalinfo";

// Login & Register (User)
import AssembleLogin from "./components/loginAndregister/AssembleLogin";
import LoginViaPhone from "./components/loginAndregister/LoginViaPhone";
import LoginViaPhoneOTP from "./components/loginAndregister/LoginViaPhoneOTP";
import LoginViaEmail from "./components/loginAndregister/LoginViaEmail";
import LoginViaEmailOTP from "./components/loginAndregister/LoginViaEmailOTP";
import RegisterViaEmail from "./components/loginAndregister/RegisterViaEmail";
import RegisterViaEmailOTP from "./components/loginAndregister/RegisterViaEmailOPT";
import RegisterUsername from "./components/loginAndregister/RegisterUsername";
import ProfilePicture from "./components/loginAndregister/ProfilePicture";
import ProfileSetPicture from "./components/loginAndregister/ProfileSetPicture";
import PasswordSetup from "./components/loginAndregister/PasswordSetup";
import CustomizeCard from "./components/loginAndregister/CustomizeCard";
import RegisterViaPhone from "./components/loginAndregister/RegisterViaPhone";
import RegisterViaPhoneOTP from "./components/loginAndregister/RegisterViaPhoneOTP";
import PersonalInfoCard from "./components/cards/PersonalInfoCard";
import GamingInfoCard from "./components/cards/GamingInfoCard";
import EducationInfoCard from "./components/cards/EducationInfoCard";
import GameCard from "./components/cards/GameCard";
// Organizer Login & Register
import OrganizerRegisterViaEmail from "./components/orgLoginAndregister/OrganizerRegisterViaEmail";
import OrganizerRegisterViaEmailOTP from "./components/orgLoginAndregister/OrganizerRegisterViaEmailOTP";
import OrganizerRegisterViaPhone from "./components/orgLoginAndregister/OrganizerRegisterViaPhone";
import OrganizerRegisterViaPhoneOTP from "./components/orgLoginAndregister/OrganizerRegisterViaPhoneOTP";
import OrganizerName from "./components/orgLoginAndregister/OrganizerName";
import OrganizerPasswordSetup from "./components/orgLoginAndregister/OrganizerPasswordSetup";
import OrganizerLoginViaPhone from "./components/orgLoginAndregister/OrganizerLoginViaPhone";
import OrganizerLoginViaPhoneOTP from "./components/orgLoginAndregister/OrganizerLoginViaPhoneOTP";
import OrganizerLoginViaEmail from "./components/orgLoginAndregister/OrganizerLoginViaEmail";
import OrganizerLoginViaSign from "./components/orgLoginAndregister/OrganizerLoginViaSign";
import OrganizerLoginViaSignOTP from "./components/orgLoginAndregister/OrganizerLoginViaSignOTP";
import OrganizerPersonalInfo from "./components/orgLoginAndregister/OrganizerPersonalInfo";

// Forgot Credentials
import UsernameRecoveryViaPhone from "./components/ForgotCredential/UsernameRecoveryViaPhone";
import RecoveryViaPhoneOTP from "./components/ForgotCredential/RecoveryViaPhoneOTP";
import ChangePasswordViaPhone from "./components/ForgotCredential/ChangePasswordViaPhone";
import SucChangePasswordViaPhone from "./components/ForgotCredential/SucChangePasswordViaPhone";
import UsernameRecoveryViaEmail from "./components/ForgotCredential/UsernameRecoveryViaEmail";
import RecoveryViaEmailOTP from "./components/ForgotCredential/RecoveryViaEmailOTP";
import ChangePasswordViaEmail from "./components/ForgotCredential/ChangePasswordViaEmail";
import SucChangePasswordViaEmail from "./components/ForgotCredential/SucChangePasswordViaEmail";
import HomePage from "./components/homepage/Home/HomePage";
// Payment
import TestPayment from "./components/TestPayment";
import { ForgotPassword } from "./prvp/forgotPassword";
import TeamLounge from "./components/homepage/Home/TeamLounge";
import { useSelector } from "react-redux";
import TournamentDetails from "./components/homepage/Home/TournamentDetails";

const App = () => {
  const [token, setToken] = useState(null);
  const login = useSelector((state) => state?.auth?.isLogin)

  useEffect(() => {
    const interval = setInterval(() => {
      const rawToken = localStorage.getItem("accessToken");
      const safeToken =
        rawToken && rawToken !== "undefined" && rawToken !== "null" ? rawToken : null;
      setToken(safeToken);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="overflow-hidden no-scrollbar">
      <Routes>
        <Route
          path="/"
          element={token ? <Navigate to="/HomePage" /> : <AssembleLogin />}
        />
        <Route
          path="/HomePage"
          element={token ? <HomePage /> : <Navigate to="/" />}
        />
        <Route
          path="/TournamentDetails"
          element={token ? <TournamentDetails /> : <Navigate to="/" />}
        />
        <Route path="/LoginViaPhone" element={<LoginViaPhone />} />
        <Route path="/LoginViaPhoneOTP" element={<LoginViaPhoneOTP />} />
        <Route path="/LoginViaEmail" element={<LoginViaEmail />} />
        <Route path="/LoginViaEmailOTP" element={<LoginViaEmailOTP />} />
        <Route path="/RegisterViaEmail" element={<RegisterViaEmail />} />
        <Route path="/RegisterViaEmailOTP" element={<RegisterViaEmailOTP />} />
        <Route path="/RegisterUsername" element={<RegisterUsername />} />
        <Route path="/ProfilePicture" element={<ProfilePicture />} />
        <Route path="/Personalinfo" element={<Personalinfo />} />
        <Route path="/ProfileSetPicture" element={<ProfileSetPicture />} />
        <Route path="/PasswordSetup" element={<PasswordSetup />} />
        <Route path="/CustomizeCard" element={<CustomizeCard />} />
        <Route path="/PersonalInfoCard" element={<PersonalInfoCard />} />
        <Route path="/GamingInfoCard" element={<GamingInfoCard />} />
        <Route path="/EducationInfoCard" element={<EducationInfoCard />} />
        <Route path="/GameCard" element={<GameCard />} />
        <Route path="/RegisterViaPhone" element={<RegisterViaPhone />} />
        <Route path="/RegisterViaPhoneOTP" element={<RegisterViaPhoneOTP />} />


        <Route path="/TeamLounge" element={<TeamLounge />} />

        {/* Organizer Routes */}
        <Route
          path="/OrganizerLoginViaEmail"
          element={<OrganizerLoginViaEmail />}
        />
        <Route
          path="/OrganizerLoginViaPhone"
          element={<OrganizerLoginViaPhone />}
        />
        <Route
          path="/OrganizerLoginViaPhoneOTP"
          element={<OrganizerLoginViaPhoneOTP />}
        />
        <Route
          path="/OrganizerLoginViaSign"
          element={<OrganizerLoginViaSign />}
        />
        <Route
          path="/OrganizerLoginViaSignOTP"
          element={<OrganizerLoginViaSignOTP />}
        />
        <Route
          path="/OrganizerRegisterViaEmail"
          element={<OrganizerRegisterViaEmail />}
        />
        <Route
          path="/OrganizerRegisterViaEmailOTP"
          element={<OrganizerRegisterViaEmailOTP />}
        />
        <Route
          path="/OrganizerRegisterViaPhone"
          element={<OrganizerRegisterViaPhone />}
        />
        <Route
          path="/OrganizerRegisterViaPhoneOTP"
          element={<OrganizerRegisterViaPhoneOTP />}
        />
        <Route path="/OrganizerName" element={<OrganizerName />} />
        <Route
          path="/OrganizerPasswordSetup"
          element={<OrganizerPasswordSetup />}
        />
        <Route
          path="/OrganizerPersonalInfo"
          element={<OrganizerPersonalInfo />}
        />

        {/* Forgot Credentials */}
        <Route
          path="/forgotpasswordviaphone"
          element={<ForgotPassword />}
        />
        <Route path="/RecoveryViaPhoneOTP" element={<RecoveryViaPhoneOTP />} />
        <Route
          path="/ChangePasswordViaPhone"
          element={<ChangePasswordViaPhone />}
        />
        <Route
          path="/SucChangePasswordViaPhone"
          element={<SucChangePasswordViaPhone />}
        />
        <Route
          path="/UsernameRecoveryViaEmail"
          element={<UsernameRecoveryViaEmail />}
        />
        <Route path="/RecoveryViaEmailOTP"
          element={<RecoveryViaEmailOTP />} />
        <Route
          path="/ChangePasswordViaEmail"
          element={<ChangePasswordViaEmail />}
        />
        <Route
          path="/SucChangePasswordViaEmail"
          element={<SucChangePasswordViaEmail />}
        />
        {/* Account Center */}
        <Route path="/AccountCenter"
          element={<AccountCenter />} />
        {/* Payment */}
        <Route path="/payment"
          element={<TestPayment />} />
      </Routes>
    </div>
  );
};

export default App;