import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { RootState } from "../../store/store";
import { setTasks, updateTask, removeTask } from "../../store/tasksSlics";
import styles from "./ViewTasks.module.css";
import {
  completeTask,
  createTask,
  deleteTask,
  fetchTasks,
} from "../../services/tasks";
import { toast } from "react-toastify";
import AddTask from "./AddTask";
import TaskList from "../../components/TaskList";
import { TbLogout } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import useDebounce from "../../utils/useDebounce";

const ViewTasks: React.FC = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const [isModelOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const navigate = useNavigate();

  const {
    data: taskData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["tasks", filterStatus, debouncedSearchTerm],
    queryFn: () =>
      fetchTasks({ status: filterStatus, search: debouncedSearchTerm }),
  });

  useEffect(() => {
    if (taskData) {
      dispatch(setTasks(taskData));
    }
  }, [taskData, dispatch]);
  const handleComplete = async (id: string) => {
    try {
      const updatedTask = await completeTask(id);
      dispatch(updateTask(updatedTask));
      refetch();
    } catch (error) {
      console.error("Error completing task:", error);
    }
  };

  const handleTaskAdd = async (request: any) => {
    try {
      await createTask(request);
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id);
      dispatch(removeTask(id));
      refetch();
      toast.success("Task Deleted");
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.logoutContainer}>
        <TbLogout
          color="#c11d1d"
          size={30}
          onClick={() => {
            localStorage.removeItem("authToken");
            navigate("/");
          }}
        />
      </div>
      <div className={styles.tasksContainer}>
        <button
          className={styles.addTaskButton}
          onClick={() => setIsModalOpen(true)}
        >
          Create New Task
        </button>
        <div className={styles.header}>
          <h1>Tasks</h1>
        </div>
        <div className={styles.filters}>
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchBox}
          />
          <div className={styles.filterButtons}>
            <button
              className={filterStatus === "" ? styles.activeFilter : ""}
              onClick={() => setFilterStatus("")}
            >
              All
            </button>
            <button
              className={filterStatus === "Pending" ? styles.activeFilter : ""}
              onClick={() => setFilterStatus("Pending")}
            >
              Pending
            </button>
            <button
              className={
                filterStatus === "Completed" ? styles.activeFilter : ""
              }
              onClick={() => setFilterStatus("Completed")}
            >
              Completed
            </button>
          </div>
        </div>

        {isModelOpen && (
          <AddTask
            onClose={() => setIsModalOpen(false)}
            onTaskAdded={handleTaskAdd}
          />
        )}
        {isLoading && <p>Loading tasks...</p>}
        {error && <div className={styles.errorText}>Error fetching tasks</div>}
        {tasks.length === 0 && !isLoading ? (
          <>
            {" "}
            <p>No tasks found.</p>
            {/* <button
              className={styles.noTasksAdd}
              onClick={() => setIsModalOpen(true)}
            >
              Create New Task
            </button> */}
          </>
        ) : (
          <TaskList
            tasks={tasks}
            onComplete={handleComplete}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
};

export default ViewTasks;
