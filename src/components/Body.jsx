
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login";
import AssembleLogin from "./loginAndregister/AssembleLogin";
import LoginViaPhone from "./loginAndregister/LoginViaPhone";
import LoginViaPhoneOTP from "./loginAndregister/LoginViaPhoneOTP";
import LoginViaEmail from "./loginAndregister/LoginViaEmail";
import LoginViaEmailOTP from "./loginAndregister/LoginViaEmailOTP";
import RegisterViaEmail from "./loginAndregister/RegisterViaEmail";
import RegisterViaEmailOTP from "./loginAndregister/RegisterViaEmailOPT"
import RegisterViaPhone from "./loginAndregister/RegisterViaPhone";
import RegisterViaPhoneOTP from "./loginAndregister/RegisterViaPhoneOTP";
import RegisterUsername from "./loginAndregister/RegisterUsername";
import ProfilePicture from "./loginAndregister/ProfilePicture";
import ProfileSetPicture from "./loginAndregister/ProfileSetPicture";
import PasswordSetup from "./loginAndregister/PasswordSetup";
import CustomizeCard from "./loginAndregister/CustomizeCard";
import ContactUs from "./ContactUs";
import Browse from "./Browse";
import Peepee from "./Peepee";
import TC from "./TC";
import CreateAnewAccount from "./CreateAnewAccount";
import EmailVerification from "./EmailVerification";
import GamerTag from "./GamerTag";
import Password from "./Password";
import PassRecovery from "./PassRecovery";
import MobilePassRecovery from "./MobilePassRecovery";
import UsernameRecovery from "./UsernameRecovery";
import MobileUserRecovery from "./MobileUserRecovery";
import IdentityVerify from "./IdentityVerify";
import MobileIdentityPass from "./MobileIdentityPass";
import MobileIdentityUser from "./MobileIdentityUser";
import ChangePass from "./ChangePass";
import ChangePassPhone from "./ChangePassPhone";
import UsernameOTP from "./UsernameOTP";
import UsernameSent from "./UsernameSent";
import UsernameSentPhone from "./UsernameSentPhone";
import Homepage from "./homepage/Home/Homepage";
import BgmiPage from "../pages/BgmiPage";
import Hero from "./homepage/Hero";
import NightHunter from "../pages/NightHunter";
import DashBoard from "./DashBoard";
import GamingProfile from "./GamingProfile";
import AccountCenter from "./AccountCenter";
import Personalinfo from "./PersonalInfoPage/Personalinfo";
// import RegisterViaEmail from "./loginAndregister/RegisterViaEmail";
const Body = () => {
    const approuter = createBrowserRouter([
        // { path: "/", element: <Login /> },
        // { path: "/", element: <OrganizerLoginViaEmail /> },
        // { path: "/OrganizerLoginViaPhone", element: <OrganizerLoginViaPhone /> },
        // { path: "/OrganizerLoginViaPhoneOTP", element: <OrganizerLoginViaPhoneOTP /> },
        // { path: "/OrganizerLoginViaSign", element: < OrganizerLoginViaSign/> },
        // { path: "/OrganizerLoginViaSignOTP", element: < OrganizerLoginViaSignOTP/> },
        { path: "/", element: <AssembleLogin /> },
        { path: "/LoginViaPhone", element: <LoginViaPhone /> },
        { path: "/LoginViaPhoneOTP", element: <LoginViaPhoneOTP /> },
        { path: "/LoginViaEmail", element: <LoginViaEmail /> },
        { path: "/LoginViaEmailOTP", element: <LoginViaEmailOTP /> },
        { path: "/AssembleLogin", element: <AssembleLogin /> },
        { path: "/RegisterViaEmail", element: <RegisterViaEmail /> },
        { path: "/RegisterViaEmailOTP", element: <RegisterViaEmailOTP /> },
        { path: "/RegisterViaPhone", element: <RegisterViaPhone /> },
        { path: "/RegisterViaPhoneOTP", element: <RegisterViaPhoneOTP /> },
        { path: "/RegisterUsername", element: <RegisterUsername /> },
        { path: "/ProfilePicture", element: <ProfilePicture /> },
        { path: "/ProfileSetPicture", element: <ProfileSetPicture /> },
        { path: "/PasswordSetup", element: <PasswordSetup /> },
        { path: "/CustomizeCard", element: <CustomizeCard /> },
        { path: "/browse", element: <Homepage /> },
        { path: "/Peepee", element: <Peepee /> },
        { path: "/Terms", element: <TC /> },
        { path: "/ContactUs", element: <ContactUs /> },
        { path: "/Register", element: <CreateAnewAccount /> },
        { path: "/EmailVerification", element: <EmailVerification /> },
        { path: "/GamerTag", element: <GamerTag /> },
        { path: "/Password", element: <Password /> },
        { path: "/PassRecovery", element: <PassRecovery /> },
        { path: "/MobilePassRecovery", element: <MobilePassRecovery /> },
        { path: "/identity-verify", element: <IdentityVerify /> },
        { path: "/MobileIdentityPass", element: <MobileIdentityPass /> },
        { path: "/MobileIdentityUser", element: <MobileIdentityUser /> },
        { path: "/ChangePass", element: <ChangePass /> },
        { path: "/ChangePassPhone", element: <ChangePassPhone /> },
        { path: "/bgmipage", element: <BgmiPage /> },
        { path: "/nighthunter", element: <NightHunter /> },
        { path: "/dashbord", element: <DashBoard /> },
        { path: "/GamingProfile", element: <GamingProfile /> },
        { path: "/AccountCenter", element: <AccountCenter /> }, // Added comma here
        // {path : "/hero" , element:<Hero/>}
        { path: "/UsernameOTP", element: <UsernameOTP /> },
        { path: "/UsernameSent", element: <UsernameSent /> },
        { path: "/UsernameSentPhone", element: <UsernameSentPhone /> },
        { path: "/UsernameRecovery", element: <UsernameRecovery /> },
        { path: "/MobileUserRecovery", element: <MobileUserRecovery /> },
        { path: "PersonalInfoPage", element: <Personalinfo /> },
    ]);

    return (
        <div>
            <RouterProvider router={approuter} />
        </div>
    );
};

export default Body;
