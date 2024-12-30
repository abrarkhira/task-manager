import { useState } from "react";
import styles from "./AddTask.module.css";
import { FaPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";

// API Call to create a new task

const AddTask: React.FC<{
  onClose: () => void;
  onTaskAdded: (request: any) => void;
}> = ({ onClose, onTaskAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddTask = async () => {
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
      {/* Close Button */}
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
          onClick={handleAddTask}
        >
          <FaPlus /> Add Task
        </button>
      </div>
    </div>
  );
};

export default AddTask;
