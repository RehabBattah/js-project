
let open = $(".left-nav").outerWidth();
$("nav").css("left", -open);

$("nav .fa-bars").click(function () {
    if ($("nav").css("left") == "0px") {
        $("nav").animate({ "left": -open }, 500);
        document.querySelector("#close-btn").classList.replace('fa-xmark', 'fa-bars');
        $(".i1").animate({
            opacity: "0",
            paddingTop: "400px"
        },2100);
        $(".i2").animate({
            opacity: "0",
            paddingTop: "440px"
        },2200);
        $(".i3").animate({
            opacity: "0",
            paddingTop: "480px"
        },2400);
        $(".i4").animate({
            opacity: "0",
            paddingTop: "520px"
        },2500);
        $(".i5").animate({
            opacity: "0",
            paddingTop: "560px"
        },2600);
    } else {
        $("nav").animate({ "left": 0 }, 500);
        document.querySelector("#close-btn").classList.replace('fa-bars', 'fa-xmark');
        $("nav ul li ").animate({
            opacity: "1",
            paddingTop: "0px"
        },1000)
    }
});

// search("").then(() => {
//     $(".spinner").fadeOut(500, () => {
//         // $("body").css("display", "")
//     })
// })
// ==================================

var arr = [];

async function getByLetter(letter) {
    if (letter) {
        $(".spinner").fadeIn(100)
        let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
        meals = await meals.json()
        if (meals.meals) {
            displayMeals(meals.meals)
        }
        $(".spinner").fadeOut(500)
    }
}

// =============================================================

let pages = document.getElementById("first-page");

async function search(ser){
    $(".spinner").fadeIn(100)
    let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${ser}`);
    meals = await meals.json();
    // console.log(meals);
    displayMeals(meals.meals);
    $(".spinner").fadeOut(500)
    return meals;
}
search('');

function displayMeals(arr) {
    let meals="";
    for (let i = 0; i < arr.length; i++) {
        meals+=` 
        <div class="col-md-3">
        <div onclick="getMeal('${arr[i].idMeal}')" class="img position-relative overflow-hidden rounded-2 ">
            <img src="${arr[i].strMealThumb}" class="overflow-hidden w-100" alt="">
            <div class="layer position-absolute ">
                <h2 class="position-absolute top-50 ">${arr[i].strMeal}</h2>
            </div>
        </div>
    </div>`;
    }
    pages.innerHTML = meals;
}

async function getMeal(idMeal) {
    $(".spinner").fadeIn(100)
    let meal = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
    meal = await meal.json();
    displayMeal(meal.meals[0]);   
    $(".spinner").fadeOut(500)

}
// getMeal(52774);

function displayMeal(meal) {
    let recipes = "";
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            recipes += `<li class="alert-success px-2 py-1 me-2 mb-4 rounded">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`            
        }
    }
    let tags = meal.strTags?.split(",") 
    let tagsStr = "" 
    for (let i = 0; i < tags?.length; i++) { 
        tagsStr += `<li class="alert-danger px-2 py-1 me-2 mb-4 rounded">${tags[i]}</li>`
    }
    let oneMeal = 
            ` <div class="col-md-4 mt-5">
                <img src="${meal.strMealThumb}" class="w-100 p-2" alt="" srcset="">
                <h1 class="text-center text-white fw-light">${meal.strMeal}</h1>
            </div>
            <div class="col-md-8 text-white p-2 mt-5">
                <h2 class="fw-lighter">Instructions</h2>
                <p class="meal-p">${meal.strInstructions}</p>
                <p><span class="fw-bold">Area : </span>${meal.strArea}</p>
                <p><span class="fw-bold">Category : </span>${meal.strCategory}</p>
                <h3 >Recipes :</h3>
                <ul class="d-flex flex-wrap list-unstyled my-4 " id="recipes">

                </ul>
                <h3>Tags :</h3>
                <ul class="d-flex flex-wrap list-unstyled mt-4" id="tags">
                    <li class="alert-danger px-2 py-1 me-2 mb-4 rounded">soup</li>
                </ul>
                <a href="${meal.strSource}" class="btn btn-success" target="_blank">Source</a>
                <a href="${meal.strYoutube}" class="btn btn-danger" target="_blank">Yotube</button>
             </div>`

    pages.innerHTML = oneMeal;
    document.getElementById("recipes").innerHTML = recipes;
    document.getElementById("tags").innerHTML = tagsStr;
}

// ==============================================================


async function filterByArea(ar) {
    $(".spinner").fadeOut(100)
    let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${ar}`)
    meals = await meals.json()
    displayMeals(meals.meals.slice(0,20));
    $(".spinner").fadeOut(500)
    // console.log("bi");
}
// filterByArea('')

