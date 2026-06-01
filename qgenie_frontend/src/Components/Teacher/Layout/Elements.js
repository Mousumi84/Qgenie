import { RxDashboard } from "react-icons/rx"; 
import { TbTemplate } from "react-icons/tb";
import { MdOutlineAssessment } from "react-icons/md";
import { VscTasklist } from "react-icons/vsc";

export const teacherElements = [
    {
        to: "/teacher/dashboard",
        heading: "Dashboard",
        icons: RxDashboard,
    },
    {
        to: "/teacher/templates",
        heading: "Templates",
        icons: TbTemplate,
    },
    {
        to: "/teacher/assessments",
        heading: "Assessments",
        icons: MdOutlineAssessment,
    },
    {
        to: "/teacher/submissions",
        heading: "Submissions",
        icons: VscTasklist,
    }
];