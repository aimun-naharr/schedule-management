import {
  createNewEventApi,
  getAllEventsApi,
  updateEventApi,
} from "../../components/apiRoutes";
import { ADD_EVENT, GET_EVENTS } from "../actionTypes/event";
export const getAllEvents = () => async (dispatch) => {
  try {
    const res = await getAllEventsApi();
    if (res.data.success) {
      const eventsData = [...res.data.data];
      const updatedData = eventsData.map((obj) => {
        const { startDate, endDate, ...rest } = obj;
        return { start: startDate, end: endDate, ...rest };
      });

      dispatch({
        type: GET_EVENTS,
        events: updatedData,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
export const createNewEvent = (data) => async (dispatch) => {
  try {
    const res = await createNewEventApi(data);
    if (res.data.succeed) {
      dispatch(getAllEvents());
    }
  } catch (error) {
    console.log(error)
  }
};

export const updateEvent = (data, id) => async (dispatch) => {
  console.log("update Event", data);
  try {
    const res = await updateEventApi(data, id);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};