function displayArea() {
    let area = ""
    for (let i = 0; i < arr.length; i++)
    area += `<div class="col-md-3 text-center mb-2" onclick=(filterByArea('${arr[i].strArea}'))>
              <i class="fa-solid fa-city fa-3x"></i>
              <h2 class="text-white fw-light">${arr[i].strArea}</h2>
            </div>`
   pages.innerHTML = area;
//    console.log("hi");
}

// =================================================================

async function getCategories(list) {
   let  Ca = await fetch(`https://www.themealdb.com/api/json/v1/1/${list}`);
    Ca = await Ca.json();
    return Ca;
}

// getCategories('Beef')

async function filterByCategory(category) {
    $(".spinner").fadeOut(100)
    let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    meals = await meals.json();
    // console.log(meals);
    displayMeals(meals.meals);
    $(".spinner").fadeOut(500)
}
// filterByCategory('Beef')

function displayCategories() {
    let onecateg = "";
    for (let i = 0; i < arr.length; i++) 
    onecateg += 
   `<div class="col-md-3 text-center mb-2">
        <div onclick="filterByCategory('${arr[i].strCategory}')" class="img position-relative overflow-hidden  rounded-1">
          <img src="${arr[i].strCategoryThumb}" class="w-100  rounded-1" alt="" >
          <div class="layer position-absolute">
            <h3>${arr[i].strCategory}</h3>
            <p>${arr[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
          </div>
        </div>
    </div>`;
    pages.innerHTML = onecateg;
}

// ===========================================================

