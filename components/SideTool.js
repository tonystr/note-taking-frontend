function SideTool({ hidden }) {
    const Grupper = [
        {label: "DATA2500 Operativsystemer", value: 1},
        {label: "DATA2410 Datanettverk og skytjenester", value: 2}
    ]

    function FlashcardPreview({front, back}) {
        return (
            <div className="m-2 px-2 py-1 rounded-md hover:bg-purple-4 border-0 border-blue300">
                
                <p className=" text-sm "> {front}</p>
                <p className="text-xs text-dark-3">{back}</p>
            </div>
        )
    }

    function CardInput({id, header}) {
        return (
            <div className="cardinput">
                <h3 className="heading3Sidemenu">{header}</h3>
                <textarea id={id} className='w-[280px] m-2 px-2 py-1 rounded-lg' rows='3'></textarea>
            </div>
        )
    }

      
    
    return (
        <div className={hidden ? 'hidden' : ''}>
            <div className="w-[320px] h-full px-2 py-1 bg-purple-5 border-l-[1px] border-solid ">
                <h2 className="heading2Sidemenu">Add a new flashcard in:</h2>
                
                {/* Nedtrekk valg meny */}
                <select id="cardset-select" className="w-[280px] m-2 px-2 py-1 mb-3" name="Group" >
                    <option value="">--Please choose an option--</option>
                    <option value="1">DATA2500 Operativsystemer</option>
                    <option value="2">DATA2410 Datanettverk og skytjenester</option>
                </select>

                {/* Input bokser */}
                <CardInput id="cardfront" header="Card front" />
                <CardInput id="cardback" header="Card back" />
                
                {/* Preview ferdig flashcards i sett */}
                <h2 className="heading2Sidemenu">Flashcards in XXX</h2>
                <FlashcardPreview front="Hyperword" back="A way of doing multiple examples with the same word" />
                <FlashcardPreview front="Test forside forside" back="Test bakside bakside bakside bakside bakside bakside" />
                <FlashcardPreview front="Test forside forside" back="Test bakside bakside bakside bakside bakside bakside" />

                {/* Knapper */}
                <div className="px-14 border-0 border-blue500 flex justify-around">
                    <button id="flashcardadd" className="w-20 h-10 rounded-md text-white bg-purple-1 hover:bg-purple-2 active:bg-purple-1 " >Add</button>
                    <button id="flashcardcancel" className="w-20 h-10 rounded-md text-purple-1 bg-white border-[1px] hover:border-2 active:border-4 border-purple-1 " >Cancel</button>
                </div>

            </div>
        </div>
    );
}

export default SideTool;
