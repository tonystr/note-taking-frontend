
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
  
  