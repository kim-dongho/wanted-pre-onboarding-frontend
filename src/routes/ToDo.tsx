import React, { useEffect, useState } from "react";
import API from "../api";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: black;
`;

const ToDoWrapper = styled.div`
  width: 768px;
  height: 800px;
  display: flex;
  flex-direction: column;
  padding: 50px;
  border-radius: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
  background-color: #fff;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Title = styled.h2`
  font-size: 24px;
`;

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  input[type="text"] {
    width: 90%;
  }
  button {
    margin-left: 10px;
  }
`;

const TodoItems = styled.div``;

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

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addTodo();
    }
  };

  return (
    <Container>
      <ToDoWrapper>
        <Header>
          <Title>ToDo List</Title>
          <FontAwesomeIcon icon={faList} />
        </Header>
        <InputWrapper>
          <input
            data-testid="new-todo-input"
            type="text"
            value={todo}
            onChange={(e) => {
              setTodo(e.target.value);
            }}
            onKeyUp={handleKeyUp}
          />
          <button data-testid="new-todo-add-button" onClick={addTodo}>
            추가
          </button>
        </InputWrapper>
        <TodoItems>
          {todoList?.map((item: IToDoItem) => {
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
        </TodoItems>
      </ToDoWrapper>
    </Container>
  );
};

export default ToDo;
