import { useState, useRef } from 'react';
// Time to wait after keyboard input before autosaving
const AUTOSAVE_TIME = 3000;

function MetaInfo() {
    const [title, setTitle] = useState('Untitled note');
    const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);

    return (
        <div className='border-solid border-b-[1px] border-dark-5 flex justify-around items-baseline'>
            <input
                className='text-dark-2 px-4 inline grow text-2xl outline-none selection:bg-purple-1 selection:text-white'
                value={title}
                onChange={e => setTitle(() => e.target.value)}
            />
            <div className='text-dark-3 inline-block w-32 h-9 translate-y-2 text-xl text-center relative focus-within:bg-purple-1 focus-within:text-white rounded'>
                <input
                    className='cursor-pointer absolute grow inset-0 opacity-0'
                    type='date'
                    value={date}
                    onChange={e => setDate(() => e.target.value)}
                />
                <div className='absolute inset-0 pointer-events-none'>
                    {date.slice(8, 10)}.{date.slice(5, 7)}.{date.slice(0, 4)}
                </div>
            </div>
        </div>
    );
}

function TextArea() {
    const [text, setText] = useState('');
    const autosaveTimer = useRef()

    const autosave = () => {
        if (autosaveTimer.current !== null) {
            clearTimeout(autosaveTimer.current);
            autosaveTimer.current = null;
        }

        autosaveTimer.current = setTimeout(() => {
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

function TextEditor() {
    return (
        <div className='mt-12 mx-auto flex flex-col'>
            <MetaInfo />
            <TextArea />
        </div>
    );
}

export default TextEditor
