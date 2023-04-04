import React, { useEffect, useState } from "react";
import API from "../api";
import styled from "styled-components";

interface IToDoItem {
  id: number;
  todo: string;
  isCompleted: boolean;
  isEdit: boolean;
  userId: string;
}

const ToDoText = styled.span<{ isCompleted: boolean }>`
  text-decoration: ${(props) => props.isCompleted && "line-through"};
`;

const ToDo = () => {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState<IToDoItem[]>([]);

  useEffect(() => {
    getTodo();
  }, []);

  const getTodo = () => {
    API.getTodo().then((res) => {
      res.data.map((item: IToDoItem) => {
        item.isEdit = false;
      });
      setTodoList(res.data);
    });
  };

  const addTodo = () => {
    API.createTodo({ todo: todo }).then((res) => {
      setTodo("");
      getTodo();
    });
  };

  const deleteTodo = (id: number) => {
    API.deleteTodo(id).then((res) => {
      alert("삭제되었습니다.");
      getTodo();
    });
  };

  const updateTodo = (item: IToDoItem) => {
    item.isCompleted = !item.isCompleted;
    API.updateTodo(item.id, {
      todo: item.todo,
      isCompleted: item.isCompleted,
    }).then((res) => {
      setTodoList([...todoList]);
    });
  };

  return (
    <div>
      <input
        data-testid="new-todo-input"
        type="text"
        value={todo}
        onChange={(e) => {
          setTodo(e.target.value);
        }}
      />
      <button data-testid="new-todo-add-button" onClick={addTodo}>
        추가
      </button>
      <ul>
        {todoList?.map((item: IToDoItem) => {
          // @ts-ignore
          return (
            <li key={item.id}>
              <label>
                <input
                  type="checkbox"
                  checked={item.isCompleted}
                  onChange={() => updateTodo(item)}
                />
                {item.isEdit ? (
                  <input
                    type="text"
                    data-testid="modify-input"
                    value={item.todo}
                    onChange={(e) => {
                      item.todo = e.target.value;
                      setTodoList([...todoList]);
                    }}
                  />
                ) : (
                  <ToDoText isCompleted={item.isCompleted}>
                    {item.todo}
                  </ToDoText>
                )}
              </label>
              {item.isEdit ? (
                <>
                  <button
                    data-testid="submit-button"
                    onClick={() => {
                      item.isEdit = false;
                      setTodoList([...todoList]);
                    }}
                  >
                    제출
                  </button>
                  <button
                    data-testid="cancel-button"
                    onClick={() => {
                      item.isEdit = false;
                      setTodoList([...todoList]);
                    }}
                  >
                    취소
                  </button>
                </>
              ) : (
                <>
                  <button
                    data-testid="modify-button"
                    onClick={() => {
                      item.isEdit = true;
                      setTodoList([...todoList]);
                    }}
                  >
                    수정
                  </button>
                  <button
                    data-testid="delete-button"
                    onClick={() => deleteTodo(item.id)}
                  >
                    삭제
                  </button>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ToDo;
