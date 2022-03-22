import { useState, useEffect } from 'react'

function useFlashcards() {
    const [flashcards, setFlashcards] = useState([]);

    useEffect(() => {
        fetch('/api/flashcards')
            .then(res => res.json())
            .then(res => setFlashcards(() => res))
            .catch(console.error);
    }, []);

    return flashcards
}

function useQuestions() {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        fetch('/api/qa/questions')
            .then(res => res.json())
            .then(res => setQuestions(() => res))
            .catch(console.error);
    }, []);

    return questions
}

function createQuestion(body) {
    console.log(body);
    fetch('/api/qa/questions', {
        method: 'POST',
        body: JSON.stringify({ question: body }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
    })
        .then(res => res.json())
        .then(console.log)
        .catch(console.error);
}

export { useFlashcards, useQuestions, createQuestion };