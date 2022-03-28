import { useState, useEffect } from 'react'
import { Note, Question, Flashcard, FlashcardInput, RefreshApiCall } from 'types';
import useSWR from 'swr';

// Note

const fetcher = (url: RequestInfo) => 
    fetch(url).then(res => res.json());

function useNotes(): [Note[], RefreshApiCall] {
    const { data: notes, mutate: mutateNotes } = 
        useSWR<Note[]>('/api/notes', fetcher)

    return [notes, mutateNotes];
}

function useNote(noteId: String): [Note, RefreshApiCall] {
    const [note, setNote] = useState(null);

    const refreshNote = () => {
        fetch(`/api/notes/${noteId}`)
            .then(res => res.json())
            .then(res => setNote(() => res))
            .catch(console.error);
    };

    useEffect(() => refreshNote(), [noteId]);

    return [note, refreshNote];
}

async function setNoteText(noteId: String, text: String) {
    return fetch(`/api/notes/${noteId}`, {
        method: 'PUT',
        body: JSON.stringify({ details: text }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
    })
        .then(res => res.json())
        .catch(console.error);
}

// Flashcards

function useFlashcards(): [ Flashcard[], RefreshApiCall ] {
    const [flashcards, setFlashcards] = useState([]);

    const refreshFlashcards = () => {
        fetch('/api/flashcards')
            .then(res => res.json())
            .then(res => setFlashcards(() => res))
            .catch(console.error);
    };

    useEffect(() => refreshFlashcards(), []);

    return [flashcards, refreshFlashcards];
}

// header: flashcard gruppe
async function createFlashcard(flashcard: FlashcardInput) {
    return fetch('/api/flashcards', {
        method: 'POST',
        body: JSON.stringify(flashcard),
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

function useQuestions(): [Question[], RefreshApiCall] {
    const [questions, setQuestions]: [Question[], Function] = useState([]);

    const refreshQuestions = () => {
        fetch('/api/qa/questions')
            .then(res => res.json())
            .then(res => setQuestions(() => res))
            .catch(console.error);
    };
    
    useEffect(() => refreshQuestions(), []);

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
    // Notes
    useNote,
    useNotes,
    setNoteText,
    // Flashcards
    useFlashcards, 
    createFlashcard,
    // QnA Questions
    useQuestions, 
    createQuestion,
};
