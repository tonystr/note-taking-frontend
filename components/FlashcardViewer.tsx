import { useEffect, useState } from 'react';
import Toolbar from 'components/Toolbar';
import Sidebar from 'components/Sidebar';
import { useApi } from 'utils/api';
import { Flashcard } from 'types';

function Button({ children, filled=false, onClick }) {
    return (
        <button onClick={onClick} className={`w-20 h-10 mt-5 mx-3 rounded-md ${filled ? 'text-white bg-purple-1 hover:bg-purple-2 active:bg-purple-1' : 'text-purple-1 bg-white border-[1px] hover:border-2 active:border-4 border-purple-1'}`}>
            {children}
        </button>
    );
}

function FlashcardViewer() {
    const { data: flashcards, mutate: mutateFlashcards } = useApi<Flashcard[]>('flashcards');
    const [cardIndex, setCardIndex] = useState(0);
    const [showBack, setShowBack] = useState(false);

    useEffect(() => {
        setShowBack(() => false);
    }, [cardIndex])
    
    if (!flashcards || flashcards.length === 0) {
        return (<div className='mt-12 mx-auto'>No Flashcards created!</div>);
    }

    const card = flashcards[cardIndex];

    return (
        <div className='flex mx-auto mt-12 flex-col overflow-hidden'> 
            <div className='border-2 border-purple-1 w-[550px] rounded-lg break-words cursor-pointer text-xl hover:bg-purple-5' onClick={() => setShowBack(prev => !prev)}>
                <div className='px-5 pt-4 pb-3 text-center'>{card.front}</div>
                <div className={`px-5 ${showBack ? 'pb-4' : ''} pt-3 bg-purple-1 text-white text-center`}>{showBack ? card.back : ''}</div>
            </div>
            <div className='flex justify-center items-center'>
                <Button onClick={() => setCardIndex(prev => Math.max(prev - 1, 0))}>
                    Previous
                </Button>
                <div className='pt-4 text-dark-2'>{cardIndex + 1}/{flashcards.length}</div>
                <Button onClick={() => setCardIndex(prev => (prev + 1) % flashcards.length)} filled={true}>
                    Next
                </Button>
            </div>
        </div>
    );
}

export default FlashcardViewer;