import FlashcardIcon from "../icons/Flashcard.svg"
import QnAIcon from "../icons/Q&A.svg"
import BlackHole from "../icons/Q&A.svg"


function Toolbar() {

    function CreateButton({id, text, children }) {
 
        return (
            <div id={id} className="
            w-32 h-20 mx-2 py-2
            text-center text-gray-600 hover:text-white
            fill-purple-1 hover:bg-purple-1 hover:fill-white hover:shadow-sm
            border-0 border-green-600">
                <div className="w-min m-auto">
                    {children}
                </div>
                <div className="border-0 border-green-600">
                {text}</div>
            </div>
            )
    }

    return (
        
        <div className="w-full h-20 flex text-md text-purple-1 bg-purple-5 shadow-sm">
            
            {/* Logo for notes */}
            <div className="
            w-64 h-full 
            text-lg text-black flex justify-center items-center
            border-0 border-orange-600">
                at<b>Campus</b>  notes
            </div>

            {/* Create buttons */}
            <CreateButton id="CreateFlashcard" text="Create flashcard">
                <FlashcardIcon />
            </CreateButton>

            <CreateButton id="CreateQnA" text="Create QnA" > 
                <QnAIcon />
            </CreateButton>

            <CreateButton id="CreateQnA" text="Create Dark Void" > 
                <QnAIcon />
            </CreateButton>
            
        </div>
    )
}

export default Toolbar
