const SUPABASE_URL = 'https://mgjjrgtykxiobwzymixr.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1nampyZ3R5a3hpb2J3enltaXhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjA2NjY0MDEsImV4cCI6MTk3NjI0MjQwMX0.8PKMkwnFkOt84_8IcQMvY3lLAqxYUz7LZljaruRWLPo';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* Auth related functions */

export async function createListItem(grocery) {
    const response = await client.from('groceries').insert(grocery).single();
    return response;
}

export async function getGroceries() {
    const response = await client.from('groceries').select('*');
    console.log(response.data);
    return response.data;
}

export function getUser() {
    return client.auth.user();
}

export function checkAuth() {
    const user = getUser();
    // do we have a user?
    if (!user) {
        // path is different if we are at home page versus any other page
        const authUrl = location.pathname === '/' ? './auth/' : '../auth/';
        // include the current url as a "redirectUrl" search param so user can come
        // back to this page after they sign in...
        location.replace(`${authUrl}?redirectUrl=${encodeURIComponent(location)}`);
    }

    // return the user so can be used in the page if needed
    return user;
}

export async function signUpUser(email, password) {
    return await client.auth.signUp({
        email,
        password,
    });
}

export async function signInUser(email, password) {
    return await client.auth.signIn({
        email,
        password,
    });
}

export async function signOutUser() {
    return await client.auth.signOut();
}

/* Data functions */
