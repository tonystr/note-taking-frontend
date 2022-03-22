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

export { useFlashcards, useQuestions };
