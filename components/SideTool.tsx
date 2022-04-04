import { useState } from 'react';
import { Question, Flashcard, FlashcardSet } from 'types';
import { useApi, create, apiDelete } from 'utils/api';

function FlashcardPreview({ front, back, deleteCard }: { front: String, back?: String, deleteCard: Function }) {
    return (
        <div className="group m-2 px-2 py-1 rounded-md hover:bg-purple-4 relative">
            <p className="text-sm">{front}</p>
            <p className="text-xs text-dark-3">{back}</p>
            <div className='absolute top-0 right-0 bg-purple-4 pl-1 opacity-0 group-hover:opacity-100'>
                <button onClick={() => deleteCard()} className='bg-red-500 px-2 py-1 rounded-md text-white text-sm'>Delete</button>
            </div>
        </div>
    );
}

function CardInput({ value, onChange, header, placeholder, rows=3 }) {
    return (
        <div className="cardinput">
            <h3 className="text-sm text-dark-2 ml-4">{header}</h3>
            <textarea
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className='w-[280px] m-2 mt-1 px-2 py-1 rounded-lg border-solid border-[1px] border-purple-4 shadow-sm outline-none focus:border-transparent focus:ring-2 focus:ring-purple-3'
                rows={rows}
            />
        </div>
    );
}

function Select({ value, options, onChange, ...props }) {
    return ( 
        <select
            {...props}
            className="w-[280px] m-2 px-2 py-1 mb-3 rounded-md bg-white cursor-pointer border-solid border-2 border-purple-4 truncate"
            value={value}
            onChange={e => onChange(e.target.value)}
        >
            <option value="">--Please choose an option--</option>
            {options.map(option => <option key={option.value} value={option.value}>{option.text}</option>)}
        </select>
    );
}

function QuestionTool({ sets, hide }) {
    const [set, setSet] = useState('');
    const [questionInput, setQuestionInput] = useState('');
    const { data: questions, mutate: mutateQuestions } = useApi<Question[]>('qa/questions');

    return (
        <>
            <h2 className="heading2Sidemenu">Ask a question in:</h2>
            
            <Select 
                value={set}
                options={sets ? sets.map(s => ({ value: s.id, text: s.name })) : []}
                onChange={value => setSet(() => value)}
            />

            {/* Input bokser */}
            <CardInput
                value={questionInput}
                onChange={e => setQuestionInput(() => e.target.value)}
                header="Question"
                placeholder="Write a question here"
                rows={8}
            />

            {/* Preview ferdig flashcards i sett */}
            {set !== '' && sets ? (
                <div className="overflow-y-scroll">
                    <h2 className="heading2Sidemenu">
                        Relevant questions in {sets.find((s: { id: String }) => s.id === set)?.name}:
                    </h2>
                    {questions.slice().reverse().map(question => (
                        <FlashcardPreview 
                            front={question.data} 
                            key={question.id} 
                            deleteCard={() => {
                                console.log('brrr');
                                apiDelete(`qa/questions/${question.id}`)
                                    .then(() => mutateQuestions());
                            }} 
                        />
                    ))}
                </div>
            ) : null}

            <ButtonBar 
                add={() => { 
                    create('qa/questions', { data: questionInput }).then(() => {
                        mutateQuestions();
                        setQuestionInput(() => '');
                    }); 
                }} 
                cancel={hide} 
            />
        </>
    );
}

function FlashcardTool({ sets, hide }) {
    const [set, setSet] = useState('');
    const [questionInput, setQuestionInput] = useState('');
    const [answerInput, setAnswerInput] = useState('');
    const { data: flashcards, mutate: mutateFlashcards } = useApi<Flashcard[]>('flashcards');

    return (
        <>
            <h2 className="heading2Sidemenu">Add a new flashcard in:</h2>

            {/* Nedtrekk valg meny */}
            <Select 
                value={set} 
                options={sets.map(s => ({ value: s.id, text: s.name }))}
                onChange={value => setSet(() => value)}
            />

            {/* Input bokser */}
            <CardInput
                value={questionInput}
                onChange={e => setQuestionInput(() => e.target.value)}
                header="Question"
                placeholder="Write a question here"
                rows={3}
            />
            <CardInput
                value={answerInput}
                onChange={e => setAnswerInput(() => e.target.value)}
                header="Answer"
                placeholder="Write the answer here"
                rows={4}
            />

            {/* Preview ferdig flashcards i sett */}
            {set !== '' && sets ? (
                <div className="flex-shrink-1 overflow-y-scroll">
                    <h2 className="heading2Sidemenu">
                        Flashcards in {sets.find((s: { id: String }) => s.id === set)?.name}:
                    </h2>
                    {flashcards.slice().reverse().map(card => (
                        <FlashcardPreview 
                            front={card.front} 
                            back={card.back} 
                            key={card.id} 
                            deleteCard={() => {
                                apiDelete(`flashcards/${card.id}`)
                                    .then(() => mutateFlashcards());
                            }}
                        />
                    ))}
                </div>
            ) : null}

            <ButtonBar 
                add={() => {
                    create('flashcards', {
                        header: set,
                        flashcardSetId: set,
                        front: questionInput,
                        back: answerInput
                    }).then(() => {
                        mutateFlashcards();
                        setQuestionInput(() => '');
                        setAnswerInput(() => '');
                    }); 
                }}     
                cancel={hide} 
            />
        </>
    );
}

function ButtonBar({ add, cancel }) {
    return (
        <>
            <div className='grow' />
            <div className="px-14 border-0 my-2 border-blue500 flex justify-around">
                <button onClick={() => add()}    className="w-20 h-10 rounded-md text-white bg-purple-1 hover:bg-purple-2 active:bg-purple-1 " >Add</button>
                <button onClick={() => cancel()} className="w-20 h-10 rounded-md text-purple-1 bg-white border-[1px] hover:border-2 active:border-4 border-purple-1 " >Cancel</button>
            </div>
        </>
    );
}

function SideTool({ tool, visible, hide }) {
    const { data: sets } = useApi<FlashcardSet[]>('flashcardsSet') || { data: [], mutate: () => {} };

    const Tool = tool === 'flashcard' ? FlashcardTool : QuestionTool;

    return (
        <div className='w-[320px]'>
            <div className={`${visible ? '' : 'hidden'} relative h-full px-2 py-1 bg-purple-5 border-l-[1px] border-solid border-dark-6 flex flex-col`}>
                <button className='absolute right-4 top-4 text-dark-3' onClick={() => hide()}>X</button>
                <Tool sets={sets} hide={hide} />
            </div>
        </div>
    );
}

export default SideTool;
