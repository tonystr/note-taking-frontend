import { useRef } from 'react';

const POST_AUTOSAVE_TIME = 1000; // Time to wait after keyboard input before autosaving (ms)
const PERI_AUTOSAVE_TIME = 5000; // Time between each autosave during input

// Returns an autosave() function which autosaves both on an interval (peri) and after
// inputting stops (post). autosave() should be called every time input changes. 
export default function useAutoSave(callBack: Function, postTime=POST_AUTOSAVE_TIME, periTime=PERI_AUTOSAVE_TIME) {
    const postAutosaveTimer = useRef<NodeJS.Timeout>(null);
    const periAutosaveTimer = useRef<NodeJS.Timeout>(null);
    const periArgs = useRef<any[]>();
    
    const autosave = (...args) => {
        periArgs.current = args;

        if (periAutosaveTimer.current === null) {
            periAutosaveTimer.current = setTimeout(() => {
                callBack(...periArgs.current);
                periAutosaveTimer.current = null;
            }, periTime);
        }

        // Reset post-input timer if user is writing
        if (postAutosaveTimer.current !== null) {
            clearTimeout(postAutosaveTimer.current);
            postAutosaveTimer.current = null;
        }

        // Set new post-input timer from now
        postAutosaveTimer.current = setTimeout(() => {
            callBack(...args);

            // Clear timer
            postAutosaveTimer.current = null;
        }, postTime);
    };

    return autosave;
}