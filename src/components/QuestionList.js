import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [question, setQuestion] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((resp) => resp.json())
      .then((question) => {
        setQuestion(question);
      });
  }, []);

  function handleDelete(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE", 
    })
      .then((resp) => resp.json())
      .then(() => {
        const updatedQuestions = question.filter((quiz) => quiz.id !== id);
        setQuestion(updatedQuestions);
      });
  }

  function handleAnswersChange(correctIndex, id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then((resp) => resp.json())
      .then((questionUpdate) => {
        const updateQuestions = question.map((quiz) => {
          if (quiz.id === questionUpdate.id) {return questionUpdate}else
          {return quiz};
        });
        setQuestion(updateQuestions);
      });
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{question.map((question => {
        return(
          <QuestionItem
          key={question.id}
          question={question}
          handleDelete={handleDelete}
          onChange={handleAnswersChange}
        />
        )
      }))}
      </ul>
    </section>
  );
}

export default QuestionList;
