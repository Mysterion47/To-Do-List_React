import React, { useState, useEffect } from "react";
import axios from "axios";

const EditingTask = ({ index, task, setTasks, setIndex }) => {
  const [newText, setNewText] = useState(task.text);

  useEffect(async () => {
    await axios.get("http://localhost:8080/allTasks").then((res) => {
      setTasks(res.data);
    });
  });

  const doneTask = async (index) => {
    const { _id } = task;
    if (newText === "") {
      alert("Enter your text !");
    } else {
      await axios
        .patch("http://localhost:7000/updateTask", {
          _id,
          text: newText,
        })
        .then((res) => {
          setTasks(res.data);
        });
      setIndex();
    }
  };

  const cancelTask = (index) => {
    setIndex();
  };

  return (
    <div className="textEdit" key={`task-${index}`}>
      <input
        type="text"
        onChange={(e) => setNewText(e.target.value)}
        value={newText}
      />
      <img src="accept.ico" onClick={() => doneTask(index)} />
      <img src="canc.png" onClick={() => cancelTask(index)} />
    </div>
  );
};

export default EditingTask;
