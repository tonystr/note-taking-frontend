
export interface QuestionInput {
    data: string;
}
  
export interface Question extends QuestionInput {
    id: string;
}

export type FlashcardSet = {
    id: string
    name: string
    createdAt: Date
    updatedAt: Date
}

export interface FlashcardInput {
    header: string;
    front: string;
    back: string;
}
  
export interface Flashcard extends FlashcardInput {
    id: string;
}

export interface NoteData {
    header: string;
    details: string;
}
  
export interface Note {
    id: string;
    header: string;
    details: string;
    createdAt: Date;
    updatedAt: Date;
}

export type NoteInput = Omit<Note, 'id' | 'createdAt' | 'updatedAt'>;