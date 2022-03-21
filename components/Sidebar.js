import FolderIcon from '../icons/folder.svg'
import NotesIcon from '../icons/notes.svg'

function Button({ children, className='', ...props }) {
    return (
        <div {...props} className={`
            p-2 flex px-3 mx-2 cursor-pointer
            hover:bg-purple-4 rounded-md
            transition-colors duration-100
            ${className}
        `}>
            {children}
        </div>
    )
}

function NoteButton({ children }) {
    return (
        <Button>
            <FolderIcon className='mr-4 flex-shrink-0' />
            <span className='truncate'>{children}</span>
        </Button>
    )
}

function Sidebar() {
    return (
        <div className='flex flex-col text-dark-1 h-full w-64 bg-purple-5 border-solid border-r-[1px] border-dark-6'>
            <div className='fill-white py-3 px-4 bg-purple-1 text-white flex justify-between cursor-pointer'>
                <div>
                    <NotesIcon className='inline mr-4' />
                    Study notes
                </div>
                <div className="bg-white px-2 rounded-full text-purple-1">
                    5
                </div>
            </div>
            <Button className="relative mb-4 mt-1">
                <span className="text-xl font-thin absolute top-0">+</span>
                <span className="ml-8">Create new note</span>
            </Button>
            <NoteButton>atcampus tutorial</NoteButton>
            <NoteButton>DHCP tutorial</NoteButton>
            <NoteButton>Forelesning operativsystemer</NoteButton>
            <NoteButton>Untitled</NoteButton>
            <div className="grow" />
            <div className="bg-purple-4 px-auto py-2 px-1 flex flex-col items-center">
                <img src="https://cdn-01.atcampus.no/avatar/46b4269a-b506-433e-a331-3ad57615f85c.jpg" className="rounded-full w-[40px]" />
                <span className="block group-hover:text-white text-sm text-dark-2">Profile</span>
            </div>
        </div>
    )
}

export default Sidebar
