import FolderIcon from 'icons/folder.svg'
import NotesIcon from 'icons/notes.svg'
import { SetStateAction } from 'react'
import { Note } from 'types'
import { create } from 'utils/api'

function Button({ onClick, children, className='', ...props }) {
    return (
        <div {...props} onClick={onClick} className={`
            select-none
            p-2 flex px-3 mx-2 cursor-pointer
            hover:bg-purple-4 rounded-md
            transition-colors duration-100
            items-center
            ${className}
        `}>
            {children}
        </div>
    )
}

function NoteButton({ onClick, children, ...props }) {
    return (
        <Button {...props} onClick={onClick}>
            <FolderIcon className='mr-4 flex-shrink-0' />
            <span className='truncate'>{children}</span>
        </Button>
    )
}

function Sidebar({ notes, mutateNotes, noteId, setNoteId }: { notes: Note[], mutateNotes: Function, noteId: String, setNoteId: Function }) {
    const createNewNote = async () => {
        const note = await create('notes');
        setNoteId(() => note.id);
        mutateNotes();
    };

    return (
        <div className='flex flex-col text-dark-1 h-full w-64 bg-purple-5 border-solid border-r-[1px] border-dark-6'>
            <div className='select-none fill-white py-3 px-4 bg-purple-1 text-white flex justify-between cursor-pointer'>
                <div>
                    <NotesIcon className='inline mr-4' />
                    Study notes
                </div>
                {notes && (
                    <div className="bg-white px-2 rounded-full text-purple-1">
                        {notes.length}
                    </div>
                )}
            </div>
            <Button onClick={() => createNewNote()} className="relative mb-4 mt-1">
                <span className="text-xl font-thin absolute top-0">+</span>
                <span className="ml-8">Create new note</span>
            </Button>
            {notes ? notes.map(note => (
                <NoteButton onClick={() => setNoteId(() => note.id)} key={note.id}>{note.noteData.header}</NoteButton>
            )) : null}
            <div className="grow" />
            <div className="select-none bg-purple-4 px-auto py-2 px-1 flex flex-col items-center">
                <img src="https://cdn-01.atcampus.no/avatar/46b4269a-b506-433e-a331-3ad57615f85c.jpg" className="rounded-full w-[40px]" />
                <span className="block group-hover:text-white text-sm text-dark-2">Profile</span>
            </div>
        </div>
    )
}

export default Sidebar
