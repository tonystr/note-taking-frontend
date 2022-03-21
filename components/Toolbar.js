function Toolbar() {

    function CreateButton(text, imageURL) {
            return (
                <div className="
            h-20
            border-2 border-green-600">
                {text}, {imageURL}
            </div>
            )
    }


    return (
        
        <div className="w-full h-20 flex text-md text-purple-1 bg-purple-5 shadow-sm">
            
            {/* Logo for notes */}
            <div className="
            w-64 h-full 
            text-lg text-black flex justify-center items-center
            border-2 border-orange-600">
                atCampus notes
            </div>

            <CreateButton text="Creaty" imageURL="Flashcard.svg" />
            



        </div>
    )
}

export default Toolbar
