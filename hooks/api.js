import { useState, useEffect } from 'react'

// Flashcards

function useFlashcards() {
    const [flashcards, setFlashcards] = useState([]);

    const refreshFlashcards = () => {
        fetch('/api/flashcards')
            .then(res => res.json())
            .then(res => setFlashcards(() => res))
            .catch(console.error);
    };

    useEffect(() => {
        refreshFlashcards();
    }, []);

    return [flashcards, refreshFlashcards];
}

// header: flashcard gruppe
async function createFlashcard(header, front, back) {
    return fetch('/api/flashcards', {
        method: 'POST',
        body: JSON.stringify({ header, front, back }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
    })
        .then(res => res.json())
        .then(console.log)
        .catch(console.error);
}

// QnA questions

function useQuestions() {
    const [questions, setQuestions] = useState([]);

    const refreshQuestions = () => {
        fetch('/api/qa/questions')
            .then(res => res.json())
            .then(res => setQuestions(() => res))
            .catch(console.error);
    };
    
    useEffect(() => {
        refreshQuestions();
    }, []);

    return [questions, refreshQuestions];
}

async function createQuestion(body) {
    return fetch('/api/qa/questions', {
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

export { 
    useFlashcards, 
    createFlashcard,
    useQuestions, 
    createQuestion,
};
