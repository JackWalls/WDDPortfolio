const url = "https://pokeapi.co/api/v2/pokemon/";

/**************************
 * Contained the controller within a class
 * in order to make the values remain within scope
 * since I had a hard time getting the fetch results
 * outside of the promise.
 *
 * I prefer this since it is more self contained, problem lies
 * with long argument list that makes the class more
 * dependent.
 */
class PokeList {
    /*******************************
     * Initializes the variables to contain the arguments
     * @param url: Holds base url for API fetch
     * @param list: Contains element node for the list to be updated
     * @param next: Contains element node for the next button
     * @param prev: Contains element node for the previous button
     * @param page: Contains element node for the page input
     * @param sub: Contains element node for form, used to detect submit event
     * @param disp: Contains element node for div that will be used to display details
     */
    constructor(url, list, next, prev, page, sub, disp) {
        this.url = url;
        this.listElement = list;
        this.next = next;
        this.prev = prev;
        this.pageElement = page;
        this.sub = sub;
        this.disp = disp;
    }

    /*******************************
     * Gets and updates the next and previous url for API navigation
     * through the list. Also for first call it sets the max number of pages
     * by dividing the total entries by the length of the results array.
     * We use the Math.ceil() method to round up.
     * @param data: Object holding properties
     */
    setURLs(data){
        this.prevURL = data.previous;
        this.nextURL = data.next;
        if(this.pages === undefined)
            this.pages = Math.ceil(data.count/data.results.length);
    }

    /*******************************
     * Used to fetch and call the functions
     * to handle the object returned from the fetch.
     * @param url: URL to fetch the data from.
     */
    update(url) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.updateList(data);
                this.setURLs(data);
            })
            .catch(error => console.log('There was an error: ', error));
    }

    /*******************************
     * Goes through the list and creates the list elements
     * to go in and be displayed in the html. Also
     * adds event listeners to each one.
     * @param data: Object containing data from fetch
     */
    updateList(data) {
        let text = '';
        for (let i = 0; i < data.results.length; i++) {
            text += `<li id="${i}">${data.results[i].name}</li>`;
        }
        this.listElement.innerHTML = text;

        for(let i = 0; i < data.results.length; i++){
            this.listElement.childNodes[i].addEventListener('click', () => {
                this.showEntry(data.results[i].url);
            });
        }
    }
    /*******************************
     * Main function used to start the class
     * and set the event listeners.
     */
    initialize() {
        this.update(this.url);

        this.prev.addEventListener('click', () => {
            if(this.prevURL !== null)
                this.update(this.prevURL);

        });
        this.next.addEventListener('click', () => {
            if(this.nextURL !== null)
                this.update(this.nextURL);
        });
        this.sub.addEventListener('submit', (event) => {
            event.preventDefault();
            if((this.pageElement.value <= this.pages) && (this.pages > 0))
                this.update(this.url + `?offset=${this.pageElement.value * 20}&limit=20"`);
            else if(this.pageElement.value === 0)
                this.update(this.url);
            else
                alert(`Out of range, Enter page number between 0 and ${this.pages}`);
        });
        this.pageElement.setAttribute('max', this.pages);
    }

    /*******************************
     * This handles getting the data of the given url.
     * Used as a callback.
     * @param url: URL to get data from
     */
    showEntry(url) {
        console.log(url);
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.disp.innerHTML = PokeList.getInnerHtml(data);
            })
            .catch(error => console.log('Error: ', error))
    }

    /*******************************
     * Gets data and parses and formats it for the elements
     * to be displayed. Works only on Pokemon API.
     * @param data: Object containing data.
     * @returns {string}: Holds all the elements.
     */
    static getInnerHtml(data) {
        let html = `<p>No. ${data.order} Name: ${data.name}`;
        if(data.types.length === 2)
            html += ` Types: ${data.types[0].type.name}, ${data.types[1].type.name}</p>`;
        else
            html += ` Types: ${data.types[0].type.name}</p>`;

        html += `<img src="${data.sprites.front_default}" alt="Pokemon Sprite"/>`;
        return html;
    }
}

window.onload = () => {
    const list = document.getElementById('list');
    const next = document.getElementById('next');
    const prev = document.getElementById('prev');
    const page = document.getElementById('page');
    const sub = document.querySelector("form");
    const disp = document.getElementById('display');

    let pokeList = new PokeList(url, list, next, prev, page, sub, disp);
    pokeList.initialize();
};

