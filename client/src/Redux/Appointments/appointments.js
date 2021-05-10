import * as actionType from "../action_types/actionTypes";
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://zgycwtqkzgitgsycfdyk.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjE3NzMwOTg0LCJleHAiOjE5MzMzMDY5ODR9.8cmeNSjMvLmtlFtAwRjuR0VhXUhu5PX7174IBiXsU-E";
const supabase = createClient(supabaseUrl, supabaseKey);

export const postAppointment = (idHour, dateAppointments, order) => {
  return async () => {
    await supabase.from("appointments").insert([
      {
        hour_id: idHour,
        date: dateAppointments,
        order_id: order,
      },
    ]);
  };
};

export const allAppointments = (date, order) => {
  return async (dispatch) => {
    const data = await supabase
      .from("appointments")
      .select("*")
      .eq("date", date);
    dispatch({
      type: actionType.APPOINTMENTS,
      payload: {
        hours: data.data,
        order: order,
        date: date,
      },
    });
  };
};
