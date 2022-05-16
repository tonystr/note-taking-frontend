import { useState } from 'react';
import Toolbar from 'components/Toolbar';
import Sidebar from 'components/Sidebar';

function FlashcardViewer() {
    return (
        <div className='h-screen flex flex-col overflow-hidden'> 
            <Toolbar
                viewFlashcardEditor={() => {}}
                viewQuestionEditoor={() => {}}
            />
            Hello
        </div>
    );
}

export default FlashcardViewer;