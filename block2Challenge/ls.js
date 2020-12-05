export default {
    getJSON,
    setJSON
}

/*******************************************************************
 * This function takes a value for key to get the JSON value
 * from local storage.
 */
function getJSON(key) {
    return JSON.parse(localStorage.getItem(key));
}

/*******************************************************************
 * This function takes a value for key, and a JSON string to set
 * it to the local storage.
 */
function setJSON(key, _JSON) {
    localStorage.setItem(key,_JSON);
}