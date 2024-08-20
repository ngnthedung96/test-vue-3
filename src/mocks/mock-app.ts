import { App, AppType } from "../constants/apps";

const appTypes = Object.values(AppType).filter((type) => type !== AppType.ALL);

const getRandomInt = (max: number) => Math.floor(Math.random() * max);

const getRandomBoolean = () => Math.random() > 0.5;

const getRandomTimestamp = () => {
  const start = new Date(2020, 0, 1).getTime();
  const end = new Date().getTime();

  const randomTime = start + Math.random() * (end - start);

  return Math.floor(randomTime / 1000);
};

const generateMockApp = (id: number): App => {
  const randomType = appTypes[getRandomInt(appTypes.length)];
  return {
    id,
    type: randomType,
    name: `${randomType} App ${id}`,
    createdBy: `User ${getRandomInt(100)}`,
    description: `A description for ${randomType} app ${id}.`,
    numberView: getRandomInt(50000),
    numberDownload: getRandomInt(20000),
    star: getRandomInt(5) + 1,
    paid: getRandomBoolean(),
    createdAt: getRandomTimestamp(), // Thêm trường createdAt
  };
};

export const generateMockApps = (count: number): App[] => {
  return Array.from({ length: count }, (_, index) =>
    generateMockApp(index + 1)
  );
};

// Tạo 50 ứng dụng mock
export const mockApps: App[] = generateMockApps(50);
