import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useEffect, useRef, useState } from "react";
import moment from "moment/moment";
import { Input, Label } from "reactstrap";
import DropDownContainer from "../components/DropDownContainer";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../store/actions";
import {
  createNewEvent,
  getAllEvents,
  updateEvent,
} from "../store/actions/event";
import ReactModal from "../components/modals/ReactModal";

export default function ReactCalender() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [openCalenderModal, setOpenCalenderModal] = useState(false);
  const [openCurrentEventModal, setOpenCurrentEventModal] = useState(false);
  const [currentInfo, setCurrentInfo] = useState({});
  const [event, setEvent] = useState({
    subject: "",
    teacher: "",
    startDate: "",
    endDate: "",
  });
  const [editEvent, setEditEvent] = useState({
    ...currentInfo,
    startDate: "",
    endDate: "",
  });

  const { allUsers, user } = useSelector((state) => state.user); //destructuring allusers and users from state
  const events = useSelector((state) => state.events.events); //getting events array from store
  // filtering users if their status is active
  const teachers = allUsers?.filter((user) => user.isActive === true);
const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);
  useEffect(() => {
    dispatch(getAllEvents());
  }, []);
  
  
  useEffect(() => {
    // setting current event info to editEvent
    setEditEvent(currentInfo);
  }, [currentInfo]);

  useEffect(() => {
    setEvent({
      ...event,
      startDate: selectedDate,
      endDate: selectedDate,
    });
  }, [selectedDate]);
  const date = moment(selectedDate).format("MMMM Do YYYY, h:mm:ss a");
  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setEditEvent({
      ...editEvent,
      [name]: value,
    });
  };

// This function handles the change event for the dropdown.
// It gets the value and name of the selected option from the event object,
// and then updates the event object with the new value.
  const handleDropDownChange = (e) => {
    const { value, name } = e;
    setEvent({
      ...event,
      [name]: value,
    });
  };
// this one updates editEvent object
  const handleEditDropDownChange = (e) => {
    const { value, name } = e;
    setEditEvent({
      ...editEvent,
      [name]: value,
    });
  };
  const subjects = ["English", "Higher Math", "General Math", "Biology"];
  const calenderRef = useRef();

  // this function sets the value for selected date
  const handleDateClick = (arg) => {
    setSelectedDate(arg.date);
  };

  
  useEffect(() => {
    if (selectedDate) {
      setOpenCalenderModal(true);
    }
  }, [selectedDate]);


  // It checks if the teacher and subject fields are empty, and if they are, it returns.
// If they are not empty, it dispatches a createNewEvent action with the event object,
// and then clears the event object, closes the calendar modal, and sets the selected date to null.
  const handleSubmit = () => {
    if (!event.teacher || !event.subject) {
      return;
    }
    dispatch(
      createNewEvent({
        ...event,
        title: event.subject + "" + "by" + "" + event.teacher,
      })
    );
    setEvent({
      title: "",
      subject: "",
      teacher: "",
      startDate: "",
      endDate: "",
    });
    setOpenCalenderModal(false);
    setSelectedDate(null);
  };

  // It checks if the teacher, subject, startDate, and endDate fields are empty, and if they are, it returns.
// If they are not empty, it dispatches an updateEvent action with the editEvent object and the currentInfo._id,
// which is the ID of the current user.
  const handleUpdate = () => {
    if (
      !editEvent.teacher ||
      !editEvent.subject ||
      !editEvent.startDate ||
      !editEvent.endDate
    ) {
      return;
    } else {
      dispatch(
        updateEvent(
          {
            ...editEvent,
            title: editEvent.subject + "" + "by" + "" + editEvent.teacher,
          },
          currentInfo._id
        )
      );
    }
  };

  // event assign modal's body
  const body = (
    <div>
      <div className="mb-2">
        <Label size="sm">Subject</Label>
        <DropDownContainer
          name="subject"
          items={subjects}
          title="Subject"
          onChange={handleDropDownChange}
          value={event.subject}
        />
      </div>
      <div className="mb-4">
        <Label size="sm">Teacher</Label>
        <DropDownContainer
          name="teacher"
          items={teachers.map((teacher) => teacher.name)}
          title="Teacher"
          onChange={handleDropDownChange}
          value={event.teacher}
        />
      </div>
      <button className="primary-button" onClick={handleSubmit}>
        Assign
      </button>
    </div>
  );

  // edit event's modal body
  const currentEventModalBody = (
    <div>
      {/* <h6>{currentInfo.}</h6> */}
      <div className="mb-2">
        <Label size="sm">Subject</Label>
        <DropDownContainer
          name="subject"
          items={subjects}
          title="Subject"
          onChange={handleEditDropDownChange}
          value={editEvent?.subject}
        />
      </div>
      <div className="mb-4">
        <Label size="sm">Teacher</Label>
        <DropDownContainer
          name="teacher"
          items={teachers.map((teacher) => teacher.name)}
          title="Teacher"
          onChange={handleEditDropDownChange}
          value={editEvent?.teacher}
        />
      </div>
      <div className="mb-4">
        <Label size="sm">Start</Label>
        <Input
          type="date"
          onChange={(e) => handleDateChange(e)}
          value={editEvent?.startDate}
          name="startDate"
        />
      </div>
      <div className="mb-4">
        <Label size="sm">End</Label>
        <Input
          type="date"
          onChange={(e) => handleDateChange(e)}
          value={editEvent?.endDate}
          name="endDate"
        />
      </div>
      <button onClick={handleUpdate} className="primary-button mt-4">
        Edit
      </button>
    </div>
  );

  // It gets the info object from calendar,
// and then updates the currentInfo object with the title and extended props from the info object,
// and then opens the current event modal.
  const handleEventClick = (info) => {
    setCurrentInfo({
      title: info.event._def.title,
      ...info.event.extendedProps,
    });
    setOpenCurrentEventModal(true);
  };

  
  return (
    <div className="container mt-4">
      <FullCalendar
        ref={calenderRef}
        headerToolbar={{
          start: "dayGridMonth,timeGridWeek,timeGridDay",
          center: "title",
          end: "today,next",
        }}
        droppable={true}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        weekends={false}
        events={events}
        selectable={true}
        dateClick={handleDateClick}
        unselectAuto={false}
        eventClick={handleEventClick}
        dragScroll={true}
        selectAllow={(selectInfo) => {
          const today = new Date();
          return selectInfo.start >= today;
        }}
      />
      {/* event assign modal */}
     { user.role==='admin'&&<ReactModal
        title={date}
        openModal={openCalenderModal}
        setOpenModal={setOpenCalenderModal}
        body={body}
      />
}
      {/* event edit modal */}
    { user.role==='admin' && <ReactModal
        openModal={openCurrentEventModal}
        setOpenModal={setOpenCurrentEventModal}
        body={currentEventModalBody}
      />}
    </div>
  );
}
