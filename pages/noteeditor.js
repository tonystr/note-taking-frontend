import { useState } from 'react';
import Toolbar from '../components/Toolbar';
import Sidebar from '../components/Sidebar';
import TextEditor from '../components/TextEditor';

function Editor() {
    const [title, setTitle] = useState('Untitled note');

    return (
        <div className='my-12 mx-auto w-1/3 flex flex-col'>
            <input
                className='text-dark-2 px-4 text-2xl border-solid border-b-[1px] border-dark-5 outline-none'
                value={title}
                onChange={e => setTitle(() => e.target.value)}
            />
            <TextEditor />
        </div>
    );
}

function NoteEditor() {

    return (
        <div className='h-screen h-full flex flex-col'>
            <Toolbar />
            <div className="flex h-full">
                <Sidebar />
                <Editor />
            </div>
        </div>
    )
}

export default NoteEditor;
