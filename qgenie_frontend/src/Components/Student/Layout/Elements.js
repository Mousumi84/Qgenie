import { RxDashboard } from "react-icons/rx"; 
import { TbTemplate } from "react-icons/tb";
import { MdOutlineAssessment } from "react-icons/md";
import { VscTasklist } from "react-icons/vsc";

export const studentElements = [
    {
        to: "/student/dashboard",
        heading: "Dashboard",
        icons: RxDashboard,
    },
    {
        to: "/student/assessments",
        heading: "Assessments",
        icons: MdOutlineAssessment,
    },
    {
        to: "/student/submissions",
        heading: "Submissions",
        icons: VscTasklist,
    }
];