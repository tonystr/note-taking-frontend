import Toolbar from '../components/Toolbar';
import Sidebar from '../components/Sidebar';
import TextEditor from '../components/TextEditor';
import SideTool from '../components/SideTool'

function NoteEditor() {
    return (
        <div className='h-screen h-full flex flex-col'>
            <Toolbar />
            <div className="flex h-full">
                <Sidebar />
                <TextEditor />
                <SideTool hidden={false} />
            </div>
        </div>
    )
}

export default NoteEditor;
