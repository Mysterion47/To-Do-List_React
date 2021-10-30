import React from "react";
import axios from "axios";

const GoodTask = ({ index, task, setIndex, setNewText, setTasks }) => {
  const editTask = (index) => {
    setIndex(index);
    setNewText(task.text);
  };

  const deleteTask = async (index) => {
    await axios
      .delete(`http://localhost:7000/deleteTask?_id=${task._id}`)
      .then((res) => {
        setTasks(res.data);
      });
  };

  const checkboxChange = async (index) => {
    const { _id, isCheck } = task;
    await axios
      .patch("http://localhost:7000/updateTask", {
        _id,
        isCheck: !isCheck,
      })
      .then((res) => {
        setTasks(res.data);
      });
  };

  return (
    <div className="wrapper" key={`task-${index}`}>
      <div className="taskCont">
        <input
          className="taskCheck"
          type="checkbox"
          checked={task.isCheck}
          onChange={() => checkboxChange(index)}
        />
        <span className={task.isCheck ? "doneTask" : "textTask"}>
          {task.text}
        </span>
        <div className="imgCont">
          <img src="/dit.png" onClick={() => editTask(index)} />
          <img src="del.png" onClick={() => deleteTask(index)} />
        </div>
      </div>
    </div>
  );
};

export default GoodTask;
