import { TaskAPI } from "./config/tasks-axios";

export const fetchTasks = async () => {
  const { data } = await TaskAPI.get("");
  console.log(data);
  return data;
};

export const completeTask = async (id: string) => {
  const { data } = await TaskAPI.patch(`/${id}`);
  return data;
};

export const deleteTask = async (id: string) => {
  await TaskAPI.delete(`/api/tasks/${id}`);
  return id;
};

export const addTask = async (request: any) => {
  try {
    await TaskAPI.post("", { request });
  } catch (error: any) {
    console.log(error);
    throw new error();
  }
};
