import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { collapseUpdate } from "../../../Redux/Slices/StudentLayoutSlice";
import Sidebar from "../../Common/Layout/Sidebar";
import Header from "../../Common/Layout/Header";
import { studentElements } from "./Elements";

function StudentLayout() {
  let { collapse, heading, subheading } = useSelector((state) => state.student);
  let dispatch = useDispatch();

  const collapseFun = () => {
    dispatch(collapseUpdate());
  };

  return (
    <div id="StudentLayout" className="flex flex-row">
      <Sidebar Elements={studentElements} collapse={collapse} collapseFun={collapseFun} role="student" />

      <main className={collapse ? "w-11/13 absolute right-0" : " w-19/20 absolute right-0"}>
        <Header heading={heading} subheading={subheading} role="student" />
        <div className="p-4 relative top-16">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default StudentLayout;
