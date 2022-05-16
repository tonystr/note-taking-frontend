import { useState, useEffect } from 'react';
import { useApi, update } from 'utils/api';
import { Note } from 'types';
import useAutoSave from 'utils/useAutoSave';

function MetaInfo({ noteId, title: titleSource, mutateSidebar, date: dateSource }) {
    const [title, setTitle] = useState(titleSource);
    const [date, setDate] = useState(dateSource);
    const dateStr = date.toISOString().split('T')[0];
    const autosaveTitle = useAutoSave((header: String) => {
        update(`notes/${noteId}`, { header });
        mutateSidebar();
    }, 1000, 400);
    const autosaveDate = useAutoSave((updatedAt: Date) => {
        update(`notes/${noteId}`, { updatedAt });
        mutateSidebar();
    });
        
    useEffect(() => {
        setTitle(() => titleSource);
    }, [titleSource, noteId]);
    
    useEffect(() => {
        setDate(() => dateSource);
    }, [dateSource, noteId]);

    return (
        <div className='border-solid border-b-[1px] border-dark-5 flex justify-between items-end'>
            <input
                placeholder='Enter title here...'
                className='text-dark-2 px-4 inline grow text-xl outline-none selection:bg-purple-1 selection:text-white text-wrap'
                value={title || ''}
                onChange={e => {
                    const newTitle = e.target.value;
                    setTitle(() => newTitle);
                    autosaveTitle(newTitle); 
                }}
            />
            <div className='flex items-end justify-end text-dark-3 inline-block w-52 h-9 text-sm relative focus-within:bg-purple-1 focus-within:text-white rounded'>
                <span>Last updated: </span>
                <div className='inset-0 pointer-events-none'>
                    {dateStr.slice(8, 10)}.{dateStr.slice(5, 7)}.{dateStr.slice(0, 4)}
                </div>
            </div>
        </div>
    );
}

function TextArea({ noteId, data }) {
    const [text, setText] = useState(() => data);
    const autosave = useAutoSave((details: String) => 
        update(`notes/${noteId}`, { details }));

    useEffect(() => {
        setText(() => data);
    }, [data, noteId]);

    return (
        <textarea
            placeholder='Begin typing here...'
            className='notes-scrollbar px-5 mt-5 grow resize-none outline-none selection:bg-purple-1 selection:text-white'
            onChange={e => {
                setText(() => e.target.value);
                autosave(e.target.value);
            }}
            value={text || ''}
        />
    );
}

function TextEditor({ noteId, mutateSidebar }) {
    const { data: note, isValidating } = useApi<Note>(noteId ? `notes/${noteId}` : null);

    return isValidating ? (
        <div className='mt-12 pl-12 mx-auto w-full flex flex-col'>
            Loading...
        </div>
    ) : (
        note ? (
            <div className='mt-12 pl-12 mx-auto w-full flex flex-col'>
                <MetaInfo 
                    noteId={noteId}
                    mutateSidebar={mutateSidebar}
                    title={note.header}
                    date={new Date(note.updatedAt)}
                />
                <TextArea 
                    noteId={noteId}
                    data={note.details}
                />
            </div>
        ) : (
            <div className='mt-12 mx-auto text-dark-3'>
                Create a new note from the menu to the left...
            </div>
        )
    );
}

export default TextEditor;
