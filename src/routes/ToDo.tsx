import React, { useEffect, useState } from "react";
import API from "../api";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  faPenToSquare,
  faTrash,
  faCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faThLarge, faPlus } from "@fortawesome/free-solid-svg-icons";

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
  color: #fff;
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
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  background-color: #ffffff;
  height: 50px;
  border-radius: 10px;
  input[type="text"] {
    width: 90%;
    height: 30px;
    border: none;
  }
  button {
    margin-left: 10px;
    background-color: #fff;
    border: none;
  }
`;

const TodoItems = styled.ul<{ isList: boolean }>`
  margin-top: 20px;
  display: ${(props) => !props.isList && "grid"};
  grid-template-columns: ${(props) => !props.isList && "repeat(3, 1fr)"};
  gap: ${(props) => !props.isList && "10px"};
`;

const TodoItem = styled.li<{ isList: boolean }>`
  width: 100%;
  background-color: #fff;
  color: black;
  margin: 5px 0;
  min-height: ${(props) => (props.isList ? "40px" : "120px")};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  font-weight: bold;
  flex-direction: ${(props) => !props.isList && "column"};
  label {
    display: flex;
    flex-direction: ${(props) => !props.isList && "column"};
    align-items: flex-start;
    width: ${(props) => !props.isList && "100%"};
  }
  input[type="checkbox"] {
    margin-right: 10px;
    margin-bottom: ${(props) => !props.isList && "5px"};
  }
  input[type="text"] {
    outline: none;
  }
  > div {
    display: flex;
    justify-content: flex-end;
    width: ${(props) => !props.isList && "100%"};
    button {
      background-color: #fff;
      border: none;
    }
  }
`;

interface IToDoItem {
  id: number;
  todo: string;
  isCompleted: boolean;
  isEdit: boolean;
  userId: string;
}

const ToDoText = styled.p<{ isCompleted: boolean }>`
  text-decoration: ${(props) => props.isCompleted && "line-through"};
`;

const ToDo = () => {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState<IToDoItem[]>([]);
  const [showTypeToggle, setShowTypeToggle] = useState(false);

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
          {showTypeToggle ? (
            <FontAwesomeIcon
              icon={faThLarge}
              size="lg"
              onClick={() => setShowTypeToggle(false)}
            />
          ) : (
            <FontAwesomeIcon
              icon={faList}
              size="lg"
              onClick={() => setShowTypeToggle(true)}
            />
          )}
        </Header>
        <InputWrapper>
          <input
            data-testid="new-todo-input"
            type="text"
            placeholder="ADD TODO"
            value={todo}
            onChange={(e) => {
              setTodo(e.target.value);
            }}
            onKeyUp={handleKeyUp}
          />
          <button data-testid="new-todo-add-button" onClick={addTodo}>
            <FontAwesomeIcon icon={faPlus} size="lg" />
          </button>
        </InputWrapper>
        <TodoItems isList={showTypeToggle}>
          {todoList?.map((item: IToDoItem) => {
            return (
              <TodoItem isList={showTypeToggle} key={item.id}>
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
                  <div>
                    <button
                      data-testid="submit-button"
                      onClick={() => {
                        item.isEdit = false;
                        setTodoList([...todoList]);
                      }}
                    >
                      <FontAwesomeIcon icon={faCheck} size="lg" />
                    </button>
                    <button
                      data-testid="cancel-button"
                      onClick={() => {
                        item.isEdit = false;
                        setTodoList([...todoList]);
                      }}
                    >
                      <FontAwesomeIcon icon={faXmark} size="xl" />
                    </button>
                  </div>
                ) : (
                  <div>
                    <button
                      data-testid="modify-button"
                      onClick={() => {
                        item.isEdit = true;
                        setTodoList([...todoList]);
                      }}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} size="lg" />
                    </button>
                    <button
                      data-testid="delete-button"
                      onClick={() => deleteTodo(item.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} size="lg" />
                    </button>
                  </div>
                )}
              </TodoItem>
            );
          })}
        </TodoItems>
      </ToDoWrapper>
    </Container>
  );
};

export default ToDo;
