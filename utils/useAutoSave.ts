import { useRef } from 'react';

// Time to wait after keyboard input before autosaving
const AUTOSAVE_TIME = 3000;

export default function useAutoSave(callBack: Function) {
    const autosaveTimer = useRef<NodeJS.Timeout>();
    
    const autosave = (...args) => {
        // Reset timer if user is writing
        if (autosaveTimer.current !== null) {
            clearTimeout(autosaveTimer.current);
            autosaveTimer.current = null;
        }

        // Set new timer from now
        autosaveTimer.current = setTimeout(() => {
            callBack(...args);

            // Clear timer
            autosaveTimer.current = null;
        }, AUTOSAVE_TIME);
    };

    return autosave;
}