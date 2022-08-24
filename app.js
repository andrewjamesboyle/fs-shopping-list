// importing other stuff, utility functions for:
// working with supabase:
import { checkAuth, signOutUser, createListItem, getGroceries, updateListItem } from './fetch-utils.js';
import { renderGrocery } from './render-utils.js';
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
const listEl = document.getElementById('list-container');


let groceries = [];


formEl.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const data = new FormData(formEl);
    
    const grocery = {
        item: data.get('item'),
        quantity: data.get('quantity'),
    };
    
    await createListItem(grocery);

    formEl.reset();

    await displayList();

});

async function displayList() {
    listEl.innerHTML = '';

    groceries = await getGroceries();

    for (let grocery of groceries) {
        const list = await renderGrocery(grocery);
        listEl.append(list);


        list.addEventListener('click', async () => {
            await updateListItem(grocery.id);
        
            await displayList();
        });
    }
}

async function loadData() {
    await displayList();
}

loadData();

// events: