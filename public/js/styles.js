// toggle side bar 
let toggleSide = false;

function openNav() {
    document.getElementById("mySidebar").style.width = "250px"
    toggleSide = true;

}

function closeNav() {
    document.getElementById("mySidebar").style.width = "0"
    toggleSide = false;

}

const sidebarToggler = document.getElementById("sidebarToggler");

sidebarToggler.addEventListener("click", () => {

        !toggleSide ? openNav() : closeNav()

    })
    // navbar toggle

// calendar
document.addEventListener('DOMContentLoaded', () => {
    const calendar = new VanillaCalendar('#calendar');
    calendar.init();
});

let hidden = false;

// document.getElementById("clickHide").addEventListener("click",()=>{  

//     var calendar = document.getElementById("calendar");
//     if ( calendar.classList.contains("hidden")) {
//         calendar.classList.remove("hidden");
//         console.log("The element has the class 'hidden'");
//       } else {
//        calendar.classList.add("hidden");
//         console.log("The element does not have the class 'hidden'");
//       }





// })

document.getElementById("hideEvents").addEventListener("click", () => {

    const events = document.getElementById("events");
    if (events.classList.contains("hidden")) {
        events.classList.remove("hidden");
        console.log("The element has the class 'hidden'");
    } else {
        events.classList.add("hidden");
        console.log("The element does not have the class 'hidden'");
    }

})



// calendar