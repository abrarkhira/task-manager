import { useEffect, useState } from "react";
import styles from "./AddTask.module.css";
import { FaPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";
import { updateTask } from "../../services/tasks";

// API Call to create a new task

const AddTask: React.FC<{
  onClose: () => void;
  refetch: any;
  onTaskAdded?: (request: any) => void;
  onTaskUpdate?: (request: any) => void;
  task?: any;
  modalType: "add" | "update";
}> = ({ onClose, onTaskAdded, modalType, task, refetch }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (modalType === "update") {
      setTitle(task.title);
      setDescription(task.description);
    }
  }, [modalType, task]);

  const handleUpdate = async () => {
    if (!title) {
      return toast.error("Title is mandatory ");
    }
    const request = {
      ...task,
      title,
      description,
    };
    try {
      await updateTask(request, task._id);
      refetch();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddTask = async () => {
    if (!onTaskAdded) return;
    console.log(title);
    if (!title) {
      return toast.error("Title is mandatory ");
    }
    try {
      //   await createTask({ title, description });
      setTitle("");
      setDescription("");
      onTaskAdded({ title, description });
      onClose();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className={styles.addTaskContainer}>
      <button className={styles.closeButton} onClick={onClose}>
        <IoClose />
      </button>

      <h2>Add New Task</h2>
      <div className={styles.addTaskForm}>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.inputField}
        />
        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.textareaField}
        ></textarea>
        <button
          className={`${styles.taskButton} ${styles.addButton}`}
          onClick={() =>
            modalType === "add" ? handleAddTask() : handleUpdate()
          }
        >
          <FaPlus /> Add Task
        </button>
      </div>
    </div>
  );
};

export default AddTask;
