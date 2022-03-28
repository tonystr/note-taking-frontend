import { useState } from 'react'
import { Note } from 'types';
import { useApi } from 'utils/api';
import Toolbar from 'components/Toolbar';
import Sidebar from 'components/Sidebar';
import TextEditor from 'components/TextEditor';
import SideTool from 'components/SideTool'

function NoteEditor() {
    const [noteId, setNoteId] = useState<string>(null);
    const [sideTool, setSideTool] = useState<string>(null);
    const { data: notes, mutate: mutateNotes } = useApi<Note[]>('notes');

    return (
        <div className='h-screen h-full flex flex-col'>
            <Toolbar
                viewFlashcardEditor={() => setSideTool(() => 'flashcard')}
                viewQuestionEditoor={() => setSideTool(() => 'question')}
            />
            <div className="flex h-full">
                <Sidebar notes={notes} mutateNotes={mutateNotes} noteId={noteId} setNoteId={setNoteId} />
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
