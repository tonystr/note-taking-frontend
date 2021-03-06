import FolderIcon from 'icons/folder.svg'
import NotesIcon from 'icons/notes.svg'
import moreIcon from 'icons/more.png';
import pfpIcon from 'icons/pfp_icon.png';
import { useEffect, useState } from 'react'
import { Note } from 'types'
import { create, apiDelete } from 'utils/api'
import { useRouter } from 'next/router';

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

function MoreButton({ children, className='', ...props }) {
    return (
        <div {...props} className={`px-2 hover:bg-purple-4 ${className}`}>{children}</div>
    );
}

function NoteButton({ deleteNote, onClick, children, selected, ...props }) {
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
        if (showMore) {
            const hideMenu = () => setShowMore(() => false);
            setTimeout(() => {
                document.addEventListener('click', hideMenu);
            }, 20);
            return () => document.removeEventListener('click', hideMenu);
        }
    }, [showMore]);

    return (
        <Button {...props} className={`group relative ${selected ? 'bg-purple-4' : ''}`} onClick={onClick}>
            <FolderIcon className='mr-4 flex-shrink-0' />
            <span className='truncate'>{children || 'Untitled note'}</span>
            <div className='grow transition-paddig duration-100 group-hover:pr-[26px]' />
            <button onClick={() => setShowMore(prev => !prev)} className='absolute inset-0 left-auto px-3 rounded-r-md transition-all duration-100 opacity-0 group-hover:opacity-100 hover:bg-purple-3'>
                <img src={moreIcon.src} width={14} alt='' />
            </button>
            {showMore && (
                <div className='absolute left-[67%] top-[100%] z-10 shadow-sm ml-1 top-0 bg-purple-5 border-[1px] border-purple-4 rounded-md py-1'>
                    <MoreButton onClick={() => deleteNote()} className='text-red-600'>Delete</MoreButton>
                </div>
            )}
        </Button>
    )
}

function compareNotes(a, b) {
    const ad = new Date(a.updatedAt ? a.updatedAt : a.createdAt); 
    const bd = new Date(b.updatedAt ? b.updatedAt : b.createdAt);
    return +ad - +bd;
}

function Sidebar({ notes, mutateNotes, noteId, setNoteId, showFlashcardViewer }: { notes: Note[], mutateNotes: Function, noteId: String, setNoteId: Function, showFlashcardViewer: Function }) {
    const [showUserSettings, setShowUserSettings] = useState(false);
    const router = useRouter();

    const createNewNote = async () => {
        const note = await create('notes', { header: '', details: '' });
        setNoteId(() => note.id);
        mutateNotes();
    };

    const deleteNote = () => {
        apiDelete(`notes/${noteId}`)
            .then(() => {
                console.log(((notes[0].id === noteId ? notes[1]?.id : notes[0]?.id) || null));
                setNoteId(() => {
                    setTimeout(() => mutateNotes(), 20);
                    return ((notes[0].id === noteId ? notes[1]?.id : notes[0]?.id) || null)
                });
            });
    };
    
    useEffect(() => {
        if (showUserSettings) {
            const hideMenu = () => setShowUserSettings(() => false);
            setTimeout(() => {
                document.addEventListener('click', hideMenu);
            }, 20);
            return () => document.removeEventListener('click', hideMenu);
        }
    }, [showUserSettings]);

    return (
        <div className='flex flex-col text-dark-1 overflow-hidden h-full w-80 bg-purple-5 border-solid border-r-[1px] border-dark-6'>
            <div className='select-none fill-white py-3 px-4 bg-purple-1 text-white flex justify-between cursor-pointer'>
                <div className='truncate'>
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
                <span className="ml-8 truncate">Create new note</span>
            </Button>
            {notes ? notes.slice().sort(compareNotes).map(note => (
                <NoteButton 
                    deleteNote={deleteNote} 
                    onClick={() => setNoteId(() => note.id)} 
                    selected={note.id === noteId}
                    key={note.id}
                >
                    {note.header}
                </NoteButton>
            )) : null}
            <div className="grow" />
            <Button className='mb-2' onClick={showFlashcardViewer}>
                View flashcards
            </Button>
            <div 
                className="select-none bg-purple-4 px-auto py-2 px-1 flex flex-col items-center cursor-pointer relative" 
                onClick={() => setShowUserSettings(prev => !prev)}
            >
                <img src={pfpIcon.src} width={pfpIcon.width} height={pfpIcon.height} alt="User profile" />
                <span className="block group-hover:text-white text-sm text-dark-2">Profile</span>
                {showUserSettings ? (<div className='absolute bottom-[101%] shadow-sm ml-1 bg-purple-5 border-[1px] border-purple-4 rounded-md py-1'>
                    <MoreButton onClick={() => { 
                        create('peder-auth/logout'); 
                        router.push({ pathname: '/login' }) 
                    }}>
                        Logout
                    </MoreButton>
                </div>) : null}
            </div>
        </div>
    )
}

export default Sidebar
