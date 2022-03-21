import { useState } from 'react';

function MetaInfo() {
    const [title, setTitle] = useState('Untitled note');
    const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);

    return (
        <div className='border-solid border-b-[1px] border-dark-5 flex justify-around items-baseline'>
            <input
                className='text-dark-2 px-4 inline grow text-2xl outline-none'
                value={title}
                onChange={e => setTitle(() => e.target.value)}
            />
            <div className='text-dark-3 inline-block w-32 h-9 translate-y-2 text-xl text-center relative'>
                <input
                    className='absolute grow inset-0 opacity-0'
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
    return (
        <textarea placeholder='Begin typing here...' className='p-5 pb-0 grow resize-none'>
        </textarea>
    );
}

function TextEditor() {
    return (
        <div className='mt-12 mx-auto w-2/5 flex flex-col'>
            <MetaInfo />
            <TextArea />
        </div>
    );
}

export default TextEditor
