// interfaces
import { ToDoInterface } from "../interfaces";

// assets
import priorityIcon from "../assets/priority.png";
import deleteIcon from "../../../../assets/common/delete.png";

// utils
import {
  sortByNameAscending,
  sortByNameDescending,
  sortByStatusAscending,
  sortByStatusDescending,
  sortByDateAscending,
  sortByDateDescending,
  sortByPriorityAscending,
  sortByPriorityDescending,
} from "../utils/sortFunctions";

// api
import { deleteToDoApi, updateToDoApi } from "../utils/todosApi";
import { CircleAlert, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ToDoListListProps {
  sortedBy: string;
  toDo: ToDoInterface[];
  setToDo: React.Dispatch<React.SetStateAction<ToDoInterface[]>>;
  handleClickEdit: (id: string) => void;
}

const ToDoListList: React.FC<ToDoListListProps> = ({
  sortedBy,
  toDo,
  setToDo,
  handleClickEdit,
}) => {
  const updateStatus = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const todo_id = e.target.dataset.todoId;
    if (todo_id) {
      const data = {
        status: e.target.checked,
      };
      try {
        const updatedTodo = await updateToDoApi(todo_id, data);
        setToDo((prev) =>
          prev.map((toDo) =>
            updatedTodo.todo_id === toDo.todo_id ? updatedTodo : toDo
          )
        );
      } catch (error) {
        console.error(error);
      }
    }
  };

  const deleteTodo = async (e: React.MouseEvent<HTMLImageElement>) => {
    const todo_id = e.currentTarget.dataset.todoId;
    try {
      if (todo_id) {
        await deleteToDoApi(todo_id);
        setToDo((prev) => prev.filter((toDo) => toDo.todo_id !== todo_id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  let toDoSorted: ToDoInterface[] = [];

  switch (sortedBy) {
    case "name ascending":
      toDoSorted = sortByNameAscending(toDo);
      break;
    case "name descending":
      toDoSorted = sortByNameDescending(toDo);
      break;
    case "priority ascending":
      toDoSorted = sortByPriorityAscending(toDo);
      break;
    case "priority descending":
      toDoSorted = sortByPriorityDescending(toDo);
      break;
    case "status ascending":
      toDoSorted = sortByStatusAscending(toDo);
      break;
    case "status descending":
      toDoSorted = sortByStatusDescending(toDo);
      break;
    case "date ascending":
      toDoSorted = sortByDateAscending(toDo);
      break;
    case "date descending":
      toDoSorted = sortByDateDescending(toDo);
      break;
    default:
      break;
  }

  return (
    <ul
      className="
        flex 
        flex-col 
        gap-2 
        text-xl 
        font-thin 
        overflow-auto
        scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-slate-400 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-100 dark:scrollbar-track-slate-900
        h-[280px] 
        px-2
        "
    >
      {toDoSorted.map((todo) => {
        return (
          <li
            key={todo.todo_id}
            className="flex gap-2 w-full justify-between items-center"
          >
            <div className="cursor-pointer flex gap-3 items-center">
              <div className="flex items-center gap-2">
                <input
                  className="cursor-pointer"
                  type="checkbox"
                  checked={todo.status}
                  onChange={updateStatus}
                  data-todo-id={todo.todo_id}
                />
              </div>
              {todo.priority && (
                <CircleAlert color="red" />
                // <img className="w-5 h-5" src={priorityIcon} alt="" />
              )}
              <p
                onClick={() => handleClickEdit(todo.todo_id)}
                className="text-lg leading-none cursor-pointer"
              >
                {todo.title}
              </p>
            </div>
            <Button
              variant={"ghost"}
              size={null}
              onClick={deleteTodo}
              data-todo-id={todo.todo_id}
            >
              <Trash2 size={"20"} />
            </Button>
          </li>
        );
      })}
    </ul>
  );
};

export default ToDoListList;
