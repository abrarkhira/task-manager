import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { RootState } from "../../store/store";
import { setTasks, updateTask, removeTask } from "../../store/tasksSlics";
import styles from "./ViewTasks.module.css";
import { completeTask, deleteTask, fetchTasks } from "../../services/tasks";
import { FaCheck, FaTrash } from "react-icons/fa";
import AddTask from "./AddTask";

const ViewTasks: React.FC = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const [isModelOpen, setIsModalOpen] = useState(false);

  const {
    data: taskData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  useEffect(() => {
    if (taskData) {
      dispatch(setTasks(taskData));
    }
    //eslint-disable-next-line
  }, [taskData]);

  const handleComplete = async (id: string) => {
    try {
      const updatedTask = await completeTask(id);
      dispatch(updateTask(updatedTask));
      refetch(); // Refetch tasks after completion
    } catch (error) {
      console.error("Error completing task:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id);
      dispatch(removeTask(id));
      refetch(); // Refetch tasks after deletion
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className={styles.mainContainer}>
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
        {isModelOpen && (
          <AddTask
            onClose={() => setIsModalOpen(false)}
            onTaskAdded={refetch}
          />
        )}
        {isLoading && <p>Loading tasks...</p>}
        {error && <div className={styles.errorText}>Error fetching tasks</div>}
        {tasks.length === 0 && !isLoading ? (
          <p>No tasks found.</p>
        ) : (
          <ul className={styles.taskList}>
            {tasks.map((task) => (
              <li key={task._id} className={styles.taskItem}>
                <div className={styles.taskDetails}>
                  <span className={styles.taskTitle}>{task.title}</span>
                  <span className={styles.taskDescription}>
                    {task.description}
                  </span>
                </div>
                <div className={styles.taskActions}>
                  <button
                    className={`${styles.taskButton} ${
                      task.completed
                        ? styles.completedButton
                        : styles.completeButton
                    }`}
                    onClick={() => handleComplete(task._id)}
                    disabled={task.completed}
                  >
                    <FaCheck /> {task.completed ? "Completed" : "Complete"}
                  </button>
                  <button
                    className={`${styles.taskButton} ${styles.deleteButton}`}
                    onClick={() => handleDelete(task._id)}
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ViewTasks;
