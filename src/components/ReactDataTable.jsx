import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { Badge } from "reactstrap";
import { BiUserPlus } from "react-icons/bi";
import Drawer from "./drawers/Drawer";
import AddUserDrawer from "./drawers/AddUserDrawer";
import DeleteUserModal from "./modals/DeleteUserModal";
import EditUserDrawer from "./drawers/EditUserDrawer";

export default function ReactDataTable(props) {
  const { allUsers } = props;
  const [openAddUserDrawer, setOpenAddUserDrawer] = useState(false);
  const [openDeleteModal, setopenDeleteModal] = useState(false);
  const [openEditUserDrawer, setopenEditUserDrawer] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const handleDeleteModal = (user) => {
    setopenDeleteModal(true);
    setCurrentUser(user);
  };
  const handleEditModal = (user) => {
    setopenEditUserDrawer(true);
    setCurrentUser(user);
  };
  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Role",
      selector: (row) => row.role,
    },

    {
      name: "Status",
      selector: (row) => row.isActive,
      cell: (row) => (
        <div>
          <Badge color={`${row.isActive ? "success" : "secondary"}`}>
            {row.isActive ? "active" : "inactive"}
          </Badge>
        </div>
      ),
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="d-flex gap-2">
          <button
            className="small-btn edit"
            onClick={() => handleEditModal(row)}
          >
            {" "}
            Edit
          </button>
          <button
            className="small-btn delete"
            onClick={() => handleDeleteModal(row)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="table-container">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h5 className="mb-4 ">Manage Users</h5>
        <button
          className="add-user-btn"
          onClick={() => setOpenAddUserDrawer(true)}
        >
          Add user <BiUserPlus />
        </button>
      </div>
      <DataTable dense columns={columns} data={allUsers} />
      <AddUserDrawer
        openAddUserDrawer={openAddUserDrawer}
        setOpenAddUserDrawer={setOpenAddUserDrawer}
      />
      <DeleteUserModal
        isOpen={openDeleteModal}
        setIsOpen={setopenDeleteModal}
        currentUser={currentUser}
      />
      <EditUserDrawer
        openEditUserDrawer={openEditUserDrawer}
        setOpenEditUserDrawer={setopenEditUserDrawer}
        currentUser={currentUser}
      />
    </div>
  );
}
