import { SidebarIcon } from "../icons/SidebarIcons";
import { HomeIcon } from "../svg/HomeIcon";
import { InstaIcon } from "../svg/InstaIcon";
import { SettingIcon } from "../svg/SettingsIcon";
import { YoutubeIcon } from "../svg/YoutubeIcon";
import { useNavigate } from "react-router-dom";
import { TeamLogo } from "../svg/TeamLogo"; // Imported TeamLogo
import { LinkedInIcon } from "../svg/LinkedInIcon";
import { CustomerSupportIcon } from "../svg/CustomerSupportIcon";

export function Sidebar() {
  const navigate = useNavigate();
  return (
    <div className="relative h-[85%] w-[3.2%] ">
      <div className=" fixed top-20 md:left-6 left-2 h-[85%] md:w-[3.2%] w-[10%] rounded-xl bg-[#00000086] flex flex-col items-center justify-between p-3 max-sm:mt-4">
        <div className="gap-3 flex flex-col">
          <div onClick={() => navigate("/HomePage")}>
            <SidebarIcon icons={<HomeIcon />} />
          </div>
          <div onClick={() => navigate("/TeamLounge")}>
            <SidebarIcon icons={<TeamLogo />} />
          </div>
        </div>

        <div className="gap-3 flex flex-col">
          <a
            href=""
            target="_blank"
            rel="noopener noreferrer">
            <SidebarIcon icons={<YoutubeIcon />} />
          </a>
          <a
            href="https://www.instagram.com/assemble.gui/"
            target="_blank"
            rel="noopener noreferrer">
            <SidebarIcon icons={<InstaIcon />} />
          </a>
          <a
            href="https://www.linkedin.com/company/assemblegui/"
            target="_blank"
            rel="noopener noreferrer">
            <SidebarIcon icons={<LinkedInIcon />} />
          </a>
          <a
            href="https://discord.gg/4ewgHwf73W"
            target="_blank"
            rel="noopener noreferrer">
            <SidebarIcon icons={<CustomerSupportIcon />} />
          </a>
        </div>

        <div onClick={() => navigate("/AccountCenter")}>
          <SidebarIcon icons={<SettingIcon />} />
        </div>
      </div>
    </div>
  );
}
