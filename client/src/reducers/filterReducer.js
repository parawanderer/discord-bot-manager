import { FETCH_FILTER_WORDS, FETCH_FILTER_LINKS, ADD_FILTERED_WORD, DELETE_FILTERED_WORD, UPDATE_FILTERED_WORD, UPDATE_WHITELISTED_LINK, ADD_WHITELISTED_LINK, DELETE_WHITELISTED_LINK } from '../action/types';

const filterReducer = (state = null, action) => {
    switch (action.type) {
        case FETCH_FILTER_WORDS:
            if (state === null) {
                const newState = {};
                newState.words = action.payload || null;
                return newState;
            } else {
                return {...state, words :action.payload || null};
            }

        case ADD_FILTERED_WORD:

            if (state === null || state.words == null){
                return state;
            } else {

                const newWord = action.payload;
                const newState = {...state};

                for (let i = 0; i < newState.words.length; i++) {
                    const loopItem = newState.words[i];
                    if (loopItem.raw_type === newWord.raw_type) {
                        // if this is the last item of the same type, then add it here,
                        // or if it is the final item in general, add it here
                        if (i === newState.words.length-1) { // final item in total array, add here
                            newState.words.push(newWord);
                            break; 
                        }
                        else if (newState.words[i+1].raw_type !== newWord.raw_type) 
                        {
                            // this index is the final item of the same type, add it in the next position, and end here
                            newState.words.splice(i+1, 0, newWord);
                            break;
                        }
                    }
                }
                return newState;
            }
        
        case DELETE_FILTERED_WORD:

            if (state === null || state.words == null){
                return state;
            } else {
                // find which word was deleted and remove it

                const removedWord = action.payload;
                const newState = {...state};

                for (let i = 0; i< newState.words.length; i++) {
                    const loopItem = newState.words[i];
                    if (loopItem.id === removedWord.id) {
                        // this is the item to remove: remove it, end here.
                        newState.words.splice(i, 1);
                        break;
                    }
                }
                return newState;
            }

        case UPDATE_FILTERED_WORD:

            if (state === null || state.words == null){
                return state;
            } else {
                // find which word was updated and update it

                const editedWord = action.payload;
                const newState = {...state};

                for (let i = 0; i< newState.words.length; i++) {
                    const loopItem = newState.words[i];
                    if (loopItem.id === editedWord.id) {
                        // this is the item to edit: edit it, end here.
                        loopItem.id = editedWord.id;
                        loopItem.type = editedWord.type;
                        loopItem.raw_type = editedWord.raw_type;
                        loopItem.data = editedWord.data;
                        break;
                    }
                }
                return newState;
            }

        case UPDATE_WHITELISTED_LINK:

            if (state === null || state.links == null){
                return state;
            } else {
                // find which link was updated and update it

                const editedLink = action.payload;
                const newState = {...state};

                for (let i = 0; i< newState.links.length; i++) {
                    const loopItem = newState.links[i];
                    if (loopItem.id === editedLink.id) {
                        // this is the item to edit: edit it, end here.
                        loopItem.url = editedLink.url;
                        break;
                    }
                }
                return newState;
            }

        case ADD_WHITELISTED_LINK:

            if (state === null || state.links == null){
                return state;
            } else {

                const newState = {...state};
                newState.links.push(action.payload); // add the new word. 
                // It'll ALWAYS be at the end of the list since the list is ordered by ID

                return newState;
            }

        case DELETE_WHITELISTED_LINK:

            if (state === null || state.links == null){
                return state;
            } else {

                const removedLink = action.payload;
                const newState = {...state};

                for (let i = 0; i< newState.links.length; i++) {
                    const loopItem = newState.links[i];
                    if (loopItem.id === removedLink.id) {
                        // this is the item to remove: remove it, end here.
                        newState.links.splice(i, 1);
                        break;
                    }
                }
                return newState;
            }
        
        case FETCH_FILTER_LINKS:

            if (state === null) {
                const newState = {};
                newState.links = action.payload || null;
                return newState;
            } else {
                return {...state, links :action.payload || null};
            }



        default:
            return state;
    }
};

export default filterReducer;