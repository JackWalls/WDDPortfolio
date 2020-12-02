'use strict';
let profiles = [
    {name: "Ben", results: [150, 200], length: 2}
    ];
import ls from './ls.js';
class Data {
    constructor(list, table) {
        //this.profiles = ls.getProfiles();
        this.profiles = profiles;
        this.list = list;
        this.table = table;
    }

    addEntry(entry) {
        this.updateMean(entry);
        this.updateTable(entry);
    }
    updateMean(entry){
        let sum = 0;
        this.record.results.push(entry);
        this.record.results.forEach(element => sum += element);
        return sum / this.record.results.length;
    }
    updateTable(entry){
        let rowEntry = `<tr>`;
    }
    changeProfile(username){
        this.record = this.profiles.find(element => element.name === username);
    }

    saveProfile(name) {
        if(this.profiles.find(record => record.name === name) === undefined)
            this.profiles.push({name: name, results: [], length: 0});
    }
}