import { useState } from 'react'
import Toolbar from '../components/Toolbar';
import Sidebar from '../components/Sidebar';
import TextEditor from '../components/TextEditor';
import SideTool from '../components/SideTool'

function NoteEditor() {
    const [sideToolVisible, setSideToolVisible] = useState(false);

    return (
        <div className='h-screen h-full flex flex-col'>
            <Toolbar viewFlashcardEditor={() => setSideToolVisible(() => true)} />
            <div className="flex h-full">
                <Sidebar />
                <TextEditor />
                <SideTool visible={sideToolVisible} hide={() => setSideToolVisible(() => false)} />
            </div>
        </div>
    )
}

export default NoteEditor;
