import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { collapseUpdate } from "../../../Redux/Slices/StudentLayoutSlice";
import Sidebar from "../../Common/Layout/Sidebar";
import Header from "../../Common/Layout/Header";
import { studentElements } from "./Elements";

function StudentLayout() {
  let { collapse, heading, subheading } = useSelector((state) => state.student);
  let dispatch = useDispatch();

  const collapsefun = () => {
    dispatch(collapseUpdate());
  };

  return (
    <div id="StudentLayout" className="flex flex-row">
      <Sidebar
        Elements={studentElements}
        collapse={collapse}
        collapsefun={collapsefun}
        role="student"
      />

      <main className={collapse ? "w-11/13" : " w-19/20"}>
        <Header heading={heading} subheading={subheading} role="student" />
        <div className="p-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default StudentLayout;
