import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllEvents } from "../store/actions/event";
import { useLocation } from "react-router-dom";

export default function Teacher() {
  const [openModal, setOpenModal] = useState(false);
  const events=useSelector(state=>state.events.events)
  const { user}=useSelector(state=>state.user)
  const updatedEvents=events?.filter(event=>event.userId===user.name )
  const path=useLocation()

  useEffect(()=>{
    getAllEvents()
  },[path.pathname])
 
  const body = (
    <div>
      <h5 className="text-center mb-4 mt-4">
        Do you want to mark this task as done?
      </h5>

      <div className="d-flex gap-4">
        <button className="primary-button">Done</button>
        <button
          className="secondary-button"
          onClick={() => setOpenModal(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
  return (
    <div className="container mt-4">
      <div>
        <h5>Due Classes</h5>
        {user.role==='admin'&& events?.map((item, i) => (
          <div
            key={item.id}
            className="class-container"
            onClick={() => setOpenModal(true)}
          >
            <div>
              <div className="class-index">{i + 1}</div>
              <div className="subject-container">
                <p>{item.subject}</p>
                <p>By {item.teacher}</p>
              </div>
            </div>
          </div>
        ))}
        {
          user.role==='teacher'&& updatedEvents?.map((item, i) => (
            <div
              key={item.id}
              className="class-container"
              onClick={() => setOpenModal(true)}
            >
              <div>
                <div className="class-index">{i + 1}</div>
                <div className="subject-container">
                  <p> {item.subject}</p>
                  <p>By {item.teacher}</p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
      {/* <ReactModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        body={body}
      /> */}
    </div>
  );
}
