// URL for currency conversion - it lacks countries from and to ( added later in the code .... just follow it )
const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

// selects all the select tag rom HTML file
let select = document.querySelectorAll('#select') 

// it selects the amount class from the HTML elements which has the input value 
let amount = document.querySelector(".amount")

// it selects the country from which the currency is coverted
let from = document.querySelector(".from select")

// it selects the country to which the currency is converted
let to = document.querySelector(".to select")

// It select the class which includes p tag to displays the message of conversion
let msg = document.querySelector(".msg")

// It selects the button from .btn class
let btn = document.querySelector(".btn button")

// This is for the dark mode button which is not in need, right now
// let mode = document.querySelector(".btn2 button")
// console.log(select)

// here we are looping all over the select tags in the html tag and creates & adds all the data of country from countryCodes.js to the options in select dropdown.
for(let option of select){
    for (const currCode in countryList) {
        let newOption = document.createElement("option")
        newOption.innerText = currCode
        newOption.value = currCode
        if(option.name ==="from" && currCode === 'USD'){
            newOption.selected = "selected" // or we can set it to true
        }
        else if(option.name ==="to" && currCode === 'INR'){
            newOption.selected = true
        }
        option.append(newOption)
    }

    // It add a event listener which detects change in options and updates the flag of the target value i.e. the option u selected.
    option.addEventListener("change", (evt) => {
        updateFlag(evt.target)
    })
}

// Function to update flag images using flagsapi.
const updateFlag = (el) => {
    let currCode = el.value
    let cntCode = countryList[currCode]
    let url = `https://flagsapi.com/${cntCode}/flat/64.png`
    let img = el.parentElement.querySelector("img")
    img.src = url
}

// It is function to update exchange rate using currency-api. It uses async and await.
const updateExchangeRate = async() => {
    let amtValue = amount.querySelector("input").value

    if(amtValue == "" || amtValue < 0){
        amtValue = 1
        amount.value = "1"
    }

    let URL = `${BASE_URL}/${from.value.toLowerCase()}/${to.value.toLowerCase()}.json`
    let response = await fetch(URL)
    let data = await response.json()
    let rate = data[`${to.value.toLowerCase()}`]

    let conversion = rate * amtValue

    msg.querySelector("p").innerText = `${amtValue} ${from.value} = ${conversion.toFixed(2)} ${to.value}`
}

// This changes the value of conversion as soon as you enter a input
amount.querySelector("input").addEventListener("input", updateExchangeRate)


// This changes the value of conversion as soon as you enter input and press the button
btn.addEventListener("click", (evt) => {
    evt.preventDefault()
    updateExchangeRate()
})

// This provides default conversion from USD to INR as soon as page loads
window.addEventListener("load", () => {
    updateExchangeRate()
})


// This below code is added for dark mode, if it is needed someday.. hope so

// let m = 1
// mode.addEventListener("click", (evt) => {
//     evt.preventDefault()

//     if(m == 1){
//         document.querySelector(".currency-box").style.backgroundColor = "black"
//         mode.innerText = "Light Mode"
//         m = 0
//     }
//     else{
//         document.querySelector(".currency-box").style.backgroundColor = "bisque"
//         mode.innerText = "Dark Mode"
//         m = 1
//     }
// })