function SideTool({ hidden }) {
    const Grupper = [
        {label: "DATA2500 Operativsystemer", value: 1},
        {label: "DATA2410 Datanettverk og skytjenester", value: 2}
    ]

    function FlashcardPreview({front, back}) {
        return (
            <div>
                <h3>{front}</h3>
                {back}
            </div>
        )
    }

    function CardInput({header}) {
        return (
            <div>
                <h3>{header}</h3>
                <textarea className='w-[300px] m-2 px-2 py-1 rounded-lg' rows='5'></textarea>
            </div>
        )
    }

      
    
    return (
        <div className={hidden ? 'hidden' : ''}>
            <div className="w-[320px] h-full bg-purple-4">
            <h2>Add a new flashcard in:</h2>
            {/* Nedtrekk valg meny */}
            <select name="Group" id="group-select">
                <option value="">--Please choose an option--</option>
                <option value="1">DATA2500 Operativsystemer</option>
                <option value="2">DATA2410 Datanettverk og skytjenester</option>
            </select>

            <CardInput header="Card front" />
            <CardInput header="Card back" />
            

            <h2>Flashcards in XXX</h2>
            <FlashcardPreview front="Test forside forside" back="Test bakside bakside bakside bakside bakside bakside" />
            <FlashcardPreview front="Test forside forside" back="Test bakside bakside bakside bakside bakside bakside" />
            <FlashcardPreview front="Test forside forside" back="Test bakside bakside bakside bakside bakside bakside" />

            </div>
        </div>
    );
}

export default SideTool;
