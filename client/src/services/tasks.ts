import { TaskAPI } from "./config/tasks-axios";

export const fetchTasks = async ({ status = "all", search = "" } = {}) => {
  const params = new URLSearchParams();
  if (status !== "all") params.append("status", status);
  if (search) params.append("search", search);

  const { data } = await TaskAPI.get(`?${params.toString()}`);
  console.log(data);
  return data;
};

export const completeTask = async (id: string) => {
  const { data } = await TaskAPI.patch(`/${id}`);
  return data;
};

export const deleteTask = async (id: string) => {
  await TaskAPI.delete(`/${id}`);
  return id;
};

export const createTask = async (request: any) => {
  try {
    console.log(request);
    await TaskAPI.post("", request);
  } catch (error: any) {
    console.log(error);
    throw new error();
  }
};

export const updateTask = async (request: any, id: string) => {
  console.log(id);
  const { data } = await TaskAPI.put(`/${id}`, request);
  return data;
};
