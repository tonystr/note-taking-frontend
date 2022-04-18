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
        <div className='border-solid border-b-[1px] border-dark-5 flex justify-around items-baseline'>
            <input
                placeholder='Enter title here...'
                className='text-dark-2 px-4 inline grow text-2xl outline-none selection:bg-purple-1 selection:text-white'
                value={title || ''}
                onChange={e => {
                    const newTitle = e.target.value;
                    setTitle(() => newTitle);
                    autosaveTitle(newTitle); 
                }}
            />
            <div className='text-dark-3 inline-block w-32 h-9 translate-y-2 text-xl text-center relative focus-within:bg-purple-1 focus-within:text-white rounded'>
                <input
                    className='cursor-pointer absolute grow inset-0 opacity-0'
                    type='date'
                    value={dateStr}
                    onChange={e => { 
                        const newDate = new Date(e.target.value);
                        setDate(() => newDate); 
                        autosaveDate(newDate); 
                    }}
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
    const { data: note } = useApi<Note>(noteId ? `notes/${noteId}` : null);

    return note ? (
        <div className='mt-12 mx-auto flex flex-col'>
            <MetaInfo 
                noteId={noteId}
                title={note.header}
                mutateSidebar={mutateSidebar}
                date={new Date(note.updatedAt)}
            />
            <TextArea 
                noteId={noteId}
                data={note.details}
            />
        </div>
    ) : (
        <div className='mt-12 mx-auto'>
            Loading...
        </div>
    );
}

export default TextEditor;
