export type Schedule = {
  title: string;
  date: string;
  location: string;
  isUpcoming?: boolean;
};

export const schedules: Schedule[] = [
  {
    title: '제목',
    date: '언제',
    location: '어디',
    isUpcoming: true,
  },
  {
    title: '제목',
    date: '언제',
    location: '어디',
    isUpcoming: true,
  },
  {
    title: '동작구민을 위한 우리동네 음악회',
    date: '2025년 4월 12일 (토)',
    location: '상도어울마당 아트홀',
    isUpcoming: false,
  }
];