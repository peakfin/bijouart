export type Schedule = {
    date: string;
    title: string;
    location: string;
    isUpcoming?: boolean;
  };
  
  export const schedules: Schedule[] = [
    // {
    //   date: '2025년 5월 3일 (토)',
    //   title: '2025 봄 정기 연주회',
    //   location: '예술의전당',
    //   isUpcoming: true,
    // },
    // {
    //   date: '2025년 6월 26일 (목)',
    //   title: '문화가 있는 날 공연',
    //   location: '서울시청 광장',
    //   isUpcoming: true,
    // },
    {
      date: '2025년 4월 12일 (토)',
      title: '동작구민을 위한 우리동네 음악회',
      location: '상도어울마당 아트홀',
      isUpcoming: false,
    },
  ];