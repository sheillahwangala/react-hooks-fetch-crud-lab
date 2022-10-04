import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";


function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((questions) => {
        setQuestions(questions);
      });
  }, []);

  function handleDelete(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE"
    })
      .then((response) => response.json())
      .then(() => {
        const updatedQuestions = questions.filter(question => question.id !== id)
        setQuestions(updatedQuestions)
      })
  }

  function handleAnswerOnChange(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then((response) => response.json())
      .then((updatedQuestion) => {
        const updatedQuestions = questions.map(question => {
          if (question.id === updatedQuestion.id) return updatedQuestion;
          return question;
        });
        setQuestions(updatedQuestions);
      });
  }

  const questionItems = questions.map((question) => (
    <QuestionItem
      key={question.id}
      question={question}
      onDeleteClick={handleDelete}
      onAnswerChange={handleAnswerOnChange}
    />
  ));

  return (
    <section>
      <h1>Quiz Questions</h1>
      {/* display QuestionItem components here after fetching */}
      <ul>{questionItems} </ul>
    </section>
  );
}

export default QuestionList;
