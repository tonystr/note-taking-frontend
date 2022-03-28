import { useState, useRef, useEffect } from 'react';
import { useApi, update } from 'utils/api';
import { Note } from 'types';

// Time to wait after keyboard input before autosaving
const AUTOSAVE_TIME = 3000;

function MetaInfo({ title, date }) {
    //const [title, setTitle] = useState('Untitled note');
    const dateStr = date.toISOString().split('T')[0];

    return (
        <div className='border-solid border-b-[1px] border-dark-5 flex justify-around items-baseline'>
            <input
                className='text-dark-2 px-4 inline grow text-2xl outline-none selection:bg-purple-1 selection:text-white'
                value={title}
                onChange={null /*e => setTitle(() => e.target.value)*/}
            />
            <div className='text-dark-3 inline-block w-32 h-9 translate-y-2 text-xl text-center relative focus-within:bg-purple-1 focus-within:text-white rounded'>
                <input
                    className='cursor-pointer absolute grow inset-0 opacity-0'
                    type='date'
                    value={dateStr}
                    onChange={null /*e => setDate(() => e.target.value)*/}
                />
                <div className='absolute inset-0 pointer-events-none'>
                    {dateStr.slice(8, 10)}.{dateStr.slice(5, 7)}.{dateStr.slice(0, 4)}
                </div>
            </div>
        </div>
    );
}

function TextArea({ noteId, data }) {
    const [text, setText] = useState(() => data);
    const autosaveTimer = useRef<NodeJS.Timeout>();

    useEffect(() => {
        setText(() => text);
    }, [data]);

    const autosave = () => {
        // Reset timer if user is writing
        if (autosaveTimer.current !== null) {
            clearTimeout(autosaveTimer.current);
            autosaveTimer.current = null;
        }

        // Set new timer from now
        autosaveTimer.current = setTimeout(() => {
            update(`notes/${noteId}`, { details: text })

            // Clear timer
            autosaveTimer.current = null;
        }, AUTOSAVE_TIME);
    };

    return (
        <textarea
            placeholder='Begin typing here...'
            className='notes-scrollbar px-5 mt-5 grow resize-none outline-none selection:bg-purple-1 selection:text-white'
            onChange={e => {
                setText(() => e.target.value);
                autosave();
            }}
            value={text}
        />
    );
}

function TextEditor({ noteId }) {
    const { data: note } = useApi<Note>(`notes/${noteId}`);

    console.log(note);

    return note ? (
        <div className='mt-12 mx-auto flex flex-col'>
            <MetaInfo 
                title={note.noteData.header}
                date={new Date(note.updatedAt)}
            />
            <TextArea 
                noteId={noteId}
                data={note.noteData.details}
            />
        </div>
    ) : (
        <div className='mt-12 mx-auto'>
            Loading...
        </div>
    );
}

export default TextEditor
