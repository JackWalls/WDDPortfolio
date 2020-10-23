export default {
    getJSON,
    setJSON
}
function getJSON(key) {
    return JSON.parse(localStorage.getItem(key));
}

function setJSON(key, _JSON) {
    localStorage.setItem(key,_JSON);
}