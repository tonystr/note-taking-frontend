import { useEffect, useState } from 'react'
import { Note } from 'types';
import { useApi } from 'utils/api';
import Toolbar from 'components/Toolbar';
import Sidebar from 'components/Sidebar';
import TextEditor from 'components/TextEditor';
import SideTool from 'components/SideTool'
import FlashcardViewer from '../components/FlashcardViewer';
import { useRouter } from 'next/router';

function NoteEditor() {
    const [noteId, setNoteId] = useState<string>(null);
    const [sideTool, setSideTool] = useState<string>(null);
    const { data: sets, mutate: mutateSets } = useApi<any[]>('flashcardsSet') || { data: [], mutate: () => {} };
    const { data: notes, mutate: mutateNotes, isValidating } = useApi<Note[]>('notes');
    const router = useRouter();

    // Generate flashcard sets if none exist
    useEffect(() => {
        if (Array.isArray(sets) && sets.length === 0) {
            const createFlashcardSet = (name) => {
                return fetch('/api/flashcardsSet', {
                    method: 'POST',
                    body: JSON.stringify({ name }),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                })
                    .then(() => { mutateSets() });
            };

            createFlashcardSet('DATA2500 Operativsystemer');
            createFlashcardSet('DATA2410 Datanettverk og skytjenester');
            createFlashcardSet('DATA3100 Kunstlig intelligens');
            createFlashcardSet('DATA3710 Praktisk IT-prosjekt');
        }
    }, [sets])

    // Auto select first note upon fetch
    useEffect(() => {
        // @ts-ignore
        if (!isValidating && notes?.message === 'Forbidden') {
            router.push({ pathname: '/login' });
        } else if (notes && !isValidating && noteId === null) {
            //setNoteId(notes[0]?.id || null);
        }
    }, [noteId, notes, isValidating]);

    console.log(noteId);

    return notes && Array.isArray(notes) ? (
        <div className='h-screen flex flex-col overflow-hidden'>
            <Toolbar
                viewFlashcardEditor={() => setSideTool(() => 'flashcard')}
                viewQuestionEditoor={() => setSideTool(() => 'question')}
            />
            <div className="flex w-full h-full">
                <Sidebar showFlashcardViewer={() => setNoteId(() => 'flashcard-viewer')} notes={notes} mutateNotes={mutateNotes} noteId={noteId} setNoteId={setNoteId} />
                {noteId === 'flashcard-viewer' ? (
                    <FlashcardViewer />
                ) : (
                    noteId !== null ? <TextEditor noteId={noteId} mutateSidebar={mutateNotes} /> : 'No note selected :)'
                )}
                <SideTool
                    visible={sideTool !== null}
                    tool={sideTool}
                    hide={() => setSideTool(() => null)}
                />
            </div>
        </div>
    ) : <div>Loading...</div>
}

export default NoteEditor;
