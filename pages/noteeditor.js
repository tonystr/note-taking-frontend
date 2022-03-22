import { useState } from 'react'
import Toolbar from '../components/Toolbar';
import Sidebar from '../components/Sidebar';
import TextEditor from '../components/TextEditor';
import SideTool from '../components/SideTool'

function NoteEditor() {
    const [sideTool, setSideTool] = useState(null);

    return (
        <div className='h-screen h-full flex flex-col'>
            <Toolbar
                viewFlashcardEditor={() => setSideTool(() => 'flashcard')}
                viewQuestionEditoor={() => setSideTool(() => 'question')}
            />
            <div className="flex h-full">
                <Sidebar />
                <TextEditor />
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
