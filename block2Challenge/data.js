'use strict';
import ls from './ls.js';
const key = "reactionTimeTest_by_JackWalls";


export default class Data {
    constructor(mean, meanCount, table, list, currProfile) {
        this.profiles = ls.getJSON(key) !== null ? ls.getJSON(key) : [];
        this.record = {name: '', results: [], length: 0};
        this.mean = mean;
        this.meanCount = meanCount;
        this.table = table;
        this.list = list;
        this.currProfile = currProfile;
        this.index = -1;
        this.initList();
        this.initTable();
        this.updateMean();
    }

    /************************************************************************************************
     * Function handles new entry to results.
     * @param entry
     */
    addEntry(entry) {
        this.record.results.push(entry);
        this.record.length++;
        if(this.index !== -1)
            this.profiles[this.index] = this.record;
        ls.setJSON(key, JSON.stringify(this.profiles));
        this.updateMean();
        this.updateTable(entry);
    }

    /************************************************************************************************
     * Update mean displayed to user.
     */
    updateMean(){
        if(this.record.length === 0) {
            this.meanCount.innerText = "Take the test";
            this.mean.innerText = '---';
        }
        else {
            this.meanCount.innerText = `Your Average Time out of ${this.record.length} Tests`;
            let sum = 0;
            this.record.results.forEach(element => sum += element);
            this.mean.innerText = (Math.round(sum / this.record.length)).toFixed(2) + " milliseconds";
        }
    }

    /************************************************************************************************
     *
     * @param entry
     */
    updateTable(entry){
        let newRow = document.createElement('tr');
        newRow.innerHTML = `<td style="text-align: left; width: 3.5em;">${this.record.length}</td>
                            <td style="text-align: left">${entry}</td>
                            <td style="text-align: right; border-right: 1px solid black;">milliseconds</td>`;
        this.table.appendChild(newRow);
    }

    /************************************************************************************************
     * Look through list of profiles and find the index, change record to profile.
     * @param username: Name given to search for.
     */
    changeProfile(username){
        if(this.record.name !== username) {
            this.index = this.profiles.findIndex((record) => record.name === username);
            this.record = this.profiles[this.index];
            this.currProfile.innerText = "Current Profile: " + this.record.name;
            this.updateMean();
            this.initTable();
        }
    }

    /************************************************************************************************
     * Handles adding new profiles to array this.profiles, updates local storage as well. Validation
     * in place to avoid duplicates.
     * @param name: New name for the record.
     * @returns {number}: Boolean check, 1 successful save, 0 on failure.
     */
    saveProfile(name) {
        // Only add if there is not record of the same name
        if((this.profiles.find(record => record.name === name) === undefined) && name !== '') {
            if(this.index === -1) {
                this.record.name = name;
                this.profiles.push(this.record);
                this.index = this.profiles.length - 1;
                ls.setJSON(key, JSON.stringify(this.profiles));
                this.updateList(this.record);
                this.currProfile.innerText = this.record.name;
            }
            else {
                this.profiles.push({name: name, results: [], length: 0});
                ls.setJSON(key, JSON.stringify(this.profiles));
                this.updateList({name: name, results: [], length: 0});
            }
            return 1;
        }
        return 0;
    }

    /************************************************************************************************
     * On construct, update list with records from profiles.
     */
    initList() {
        let html ='<option value="-1">--Select Profile--</option>';
        this.profiles.forEach(record => html += `<option value="${record.name}">${record.name}</option>`);
        this.list.innerHTML = html;
    }

    /************************************************************************************************
     * Updates dropdown list of available profiles.
     * @param record: New record to add to list.
     */
    updateList(record){
        // Create element to add to list
        let newOption = document.createElement('option');
        newOption.innerText = record.name;
        newOption.setAttribute('value', record.name);

        // Append to list
        this.list.appendChild(newOption);

    }

    initTable() {
        let rowEntry = `<tr><th colspan="3">Results:</th></tr>`;
        if(this.record.length !== 0)
            this.record.results.forEach((result, i) => rowEntry +=
                `<tr><td style="text-align: left; width: 3.5em;">${i+1}</td>
                <td style="text-align: left">${result}</td>
                <td style="text-align: right; border-right: 1px solid black;">milliseconds</td></tr>`);
        this.table.innerHTML = rowEntry;
    }
}