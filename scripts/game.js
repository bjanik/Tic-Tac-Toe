const name1 = document.querySelector("#name1");
const name2 = document.querySelector("#name2");
// const submit1btn = document.querySelector("#name1submit");
const submit2btn = document.querySelector("#name2submit");
const storeName1 = document.querySelector("#storeName1");
const storeName2 = document.querySelector("#storeName2");

submit2btn.addEventListener('click', greet);

function greet() {
    if (name1.value.length > 0 && name2.value.length > 0) {
        storeName2.innerText = `Hello, dear ${name1.value} and ${name2.value}, welcome to the game!`;
    } else {
        storeName2.innerText = 'Please put a valid name';
    }
}
    


