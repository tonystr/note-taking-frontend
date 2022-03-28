import { useState, useEffect } from 'react'

// Note

/*
export interface INoteData {
    header: string;
    details: string;
  }
  
  export interface INotes {
    id: string;
    createdBy?: string;
    createdAt: number;
    updatedAt: number;
    noteData: INoteData;
  }
*/

function useNotes() {
    const [notes, setNotes] = useState([]);

    const refreshNotes = () => {
        fetch('/api/notes')
            .then(res => res.json())
            .then(res => setNotes(() => res))
            .catch(console.error);
    };

    useEffect(() => refreshNotes(), []);

    return [notes, refreshNotes];
}

async function setNoteText(noteId, text) {
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

function useNote(noteId) {
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

// Flashcards

function useFlashcards() {
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
