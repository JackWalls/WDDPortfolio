'use strict';

// skipped exercise 5.4 for its odd complexity.

window.onload= () => {
    exercise61(document.getElementById("6.1"));
    exercise62(document.getElementById("6.2"));
    exercise63(document.getElementById("6.3"));
    exercise64(document.getElementById("6.4"));
};

/*****************************************************************************************
 *  Function to hold the scope and execute the exercise 6.1
 *  @param element: element in html to update
 */
function exercise61(element) {
    // Your code here.

    /*****************************************************************************************
     *  My solution, I suspected the use of a class but instead used a function to make
     *  use of the new syntax making the function into an object literal, basically treat
     *  the function as a constructor.
     */
    /*function Vec(x, y) {
        this.x = x;
        this.y = y;
        this.plus = function plus(add) {
            this.x += add.x;
            this.y += add.y;
            return this;
        };
        this.minus = function minus(sub) {
            this.x -= sub.x;
            this.y -= sub.y;
            return this;
        };
        this.length = Math.sqrt(this.x * this.x + this.y * this.y);
    }*/

    /*****************************************************************************************
     *  The actual solution was to make a constructor that would have its returns for plus
     *  and minus the constructor for a new instances of Vec, this was better than my solution
     *  due to returning 'this' would return the methods as well.
     */
    class Vec {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }

        plus(other) {
            return new Vec(this.x + other.x, this.y + other.y);
        }

        minus(other) {
            return new Vec(this.x - other.x, this.y - other.y);
        }

        get length() {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        }
    }

    const run1 = new Vec(1, 2).plus(new Vec(2, 3));
    const run2 = new Vec(1, 2).minus(new Vec(2, 3));
    const run3 = new Vec(3, 4).length;

    console.log(run1);
    // → Vec{x: 3, y: 5}
    console.log(run2);
    // → Vec{x: -1, y: -1}
    console.log(run3);
    // → 5

    element.innerText = "6.1 Results: Check console"
}

/*****************************************************************************************
 *  Function to hold the scope and execute the exercise 6.2. This exercise was on how to
 *  implement and use a static method.
 *  @param element: element in html to update
 */
function exercise62(element){
    class Group {
        // Your code here.
        constructor(arr=[]) {
            this.members = arr;
        }

        has(check) {
            return this.members.includes(check);
        }

        add(item) {
            if (!this.members.includes(item))
                this.members.push(item);
        }

        delete(item) {
            let index = this.members.indexOf(item);
            if (index !== -1)
                this.members.splice(index, 1);
        }

        static from(arr) {
            let group = new Group();
            for (let value of arr) {
                group.add(value);
            }
            return group;
        }
    }
        let text = '';
        let group = Group.from([10, 20]);
        console.log(group.has(10));
        text += group.has(10);
// → true
        console.log(group.has(30));
        text += ", " + group.has(30);
// → false
        group.add(10);
        group.delete(10);
        console.log(group.has(10));
        text += ", " + group.has(10);
        element.innerText = "6.2 Results: " + text;
// → false
}

/*****************************************************************************************
 *  Function to hold the scope and execute the exercise 6.3. The exercise was in
 *  how to implement a iterator class that the Group class will have for when
 *  one wishes to iterate through desired values in Group.
 *  @param element: element in html to update
 */
function exercise63(element) {
    class Group {
        // Your code here.
        constructor(arr=[]) {
            this.members = arr;
        }

        has(check) {
            return this.members.includes(check);
        }

        add(item) {
            if (!this.members.includes(item))
                this.members.push(item);
        }

        delete(item) {
            let index = this.members.indexOf(item);
            if (index !== -1)
                this.members.splice(index, 1);
        }

        static from(arr) {
            let group = new Group();
            for (let value of arr) {
                group.add(value);
            }
            return group;
        }

        [Symbol.iterator]() {
            return new GroupIterator(this);
        }
    }

    class GroupIterator{
        constructor(group) {
            this.group = group;
            this.index = 0;
        }
        next(){
            if(this.index === (this.group.members.length))
                return {done: true};
            let value = this.group.members[this.index];
            this.index++;
            return{value, done: false};
        }
    }

    let text = '';

    for (let value of Group.from(["a", "b", "c"])) {
        console.log(value);
        text += " " + value;
    }

    element.innerText = "6.3 Results: " + text;
// → a
// → b
// → c
}

/*****************************************************************************************
 *  Function to hold the scope and execute the exercise 6.4. This was to learn about how
 *  hasOwnProperty is not protected, so in order to circumvent this we use call to
 *  put the object and argument and have it work without conflict.
 *  @param element: element in html to update
 */
function exercise64(element) {
    let map = {one: true, two: true, hasOwnProperty: true};

// Fix this call
    console.log(Object.hasOwnProperty.call(map,"one"));
    element.innerText = "6.4 Results: " + Object.hasOwnProperty.call(map,"one");
// → true
}