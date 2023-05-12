let slide=document.querySelector(".slider");
let length=document.querySelector("[datalengthnumber");
const passwordDisplay = document.querySelector("[datapassworddisplay]");
const copyMsg = document.querySelector("[datacopymsg]");
const copyBtn = document.querySelector("[datacopy]");
let indicator=document.querySelector("[dataindicator]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const generateBtn = document.querySelector(".generatebutton");


//aisa karne se jitne bhi input type =checkbox rahenge wo sab select ho jayenge;
const allCheckBox = document.querySelectorAll("input[type=checkbox]");

const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

let password = "";
let passwordlength = 10;
let checkCount = 0;


function handleslider(){

    //slide.value=passwordlength kiya hai because hum chahte hai ki jab hum  reload kre to hamara slider mid me na ho passwordlength position par ho;
    slide.value=passwordlength;

    //ham html me jo value 0 diye hai length ka usko reload karne par passwordlength par rakhna chahte hai so length ke inner text me passwordlength set kar diya hai
    length.innerText=passwordlength;
}
//hame function ko execute karne ke liye use call krna padega;
handleslider();

function setindicator(color){
    indicator.style.backgroundColor=color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;

}

//get random function ek baar bana lenge then usko har baar uppercase lowercase symbols me use karenge to get random value in password; 
function getrandominteger(min,max){
    // math.random function return integer between 0 and 1 usme max-min add karne se it return random number from 0 to max-min then usme min add karne se it return number from min to max;
    return Math.floor(Math.random()*(max-min))+min;
} 



//now we make functions to get random integer uppercase lowercase symbols
function generaterandominteger(){
    return getrandominteger(0,9);
}
function generaterandomuppercase(){
    return String.fromCharCode(getrandominteger(65,91));
}
function generaterandomlowercase(){
    return String.fromCharCode(getrandominteger(65,91))
}
function generaterandomsymbols(){
    const randnum=getrandominteger(0,symbols.length);
return symbols.charAt(randnum);
}
//below function is to fill the color in the circle according to strength 
//firstly we make four variable for for checkboxes and assign false initially to them 
//then we apply checked property i.e if uppercase.checked  then uske corresponding variable ko true kar denge

function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;
  //we apply color for different conditions to circle in div;
    if (hasUpper && hasLower && (hasNum || hasSym) && passwordlength >= 8) {
      setindicator("#0f0");
    } else if (
      (hasLower || hasUpper) &&
      (hasNum || hasSym) &&
      passwordlength >= 6
    ) {
    setindicator("#ff0");
    } else {
      setindicator("#f00");
    }
}

//we make function for copy button basically what we do is that we make function for all work which we want to
//do then we app;y eddent listner to to implement that functions;
async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
    }
    catch(e) {
        copyMsg.innerText = "Failed";
    }
    //to make copy wala span visible
    copyMsg.classList.add("active");

    //we use set timeout function to remove the active property after 2s i.e jo copied wala text dikh raha hai usko 2s baad gayab bhi karna hai;
    setTimeout( () => {
        copyMsg.classList.remove("active");
    },2000);

}
//below is the fisher Yates method to get suffled values from array
function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

function handleCheckBoxChange() {
    checkCount = 0;

    //below for each loop means allcheckbox me jo sab checkbox hai unpar condition apply kar raha hai;
    allCheckBox.forEach( (checkbox) => {
        if(checkbox.checked)
            checkCount++;
    });

    //special condition
    if(passwordlength < checkCount ) {
        passwordlength = checkCount;
        handleslider();
    }
}

//Now ab hum event listner lagayenge

//below event listner means if there is any change in the checkbox whether it is tick or untick then ham kitne checkbox checked hai uska 
//count starting se check karnege for each changes takes place by passing handlecheckbox function in eventlistner
//event listner me change and function pass kiya hai means changes hone par ye function execute karna hai;
allCheckBox.forEach( (checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
})

slide.addEventListener('input', (e) => {
    passwordlength = e.target.value;
    handleslider();
})


copyBtn.addEventListener('click', () => {
    //this event listner means agar password wale section me kuchh likha rahega tabhi click karne copycontent wal function execute hoga
    // jisme copied wala message show hoga on clicking;
    if(passwordDisplay.value)
        copyContent();
})

generateBtn.addEventListener('click', () => {
    //none of the checkbox are selected

    if(checkCount == 0) 
        return;

    if(passwordlength < checkCount) {
        passwordlength = checkCount;
        handleslider();
    }

    // let's start the jouney to find new password
    console.log("Starting the Journey");
    //remove old password
    password = "";

    //let's put the stuff mentioned by checkboxes

    // if(uppercaseCheck.checked) {
    //     password += generateUpperCase();
    // }

    // if(lowercaseCheck.checked) {
    //     password += generateLowerCase();
    // }

    // if(numbersCheck.checked) {
    //     password += generateRandomNumber();
    // }

    // if(symbolsCheck.checked) {
    //     password += generateSymbol();
    // }

    let funcArr = [];

    if(uppercaseCheck.checked)
        funcArr.push(generaterandomuppercase);

    if(lowercaseCheck.checked)
        funcArr.push(generaterandomlowercase);

    if(numbersCheck.checked)
        funcArr.push(generaterandominteger);

    if(symbolsCheck.checked)
        funcArr.push(generaterandomsymbols);

    //compulsory addition
    for(let i=0; i<funcArr.length; i++) {
        password += funcArr[i]();
    }
    console.log("COmpulsory adddition done");

    //remaining adddition
    for(let i=0; i<passwordlength-funcArr.length; i++) {
        let randIndex = getrandominteger(0 , funcArr.length);
        console.log("randIndex" + randIndex);
        password += funcArr[randIndex]();
    }
    console.log("Remaining adddition done");
    //shuffle the password
    password = shufflePassword(Array.from(password));
    console.log("Shuffling done");
    //show in UI
    passwordDisplay.value = password;
    console.log("UI adddition done");
    //calculate strength
    calcStrength();
});




