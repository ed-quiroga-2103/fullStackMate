import VueCookies from "vue-cookies";


export const isLogged = async() => {

    // Check if cookie exists
    const token = VueCookies.get('session_token');
    // if the token exists, the user is logged
    return token === undefined;

}