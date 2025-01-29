import React from "react";

function QuestionItem({ question, setQuestions }) {
  const handleDelete = () => {
    fetch(`http://localhost:4000/questions/${question.id}`, { method: "DELETE" })
      .then(() => {
        setQuestions((prev) => prev.filter((q) => q.id !== question.id));
      })
      .catch((err) => console.error("Error deleting question:", err));
  };

  const handleUpdate = (event) => {
    const updatedCorrectIndex = Number(event.target.value);

    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex: updatedCorrectIndex }),
    })
      .then((res) => res.json())
      .then((updatedQuestion) => {
        setQuestions((prev) =>
          prev.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q))
        );
      })
      .catch((err) => console.error("Error updating question:", err));
  };

  return (
    <li>
      <h4>Question {question.id}</h4>
      <h5>Prompt: {question.prompt}</h5>
      <label>Correct Answer:
        <select value={question.correctIndex} onChange={handleUpdate}>
          {question.answers.map((answer, index) => (
            <option key={index} value={index}>
              {answer}
            </option>
          ))}
        </select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;