import FlashcardIcon from "../icons/Flashcard.svg"
import QnAIcon from "../icons/Q&A.svg"


function CreateButton({id, text, children, onClick }) {
    return (
        <div
            onClick={onClick}
            id={id}
            className="
            w-32 h-20 mx-2 py-2
            text-center text-gray-600 hover:text-white hover:cursor-pointer select-none
            fill-purple-1 hover:bg-purple-1 hover:fill-white hover:shadow-sm
            border-0 border-green-600"
        >
            <div className="w-min m-auto">
                {children}
            </div>
            <div className="border-0 border-green-600">
            {text}</div>
        </div>
    );
}
function Toolbar({ viewFlashcardEditor }) {
    return (
        <div className="w-full h-20 flex text-md text-purple-1 bg-purple-5 border-b-[1px] border-dark-6">

            {/* Logo for notes */}
            <div className="
            w-64 h-full mr-5
            text-lg text-black flex justify-center items-center
            border-0 border-orange-600">

                <span className="underline">at</span><b>Campus</b> &nbsp;  notes

            </div>

            {/* Create buttons */}
            <CreateButton id="CreateFlashcard" text="Create flashcard" onClick={viewFlashcardEditor}>
                <FlashcardIcon />
            </CreateButton>

            <CreateButton id="CreateQnA" text="Create QnA" >
                <QnAIcon />
            </CreateButton>

        </div>
    )
}

export default Toolbar
