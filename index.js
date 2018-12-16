'use strict';

// VARIABLES
let inputHowForm  = "test how";
let inputWhatForm = "test what";
let inputLocation = "19125";
const keyRecipe = "0e24783ea0e0e61d97038231191d5131";
const idRecipe = "190b4f83";
const locationClientID = "24DY22E4YCK3GXZRWU2MU5SFWT2DUHPVPRR4FWXYDVAGT3ZR"; 
const locationClientSecret = "ZBQVXBNWPLEWN55ZHJO0H0REJE35SIA1FFCLT5H2CSHZAJ3Z";




// START DESSERT SELECTION
// hide start, show how WORKS
$("#formstart").submit(event => {
    event.preventDefault();
    $("#sectionstart").addClass("hidden");
    $("#sectionhow").removeClass("hidden");
    $("header").removeClass("hidden");
    $("footer").removeClass("hidden");
})



// USER HOW SELECTION
// hide how, show what WORKS
$(".selecthow").click(event => {
    event.preventDefault();
    inputHowForm = event.target.id;
    console.log(inputHowForm);
    if (inputHowForm === "buy") {
        //console.log("check if === buy access");
        openModal();
    }
    $("#sectionhow").addClass("hidden");
    $("#sectionwhat").removeClass("hidden");
})



// USER LOCATION INPUT, MODAL WINDOW
// open modal window and get zipcode or city
function openModal() {
    //console.log("check openModal access");
    document.getElementById("modalwindow").style.display="block";
    $(".submitlocation").click(event => {
        event.preventDefault();
        inputLocation = $("#inputlocation").val();
        console.log(inputLocation);
        document.getElementById("modalwindow").style.display="none";
    });
}


// USER WHAT SELECTION
// hide what, show recipes or locations
$(".selectwhat").click(event => {
    event.preventDefault();
    inputWhatForm = event.target.id;
    console.log(inputWhatForm);
    if (inputHowForm === "make") {
        getRecipes();
        $("#sectionwhat").addClass("hidden");
        $("#sectionrecipes").removeClass("hidden");
    }
    else {
        //console.log("check formwhat else access");
        getLocations();
        $("#sectionhow").addClass("hidden");
        $("#sectionwhat").addClass("hidden");
        $("#sectionlocations").removeClass("hidden");
    };
})





// APIS
function getRecipes() {
    fetch("https://api.edamam.com/search?app_id=" + idRecipe + "&app_key=" + keyRecipe + "&q=" + inputWhatForm + "&from=0&to=5")
    .then(response => response.json())
    .then(responseJson => displayRecipes(responseJson))
    //.then(responseJson => console.log(responseJson))
    ;
}

function getLocations() {
    fetch("https://api.foursquare.com/v2/venues/search?client_id=" + locationClientID + "&client_secret=" + locationClientSecret + "&v=20201230&intent=browse&limit=20&query=" + inputWhatForm + "&near=" + inputLocation + "&radius=30000")
    .then(response => response.json())
    .then(responseJson => displayLocations(responseJson))
    //.then(responseJson => console.log(responseJson))
    ;
}





// WORKING WITH DATA
function displayRecipes(responseJson) {
    // console.log("check displayRecipes accessed");
    // iterate through the items array and push them to DOM
    for (let i = 0; i < responseJson.hits.length; i++) {
        //console.log("check for loop works");
        $("#recipesresults").append(
            `<li id="onerecipe">
            <a href="${responseJson.hits[i].recipe.url}">${responseJson.hits[i].recipe.label}</a>
            <img src="${responseJson.hits[i].recipe.image}"></li>`)
        };
}

function displayLocations(responseJson) {
    //console.log("displayLocations accessed");
    for (let i = 0; i < responseJson.response.venues.length; i++) {
        //console.log("check location loop works");
        $("#locationsresults").append(
            `<li id="onelocation">
            <a href="${responseJson.response.venues[i]}">${responseJson.response.venues[i].name}</a>
            <p>${responseJson.response.venues[i].location.formattedAddress}</p>`)
        };
}



// RESTART
$(".submitrestart").click(event => {
    event.preventDefault();
    $("#sectionstart").removeClass("hidden");
    $("#sectionhow").addClass("hidden");
    document.getElementById("modalwindow").style.display="none";
    $("#sectionwhat").addClass("hidden");
    $("#sectionrecipes").addClass("hidden");
    $("#sectionlocations").addClass("hidden");
    $("#recipesresults").html("");
    $("#locationsresults").html("");
    $("#header").addClass("hidden");
    $("#footer").addClass("hidden");
    //$("#recipesheader").empty();
    //$("#locationsheader").empty();
    inputHowForm  = "test how";
    inputWhatForm = "test what";
    inputLocation = "19125";
})





// ON PAGE LOAD
$(function() {
    console.log("App loaded! Waiting for submit!");
    console.log(inputHowForm);
    console.log(inputWhatForm);
    console.log(inputLocation);
});




