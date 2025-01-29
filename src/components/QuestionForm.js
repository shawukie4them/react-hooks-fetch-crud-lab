import React, { useState } from "react";

function QuestionForm({ setQuestions }) {
  const [formData, setFormData] = useState({
    prompt: "",
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
    correctIndex: 0,
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newQuestion = {
      prompt: formData.prompt,
      answers: [formData.answer1, formData.answer2, formData.answer3, formData.answer4],
      correctIndex: parseInt(formData.correctIndex),
    };

    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newQuestion),
    })
      .then((res) => res.json())
      .then((data) => {
        setQuestions((prevQuestions) => [...prevQuestions, data]);
        setFormData({
          prompt: "",
          answer1: "",
          answer2: "",
          answer3: "",
          answer4: "",
          correctIndex: 0,
        });
      })
      .catch((err) => console.error("Error adding question:", err));
  }

  return (
    <section>
      <h1>New Question</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Prompt:
          <input type="text" name="prompt" value={formData.prompt} onChange={handleChange} required />
        </label>
        <label>
          Answer 1:
          <input type="text" name="answer1" value={formData.answer1} onChange={handleChange} required />
        </label>
        <label>
          Answer 2:
          <input type="text" name="answer2" value={formData.answer2} onChange={handleChange} required />
        </label>
        <label>
          Answer 3:
          <input type="text" name="answer3" value={formData.answer3} onChange={handleChange} required />
        </label>
        <label>
          Answer 4:
          <input type="text" name="answer4" value={formData.answer4} onChange={handleChange} required />
        </label>
        <label>
          Correct Answer:
          <select name="correctIndex" value={formData.correctIndex} onChange={handleChange}>
            <option value="0">{formData.answer1 || "Answer 1"}</option>
            <option value="1">{formData.answer2 || "Answer 2"}</option>
            <option value="2">{formData.answer3 || "Answer 3"}</option>
            <option value="3">{formData.answer4 || "Answer 4"}</option>
          </select>
        </label>
        <button type="submit">Add Question</button>
      </form>
    </section>
  );
}

export default QuestionForm;
