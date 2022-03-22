import { useState } from 'react';
import { useFlashcards, useQuestions } from '../hooks/api'

function FlashcardPreview({ front, back }) {
    return (
        <div className="m-2 px-2 py-1 rounded-md hover:bg-purple-4 border-0 border-blue300">
            <p className=" text-sm "> {front}</p>
            <p className="text-xs text-dark-3">{back}</p>
        </div>
    );
}

function CardInput({ id, header, placeholder, rows=3 }) {
    return (
        <div className="cardinput">
            <h3 className="text-sm text-dark-2 ml-4">{header}</h3>
            <textarea id={id} placeholder={placeholder} className='w-[280px] m-2 mt-1 px-2 py-1 rounded-lg border-solid border-[1px] border-purple-4 shadow-sm outline-none focus:border-transparent focus:ring-2 focus:ring-purple-3' rows={rows} />
        </div>
    );
}

function QuestionTool({ groups }) {
    const [set, setSet] = useState('');
    const questions = useQuestions();


    console.log(questions);

    return (
        <div>
            <h2 className="heading2Sidemenu">Ask a question in:</h2>

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
            <CardInput id="question" header="Question" placeholder="Write a question here" rows={8} />

            {/* Preview ferdig flashcards i sett */}
            {set === '' ? null : (
                <div>
                    <h2 className="heading2Sidemenu">
                        Relevant questions in {groups.find(g => g.value === +set)?.label}:
                    </h2>
                    {questions.map(question => (
                        <FlashcardPreview front={question.question} key={question.id} />
                    ))}
                </div>
            )}
        </div>
    );
}

function FlashcardTool({ groups }) {
    const [set, setSet] = useState('');
    const flashcards = useFlashcards();

    return (
        <div>
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
            <CardInput id="cardfront" header="Question" placeholder="Write a question here" rows={3} />
            <CardInput id="cardback" header="Answer" placeholder="Write the answer here" rows={4} />

            {/* Preview ferdig flashcards i sett */}
            {set === '' ? null : (
                <div>
                    <h2 className="heading2Sidemenu">
                        Flashcards in {groups.find(g => g.value === +set)?.label}:
                    </h2>
                    {flashcards.map(card => (
                        <FlashcardPreview front={card.front} back={card.back} key={card.id} />
                    ))}
                </div>
            )}
        </div>
    );
}

function SideTool({ tool, visible, hide }) {
    const groups = [
        { label: "DATA2500 Operativsystemer", value: 1 },
        { label: "DATA2410 Datanettverk og skytjenester", value: 2 }
    ];

    const Tool = tool === 'flashcard' ? FlashcardTool : QuestionTool;

    return (
        <div className='w-[320px]'>
            <div className={`${visible ? '' : 'hidden'} relative h-full px-2 py-1 bg-purple-5 border-l-[1px] border-solid border-dark-6 flex flex-col`}>
                <button className='absolute right-4 top-4 text-dark-3' onClick={() => hide()}>X</button>

                <Tool groups={groups} />

                <div className='grow' />

                {/* Knapper */}
                <div className="px-14 border-0 my-2 border-blue500 flex justify-around">
                    <button className="w-20 h-10 rounded-md text-white bg-purple-1 hover:bg-purple-2 active:bg-purple-1 " >Add</button>
                    <button onClick={() => hide()} className="w-20 h-10 rounded-md text-purple-1 bg-white border-[1px] hover:border-2 active:border-4 border-purple-1 " >Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default SideTool;
