import { useState } from 'react'
import { Note } from 'types';
import { useApi } from 'utils/api';
import Toolbar from 'components/Toolbar';
import Sidebar from 'components/Sidebar';
import TextEditor from 'components/TextEditor';
import SideTool from 'components/SideTool'

function NoteEditor() {
    const [sideTool, setSideTool] = useState<string>(null);
    const { data: notes } = useApi<Note[]>('notes');

    // For debugging, we use the first note
    const noteId = notes && notes[0]?.id;

    return (
        <div className='h-screen h-full flex flex-col'>
            <Toolbar
                viewFlashcardEditor={() => setSideTool(() => 'flashcard')}
                viewQuestionEditoor={() => setSideTool(() => 'question')}
            />
            <div className="flex h-full">
                <Sidebar />
                {noteId !== null ? <TextEditor noteId={noteId} /> : 'No note selected :)'}
                <SideTool
                    visible={sideTool !== null}
                    tool={sideTool}
                    hide={() => setSideTool(() => null)}
                />
            </div>
        </div>
    )
}

export default NoteEditor;
