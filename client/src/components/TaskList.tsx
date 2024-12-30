import React, { useState } from "react";
import styled from "styled-components";
import { FaCheck, FaEdit, FaTrash } from "react-icons/fa";
import AddTask from "../pages/Tasks/AddTask";

interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
}

interface TaskListProps {
  tasks: Task[];
  onComplete: (id: string) => void;
  refetch?: () => void;
  onDelete: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onComplete,
  onDelete,
  refetch,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskData, setTaskData] = useState({});

  const updateTask = (task: any) => {
    setTaskData(task);
    setIsModalOpen(true);
  };

  return (
    <>
      <TaskListContainer>
        {tasks.map((task) => (
          <TaskItem key={task._id}>
            <TaskDetails>
              <TaskTitle>{task.title}</TaskTitle>
              <TaskDescription>{task.description}</TaskDescription>
            </TaskDetails>
            <TaskActions>
              <TaskButton onClick={() => updateTask(task)}>
                <FaEdit /> Edit
              </TaskButton>
              <TaskButton
                complete
                onClick={() => onComplete(task._id)}
                disabled={task.status === "Completed"}
              >
                <FaCheck />
                {task.status === "Completed" ? "Completed" : "Complete"}
              </TaskButton>
              <TaskButton delete onClick={() => onDelete(task._id)}>
                <FaTrash /> Delete
              </TaskButton>
            </TaskActions>
          </TaskItem>
        ))}
      </TaskListContainer>
      {isModalOpen && (
        <AddTask
          refetch={refetch}
          task={taskData}
          modalType="update"
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default TaskList;

const TaskListContainer = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  max-width: 800px;
`;

const TaskItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  margin-bottom: 15px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  }
`;

const TaskDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TaskTitle = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color: #34495e;
`;

const TaskDescription = styled.span`
  font-size: 1rem;
  color: #7f8c8d;
`;

const TaskActions = styled.div`
  display: flex;
  gap: 15px;
`;

const TaskButton = styled.button<{ complete?: boolean; delete?: boolean }>`
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
  background: ${({ complete, delete: del }) =>
    complete ? "#1abc9c" : del ? "#e74c3c" : "#3498db"};

  &:hover {
    background: ${({ complete, delete: del }) =>
      complete ? "#16a085" : del ? "#c0392b" : "#2980b9"};
  }

  &:disabled {
    background: #bdc3c7;
    color: #ecf0f1;
    cursor: not-allowed;
  }
`;
