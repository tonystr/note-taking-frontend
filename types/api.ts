
export interface QuestionInput {
    question: string;
}
  
export interface Question extends QuestionInput {
    id: string;
}

export interface FlashcardInput {
    header: string;
    front: string;
    back: string;
}
  
export interface Flashcard extends FlashcardInput {
    id: string;
}

export interface RefreshApiCall extends Function {

};

export interface NoteData {
    header: string;
    details: string;
}
  
export interface Note {
    id: string;
    createdBy?: string;
    createdAt: number;
    updatedAt: number;
    noteData: NoteData;
}
  