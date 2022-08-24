// importing other stuff, utility functions for:
// working with supabase:
import { checkAuth, signOutUser, createListItem } from './fetch-utils.js';
// pure rendering (data --> DOM):

/*  "boiler plate" auth code */
// checking if we have a user! (will redirect to auth if not):
// can optionally return the user:
checkAuth();

// sign out link:
const signOutLink = document.getElementById('sign-out-link');
signOutLink.addEventListener('click', signOutUser);
/* end "boiler plate auth code" */


// grab needed DOM elements on page:
const formEl = document.getElementById('form');

// local state:
let groceryList = [];


formEl.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const data = new FormData(formEl);
    
    const grocery = {
        item: data.get('item'),
        quantity: data.get('quantity'),
    };
    
    await createListItem(grocery);

    formEl.reset();

    displayList();

});
// display functions:

// events:
