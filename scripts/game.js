const name1 = document.querySelector("#name1");
const name2 = document.querySelector("#name2");
// const submit1btn = document.querySelector("#name1submit");
const submit2btn = document.querySelector("#name2submit");
const storeName1 = document.querySelector("#storeName1");
const storeName2 = document.querySelector("#storeName2");

submit2btn.addEventListener('click', greet);

function greet() {
    storeName2.innerText = `Hello, dear ${name1.value} and ${name2.value}, welcome to the game!`;
}





// add class to all divs with foreach loop
/* {<div id="game">
<div  class="test"></div>
<div class="test"></div>
<div  class="test"></div>
<div class="test"></div>
</div>
<script type="text/javascript">
let allDivs = document.querySelectorAll("#game .test")
console.log(allDivs)

allDivs.forEach(el => {
    el.addEventListener("click", function(event) {
        let index;
        allDivs.forEach((element,i) => {
            if (event.target === element) {
                console.log(element, i)
                index=i
            }
        })
        index
    })
})
</script> }*/