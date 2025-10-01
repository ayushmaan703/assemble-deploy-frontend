import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProfileIcon } from "../icons/ProfileIcon";
import Logo from "../svg/Logo";
import { NavBell } from "../svg/NavBell";
import { NavPayment } from "../svg/NavPayment";
import NavConsole from "./NavConsole";
import NavBellMenu from "../../overlays/NavbellMenu";
import NavPaymentMenu from "../../overlays/NavPaymentMenu";
import ProfileMenu from "../../overlays/ProfileMenu";
import { ChevronLeft, Menu } from "lucide-react";
import { useSelector } from "react-redux";

const UpperNav = (props) => {
  const [openMenu, setOpenMenu] = useState(null);
  const user = useSelector((state) => state.auth.userData);
  const handleMenuToggle = (menuType) => {
    setOpenMenu((prev) => (prev === menuType ? null : menuType));
  };

  // This function closes any open sub-menu.
  const closeAllMenus = () => setOpenMenu(null);

  return (
    <div className="relative w-full">
      {/* ================= DESKTOP NAV ================= */}
      <div className="hidden md:flex w-full p-4 top-0 h-[10vh] fixed justify-between z-10">
        <div className="w-[12%]">
          <Logo />
        </div>

        <div className="relative w-[30%] z-10">
          <NavConsole name={props.name} />
        </div>

        <div className="w-[14%] flex  justify-between items-center z-10 relative">
          {/* Back Button */}
          <div onClick={() => window.history.back()} className="cursor-pointer">
            {!(props.name === "Home") && <ChevronLeft size={30} className="text-white" />}
          </div>

          {/* Payment */}
          <div
            // onClick={() => handleMenuToggle("payment")}
            className="cursor-pointer relative"
          >
            <NavPayment className="bg-black" />
          </div>
          <AnimatePresence>
            {openMenu === "payment" && (
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 50, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute top-12 right-0 bg-white shadow-lg z-20 rounded-2xl"
              >
                <NavPaymentMenu />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bell */}
          <div
            // onClick={() => handleMenuToggle("bell")}
            className="cursor-pointer relative"
          >
            <NavBell className="bg-black" />
          </div>
          <AnimatePresence>
            {openMenu === "bell" && (
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 50, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute top-12 right-0 bg-white shadow-lg z-20 rounded-2xl"
              >
                <NavBellMenu />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Profile */}
          <div
            onClick={() => handleMenuToggle("profile")}
            className="cursor-pointer relative"
          >
            <ProfileIcon img={user.avatarUrl} />
          </div>
          <AnimatePresence>
            {openMenu === "profile" && (
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 50, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute top-12 right-0 bg-white shadow-lg z-20 rounded-2xl"
              >
                <ProfileMenu />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ================= MOBILE NAV ================= */}
      <div className="flex md:hidden w-full p-4 top-0 h-[9vh] fixed justify-between items-center z-20 bg-black">
        {/* Left: Back Button */}
        <div onClick={() => window.history.back()} className="cursor-pointer">
          {!(props.name === "Home") && <ChevronLeft size={28} className="text-white" />}
        </div>

        {/* Center: Logo */}
        <div className="flex justify-center w-[40%]">
          <Logo />
        </div>

        {/* Right: Hamburger Menu */}
        <div
          onClick={() => handleMenuToggle("mobileMenu")}
          className="cursor-pointer"
        >
          <Menu size={28} className="text-white" />
        </div>

        {/* Mobile dropdown menu */}
        <AnimatePresence>
          {openMenu === "mobileMenu" && (
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute top-16 right-4 flex w-56 flex-col rounded-2xl border border-zinc-700 bg-zinc-800/90 p-2 text-white shadow-2xl backdrop-blur-md z-30"
            >
              <button
                onClick={() => handleMenuToggle("profile")}
                className="flex w-full items-center gap-3 rounded-lg p-3 text-left text-sm font-medium transition-colors hover:bg-zinc-700"
              >
                <ProfileIcon img={user.avatarUrl} /> <span>Profile</span>
              </button>

              <hr className="my-1 border-zinc-700" />

              <button
                // onClick={() => handleMenuToggle("bell")}
                className="flex w-full items-center gap-3 rounded-lg p-3 text-left text-sm font-medium transition-colors hover:bg-zinc-700"
              >
                <NavBell /> <span>Notifications</span>
              </button>

              <hr className="my-1 border-zinc-700" />

              <button
                // onClick={() => handleMenuToggle("payment")}  
                className="flex w-full items-center gap-3 rounded-lg p-3 text-left text-sm font-medium transition-colors hover:bg-zinc-700"
              >
                <NavPayment /> <span>Payments</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ================= MOBILE OVERLAY MENUS ================= */}
      <AnimatePresence>
        {(openMenu === "payment" ||
          openMenu === "bell" ||
          openMenu === "profile") && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeAllMenus}
              className="md:hidden fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4"
            >
              <div onClick={(e) => e.stopPropagation()}>
                {openMenu === "payment" && <NavPaymentMenu />}
                {openMenu === "bell" && <NavBellMenu />}
                {openMenu === "profile" && <ProfileMenu />}
              </div>
            </motion.div>
          )}
      </AnimatePresence>
    </div>
  );
};

export default UpperNav;
