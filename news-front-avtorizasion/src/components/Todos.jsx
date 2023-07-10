import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, fetchTodos, removeTodo } from "../features/todosSlice";
import { useParams } from "react-router-dom";
import { fetchNews } from "../features/newsSlice";
import styles from "./todos.module.css";

const Todos = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const todos = useSelector((state) => state.todos.todos);
  console.log(todos, 'com');
  const news = useSelector((state) => state.news.news);
  const token = useSelector((state) => state.application.token);

  function parseJWT(token) {
    let base64Url = token.split(".")[1];
    let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    let jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload).login;
  }

  function handleChange(e) {
    setText(e.target.value);
  }
  function handleClick(e) {
    e.preventDefault();
    if (!token) {
      setText("");
      return alert("нужно зарегиться");
    }

    if (text.trim()) {
      dispatch(addTodo({ text: text, id }));
      setText("");
    }
  }

  function handleRemove(id) {
    dispatch(removeTodo(id));
  }
  const id = useParams();

  const loading = useSelector((state) => state.todos.loading);
  console.log(loading);

  useEffect(() => {
    dispatch(fetchTodos(id));
    dispatch(fetchNews());
  }, [loading]);

  console.log(id.id, "id");
  const filteredByNewsId = news.filter((news) => {
    if (!id) true;
    return news._id === id.id;
  });

  return (
    <>
      {filteredByNewsId.map((news) => {
        return (
          <div className={styles.news} key={news._id}>
            <div>
              <img src={news.img} />
              <h2>{news.newsHeader}</h2>
              <p>{news.text}</p>
            </div>
          </div>
        );
      })}

      {todos.map((todo) => {
        return (
          <div className={styles.button} key={todo._id}>
            {" "}
            {todo.user.login}:  {todo.text}{" "}
            {token && todo.user.login === parseJWT(token) ? (
              <button onClick={() => handleRemove(todo._id)}>x</button>
            ) : (
              token &&
              parseJWT(token) === "admin" && (
                <button onClick={() => handleRemove(todo._id)}>x</button>
              )
            )}
          </div>
        );
      })}
      <form className={styles.comit}>
        <input
          placeholder="commit"
          value={text}
          type="text"
          onChange={handleChange}
        />
        <button onClick={handleClick}>Add more</button>
      </form>
    </>
  );
};

export default Todos;
