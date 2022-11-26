const imageContainer = document.querySelector("#ramen-menu")
const detailImage = document.querySelector(".detail-image")
const nameContainer = document.querySelector(".name")
const restaurantContainer = document.querySelector(".restaurant")
const ratingContainer = document.querySelector("#rating-display")
const commentContainer = document.querySelector("#comment-display")

const newRamenForm = document.querySelector("#new-ramen")
const inputName = newRamenForm.querySelector("#new-name")
const inputRestaurant = newRamenForm.querySelector("#new-restaurant")
const inputImage = newRamenForm.querySelector("#new-image")
const inputRating = newRamenForm.querySelector("#new-rating")
const inputComment = newRamenForm.querySelector("#new-comment")

const editRamenForm = document.querySelector("#edit-ramen")
const editRating = editRamenForm.querySelector("#new-rating")
const editComment = editRamenForm.querySelector("#new-comment")

function addRamenImage(ramen) {
    let newImage = document.createElement("img")
    newImage.src = ramen.image
    imageContainer.append(newImage)

    newImage.addEventListener("click", (event) => {
        loadRamenInfo(ramen)
    })
}

function loadRamenInfo(ramen) {
    detailImage.src = ramen.image
    nameContainer.textContent = ramen.name
    restaurantContainer.textContent = ramen.restaurant
    ratingContainer.textContent = ramen.rating
    commentContainer.textContent = ramen.comment
}

fetch (`http://localhost:3000/ramens`)
    .then ((response) => response.json())
    .then (function (json) {
        json.forEach(ramen => {
            addRamenImage(ramen)
        })
        loadRamenInfo(json[0])
    })

newRamenForm.addEventListener("submit", (event) => {
    event.preventDefault()

    let newRamen = {
        image: inputImage.value,
        name: inputName.value,
        restaurant: inputRestaurant.value,
        rating: inputRating.value,
        comment: inputComment.value,
    }
    addRamenImage(newRamen)
})

editRamenForm.addEventListener("submit", (event) => {
    event.preventDefault()

    ratingContainer.textContent = editRating.value
    commentContainer.textContent = editComment.value
})

// Assumes each ramen's image is unique
detailImage.addEventListener("click", (event) => {
    let imageList = Array.from(imageContainer.getElementsByTagName("img"))
    imageList.forEach(image => {
        if (detailImage.src == image.src) {
            imageContainer.removeChild(image)
        }
    })
    detailImage.src = "./assets/image-placeholder.jpg"
    nameContainer.textContent = "Insert Name Here"
    restaurantContainer.textContent = "Insert Restaurant Here"
    ratingContainer.textContent = "Insert rating here"
    commentContainer.textContent = "Insert comment here"
})