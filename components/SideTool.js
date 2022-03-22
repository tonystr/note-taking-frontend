import { useState } from 'react';

function SideTool({ visible, hide }) {
    const [set, setSet] = useState('');

    const Grupper = [
        { label: "DATA2500 Operativsystemer", value: 1 },
        { label: "DATA2410 Datanettverk og skytjenester", value: 2 }
    ]

    function FlashcardPreview({front, back}) {
        return (
            <div className="m-2 px-2 py-1 rounded-md hover:bg-purple-4 border-0 border-blue300">

                <p className=" text-sm "> {front}</p>
                <p className="text-xs text-dark-3">{back}</p>
            </div>
        )
    }

    function CardInput({ id, header, placeholder }) {
        return (
            <div className="cardinput">
                <h3 className="heading3Sidemenu">{header}</h3>
                <textarea id={id} placeholder={placeholder} className='w-[280px] m-2 px-2 py-1 rounded-lg border-solid border-[1px] border-purple-4 shadow-sm outline-none focus:border-transparent focus:ring-2 focus:ring-purple-3' rows='3'></textarea>
            </div>
        )
    }

    return (
        <div className='w-[320px]'>
            <div className={`${visible ? '' : 'hidden'} relative h-full px-2 py-1 bg-purple-5 border-l-[1px] border-solid border-dark-6 flex flex-col`}>
                <button className='absolute right-0 mr-3 text-dark-3' onClick={() => hide()}>X</button>
                <h2 className="heading2Sidemenu">Add a new flashcard in:</h2>

                {/* Nedtrekk valg meny */}
                <select
                    id="cardset-select"
                    className="w-[280px] m-2 px-2 py-1 mb-3 rounded-md bg-white cursor-pointer border-solid border-2 border-purple-4 truncate"
                    name="Group"
                    value={set}
                    onChange={e => setSet(() => e.target.value)}
                >
                    <option value="">--Please choose an option--</option>
                    <option value="1">DATA2500 Operativsystemer</option>
                    <option value="2">DATA2410 Datanettverk og skytjenester</option>
                </select>

                {/* Input bokser */}
                <CardInput id="cardfront" header="Card front" placeholder="Write card front here" />
                <CardInput id="cardback" header="Card back" placeholder="Write card back here" />

                {/* Preview ferdig flashcards i sett */}
                {set === '' ? null : (
                    <div>
                        <h2 className="heading2Sidemenu">Flashcards in {set}</h2>
                        <FlashcardPreview front="Hyperword" back="A way of doing multiple examples with the same word" />
                        <FlashcardPreview front="Test forside forside" back="Test bakside bakside bakside bakside bakside bakside" />
                        <FlashcardPreview front="Test forside forside" back="Test bakside bakside bakside bakside bakside bakside" />

                    </div>
                )}
                <div className='grow' />
                {/* Knapper */}
                <div className="px-14 border-0 my-2 border-blue500 flex justify-around">
                    <button id="flashcardadd" className="w-20 h-10 rounded-md text-white bg-purple-1 hover:bg-purple-2 active:bg-purple-1 " >Add</button>
                    <button id="flashcardcancel" className="w-20 h-10 rounded-md text-purple-1 bg-white border-[1px] hover:border-2 active:border-4 border-purple-1 " >Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default SideTool;
