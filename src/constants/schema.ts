export interface Timetable {
  course: string;
  lecturer: string;
  start_time: Date;
  end_time: Date;
  room: string;
  day: number;
  color: string;
  reminder: boolean;
}

export interface TimetablePayload {
  course: string;
  lecturer: string;
  start_time: string;
  end_time: string;
  room: string;
  day: number;
  color: string;
  reminder: boolean;
}
