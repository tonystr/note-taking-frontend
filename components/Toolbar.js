import FlashcardIcon from "../icons/Flashcard.svg"
import QnAIcon from "../icons/Q&A.svg"
import atCampusLogo from '../icons/atcampus_logo_black.png';

function CreateButton({id, text, children, onClick }) {
    return (
        <div
            onClick={onClick}
            id={id}
            className="
            w-32 h-20 py-2
            text-center text-gray-600 hover:text-white hover:cursor-pointer select-none
            fill-purple-1 hover:bg-purple-1 hover:fill-white hover:shadow-sm
            border-0 border-green-600"
        >
            <div className="w-min m-auto">
                {children}
            </div>
            <div className="border-0 border-green-600 text-sm">
                {text}
            </div>
        </div>
    );
}

function Toolbar({ viewFlashcardEditor, viewQuestionEditoor }) {
    return (
        <div className="w-full h-20 flex text-md text-purple-1 bg-purple-5 border-b-[1px] border-dark-6">

            {/* Logo for notes */}
            <div className="
                w-64 h-full mr-5
                flex justify-center items-center
            ">
                <img src={atCampusLogo.src} width={atCampusLogo.width * .8} alt='' />
                <span className='ml-[9px] pb-[9px] text-[23px] font-semibold text-dark-1'>
                    notes
                </span>
            </div>

            {/* Create buttons */}
            <CreateButton id="CreateFlashcard" text="Flashcard" onClick={viewFlashcardEditor}>
                <FlashcardIcon />
            </CreateButton>

            <CreateButton id="CreateQnA" text="Question" onClick={viewQuestionEditoor}>
                <QnAIcon />
            </CreateButton>

        </div>
    )
}

export default Toolbar
