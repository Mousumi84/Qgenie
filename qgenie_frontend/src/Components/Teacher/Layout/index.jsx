import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { collapseUpdate } from "../../../Redux/Slices/TeacherLayoutSlice";
import Sidebar from "../../Common/Layout/Sidebar";
import Header from "../../Common/Layout/Header";
import { teacherElements } from "./Elements";

function TeacherLayout() {
  let { collapse, heading, subheading } = useSelector((state) => state.teacher);
  let dispatch = useDispatch();

  const collapsefun = () => {
    dispatch(collapseUpdate());
  };

  return (
    <div id="TeacherLayout" className="flex flex-row">
      <Sidebar
        Elements={teacherElements}
        collapse={collapse}
        collapsefun={collapsefun}
        role="teacher"
      />

      <main className={collapse ? " w-11/13" : " w-19/20"}>
        <Header heading={heading} subheading={subheading} role="teacher" />
        <div className="p-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default TeacherLayout;
