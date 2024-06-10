import { DashboardOutlined, FileProtectOutlined, FileSyncOutlined, FileTextOutlined, MessageOutlined, ScheduleOutlined, UsergroupAddOutlined } from "@ant-design/icons";

import DashboardPage from "../pages/private/dashboard";
import PortfoliosPage from "../pages/private/portfolios";
import SkillsPage from "../pages/private/skills";
import UsersPage from "../pages/private/users";
import { useSelector } from "react-redux";
import ExperiencePage from "../pages/private/experiences";
import EducationPage from "../pages/private/education";
import MessagesPage from "../pages/private/messages";

const useRolePages = () => {
  const { user } = useSelector((state) => state.auth);
  const clientPages = [
    {
      url: "dashboard",
      page: DashboardPage,
      name: "Dashboard",
      icon: DashboardOutlined ,
      isMenuVisible: true,
    },
    {
      url: "private/portfolios",
      page: PortfoliosPage,
      name: "Portfolios",
      icon: FileSyncOutlined,
      isMenuVisible: true,
    },
    {
      url: "private/skills",
      page: SkillsPage,
      name: "Skills",
      icon: FileProtectOutlined,
      isMenuVisible: true,
    },
    {
      url: "private/experiences",
      page: ExperiencePage,
      name: "Experiences",
      icon: FileTextOutlined,
      isMenuVisible: true,
    },
    {
      url: "private/education",
      page: EducationPage,
      name: "Education",
      icon: ScheduleOutlined,
      isMenuVisible: true,
    },
    {
        url: "private/messages",
        page: MessagesPage,
        name: "Messages",
        icon: MessageOutlined,
        isMenuVisible: true,
      },
  ];

  const adminPages = clientPages.concat({

        url: "private/users",
        page: UsersPage,
        name: "Users",
        icon: UsergroupAddOutlined,
        isMenuVisible: true,
  })


  return user?.role === "admin" ? adminPages  : clientPages
};

export default useRolePages;
