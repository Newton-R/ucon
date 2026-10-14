import { Timetable, TimetablePayload } from "@/constants/schema";
import { supabase } from "@/constants/utils";

export function useClass() {
  const addClass = async (classPayload: Timetable) => {
    const { data, error } = await supabase
      .from("timetable")
      .insert<TimetablePayload>({
        color: classPayload.color,
        course: classPayload.course,
        day: classPayload.day,
        end_time: classPayload.end_time.toTimeString().slice(0, 8),
        lecturer: classPayload.lecturer,
        room: classPayload.room,
        start_time: classPayload.start_time.toTimeString().slice(0, 8),
        reminder: false,
      });

    if (error) {
      throw error;
    }

    return data;
  };
  return { addClass };
}

export async function getTimetable() {
  const { data, error } = await supabase
    .from("timetable")
    .select("*")
    .order("start_time", { ascending: true });

  if (error) {
    console.log({ error });
    throw error;
  }

  return data;
}
