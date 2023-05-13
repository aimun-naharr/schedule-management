import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactDataTable from "../components/ReactDataTable";
import { getAllUsers } from "../store/actions";


export default function Admin() {
  const [openModal, setOpenModal] = useState();
  const { allUsers, loading } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  return (
    <div className="container mt-4 mb-4  ">
      <ReactDataTable allUsers={allUsers} />
    </div>
  );
}