async function getMainIngredient(mealName) {
    $(".spinner").fadeOut(100)
    let meal = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${mealName}`);
    meal = await meal.json();
    // console.log(meal);
    displayMeals(meal.meals);
    $(".spinner").fadeOut(500)
}
// getMainIngredient('');

function displayIngredients() {
    let ingre = "";
    for (var i = 0; i < arr.length; i++) 
    ingre += `
    <div class="col-md-3 text-center mb-2" onclick="getMainIngredient('${arr[i].strIngredient}')">
            <i class="fa-solid fa-bowl-food fa-3x "></i>
            <h2 class="text-white fw-light">${arr[i].strIngredient}</h2>
            <p class="text-white fw-light">${arr[i].strDescription.split(" ").splice(0,20).join(" ")}</p>
    </div>`
    pages.innerHTML = ingre;
}

// ===========================================================

$('.menu-list  a').click(async function (e) {
    // console.log("hi");
    let li = e.trget.getAttribute("data-link");
    document.getElementById('search-pages').innerHTML=''
    pages.innerHTML=''

    let click_event = new CustomEvent('click');
    document.querySelector('#close-btn').dispatchEvent(click_event);

    if (li == "search") {
        pages.innerHTML=''
        document.getElementById("search-pages").innerHTML = `<div class="row mt-4 mx-5 d-flex justify-content-center ">
        <div class="col-md-6 ">
            <input type="text" id="SearchName" class="form-control bg-transparent text-center p-2 fw-lighter"
                placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input type="text" id="SearchLetter" class="form-control bg-transparent text-center p-2 fw-lighter"
                placeholder="Search By First Letter">
        </div>
    </div>`;


    $("#SearchName").keyup((e) => {
        search(e.target.value)
        console.log(search(e.target.value));
    })
    $("#SearchLetter").keyup((e) => {
        getByLetter(e.target.value)
    });
    }
    // if (li == "contact") {
    //    pages.innerHTML=``

    // }

    
    // if (li == "categories") {
    //    $(".spinner").fadeOut(100)
    //     c = await getCategories(li + "categories.php")
    //     arr = c.categories.splice(0, 20);
    //     displayCategories();
    //     $(".spinner").fadeOut(500)
    // } else if (li == "are") {
    //    $(".spinner").fadeOut(100)
    //     let a = await getCategories("list.php?a=list")
    //     arr = a.meals.splice(0, 20);
    //     displayArea();
    //     $(".spinner").fadeOut(500)
    // } else if (li == "ingr") {
    //    $(".spinner").fadeOut(100)
    //     let i = await getCategories("list.php?i=list")
    //     arr = i.meals.splice(0, 20);
    //     displayIngredients();
    //     $(".spinner").fadeOut(500)

    // }


    if(li =="categories"){
        let c = await getCategories( "categories.php")
         array = c.categories.splice(0, 20);
         displayCategories()
         console.log('hi');
     }
 
     if(li == "area"){
         let a = await getCategories("list.php?a=list")
         array = a.meals.splice(0 , 20)
         console.log('r3');
         displayArea()
     }
 
     if(li == "ingredient"){
         let i = await getCategories("list.php?i=list")
         array = i.meals.splice(0 , 20)
         displayIngredients()
     }
 
     if(li == "contact"){
        pages.innerHTML = `
        
        <h2 class="text-center text-white mb-5 fw-light">Contact Us...</h2>
        <div class="col-md-6 mb-3">
        <div class="form-group">
        <input onkeyup="validation()" class="form-control bg-black text-white border-end-0 border-start-0 border-top-0 rounded-0 text-center shadow-none mb-1" type="text" id="userName"  placeholder="Enter Your Name">
            <div class="alert alert-danger bg-opacity-75 rounded-0 text-opacity-25 d-none" >
                <p class="mb-0">Special Characters and Numbers not allowed</p>
            </div>
        </div>
    </div>
    <div class="col-md-6 mb-3">
        <div class="form-group">
        <input onkeyup="validation()" class="form-control bg-black text-white border-end-0 border-start-0 border-top-0 rounded-0 text-center shadow-none mb-1" type="email" id="userEmail" placeholder="Enter Email">
        <div class="alert alert-danger bg-opacity-75 rounded-0 text-opacity-50 d-none" >
            <p class="mb-0">Enter valid email. *Ex: xxx@yyy.zzz</p>
        </div>
        </div>
    </div>
    <div class="col-md-6 mb-3">
        <div class="form-group">
        <input onkeyup="validation()" class="form-control bg-black text-white border-end-0 border-start-0 border-top-0 rounded-0 text-center shadow-none mb-1 " type="tel" id="userPhone" placeholder="Enter Phone">
        <div class="alert alert-danger bg-opacity-75 rounded-0 text-opacity-50 d-none" >
            <p class="mb-0">Enter valid Phone Number</p>
        </div>
        </div>
    </div>
    <div class="col-md-6 mb-3">
        <div class="form-group">
        <input onkeyup="validation()" class="form-control bg-black text-white border-end-0 border-start-0 border-top-0 rounded-0 text-center shadow-none mb-1"  id="userAge" placeholder="Enter Age">
        <div class="alert alert-danger bg-opacity-75 rounded-0 text-opacity-50 d-none" >
            <p class="mb-0">Enter valid Age</p>
        </div>
        </div>
    </div>
    <div class="col-md-6 mb-3">
        <div class="form-group">
        <input onkeyup="validation()" class="form-control bg-black text-white border-end-0 border-start-0 border-top-0 rounded-0 text-center shadow-none mb-1" type="password" id="userPassword" placeholder="Enter Password">
        <div class="alert alert-danger bg-opacity-75 rounded-0 text-opacity-50 d-none" ">
            <p class="mb-0">Enter valid password *Minimum eight characters, at least one letter and one number:*</p>
        </div>
        </div>
    </div>
    
    <div class="col-md-6 mb-5">
        <div class="form-group">
        <input onkeyup="validation()" class="form-control bg-black text-white border-end-0 border-start-0 border-top-0 rounded-0 text-center shadow-none mb-1" type="password" id="userRepassword" placeholder="Enter Repassword">
        <div class="alert alert-danger bg-opacity-75 rounded-0 text-opacity-50 d-none" >
            <p class="mb-0">Enter valid Repassword</p>
        </div>
        </div>
    </div>
    <div class="text-center">
    <button class="btn btn-outline-danger " disabled id="submit" >Submit</button>
    </div>
    </div>
        `
    }
    let userName = document.getElementById("userName")
    let userEmail = document.getElementById("userEmail")
    let userPhone = document.getElementById("userPhone")
    let userAge = document.getElementById("userAge")
    let userPassword = document.getElementById("userPassword")
    let userRepassword = document.getElementById("userRepassword")

    userName.addEventListener("focus", () => {
        nameToached = true
    })
    userEmail.addEventListener("focus", () => {
        emailToached = true
    })
    userPhone.addEventListener("focus", () => {
        phoneToached = true
    })
    userAge.addEventListener("focus", () => {
        ageToached = true
    })
    userPassword.addEventListener("focus", () => {
        passwordToached = true
    })
    userRepassword.addEventListener("focus", () => {
        repasswordToached = true
    })
})


let nameToached = false,
emailToached = false,
phoneToached = false,
ageToached = false,
passwordToached = false,
repasswordToached = false;


if (nameToached) {
    if (validateName()) {
        userName.classList.remove("is-invalid")
        userName.classList.add("is-valid")
        // alertName.classList.replace("d-block", "d-none")

    } else {
        userName.classList.replace("is-valid", "is-invalid")
        // alertName.classList.replace("d-none", "d-block")
    }
}

if (emailToached) {
    if (ValidateEmail()) {
        userEmail.classList.remove("is-invalid")
        userEmail.classList.add("is-valid")
        alertEmail.classList.replace("d-block", "d-none")
    } else {
        userEmail.classList.replace("is-valid", "is-invalid")
        alertEmail.classList.replace("d-none", "d-block")
    }
}

if (phoneToached) {
    if (validatePhone()) {
        userPhone.classList.remove("is-invalid")
        userPhone.classList.add("is-valid")
        alertPhone.classList.replace("d-block", "d-none")
    } else {
        userPhone.classList.replace("is-valid", "is-invalid")
        alertPhone.classList.replace("d-none", "d-block")
    }
}

if (ageToached) {
    if (ValidataAge()) {
        userAge.classList.remove("is-invalid")
        userAge.classList.add("is-valid")
        alertAge.classList.replace("d-block", "d-none")
    } else {
        userAge.classList.replace("is-valid", "is-invalid")
        alertAge.classList.replace("d-none", "d-block")
    }
}

if (passwordToached) {
    if (ValidatePassword()) {
        userPassword.classList.remove("is-invalid")
        userPassword.classList.add("is-valid")
        alertPassword.classList.replace("d-block", "d-none")
    } else {
        userPassword.classList.replace("is-valid", "is-invalid")
        alertPassword.classList.replace("d-none", "d-block")
    }
}

if (repasswordToached) {
    if (ValidateRepassword()) {
        userRepassword.classList.remove("is-invalid")
        userRepassword.classList.add("is-valid")
        alertRepassword.classList.replace("d-block", "d-none")
    } else {
        userRepassword.classList.replace("is-valid", "is-invalid")
        alertRepassword.classList.replace("d-none", "d-block")
    }
}

if (validName() && validPhone() && validEmail() && validAge() && validPassword() && validRePassword()) {
    document.getElementById("submit").removeAttribute("disabled");
} else {
    document.getElementById("submit").setAttribute("disabled", "true");
}

function validation() {
 

    function validName() {
        return /^[a-zA-Z][^0-9]+$/.test(userName.value);
        console.log("hi");
    }
    function validPhone() {
        return /^(002)?01[0152]\d{8}$/.test(userPhone.value);
    }
    function validEmail() {
        return /^\w{3,10}@(yahoo|gmail)\.com$/.test(userEmail.value);
    }
    function validAge() {
        return /[1-9]\d?$/.test(userAge.value);
    }
    function validPassword() {
        return /^[a-zA-Z]+\d+\w{8}$/.test(userPassword.value);
    }
    function validRePassword() {
        return userPassword.value == userRePassword.value;
    }

}






