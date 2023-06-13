import React from "react";
import AdminNavbar from "../../components/admin/AdminNavbar";
import Box from "../../layouts/Box";

const AdminHome = () => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4 m-24">
        <Box
            text='Add Contest'
            link="createContest"
        />
        <Box
            text="View Contests"
            link="viewContest"
        />
      </div>
    </>
  );
};
export default AdminHome;
