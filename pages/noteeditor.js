import Toolbar from '../components/Toolbar'
import Sidebar from '../components/Sidebar'

function NoteEditor() {
    return (
        <div className='h-full flex flex-col'>
            <Toolbar />
            <Sidebar />
        </div>
    )
}

export default NoteEditor;
