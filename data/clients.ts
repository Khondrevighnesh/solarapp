// data/clients.ts

import { plants } from "./plants";

/* 🔧 HELPER → get plants by IDs */
const getPlantsByIds = (ids: number[]) => {
  return plants.filter((p) => ids.includes(p.id));
};

export const clients = [
  {
    id: "solar123",
    password: "1234",
    name: "Demo Client",
    plants: getPlantsByIds([1, 2]), // Pune + Mumbai
  },
  {
    id: "plant456",
    password: "4567",
    name: "Single Plant Owner",
    plants: getPlantsByIds([3]), // Nagpur
  },
  {
    id: "green789",
    password: "7890",
    name: "Green Energy Ltd",
    plants: getPlantsByIds([1, 2, 4]), // Pune + Mumbai + Delhi
  },
];