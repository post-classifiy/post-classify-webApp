const backgroundImg = document.querySelector(".bg-image");;
const btnPost = document.querySelector("#btn-submit");
const post = document.querySelector("textarea");
const cardBody = document.querySelector(".card-body");
const divPostCategory = document.querySelector("#result");;


btnPost.addEventListener('click', predictPostCategory);

async function predictPostCategory() {
    const data = await postData('/predict', {
        post: post.value
    });

    console.log(data.category);

    // change background img to gif
    backgroundImg.style.backgroundImage = "url('../static/imgs/x.gif')";


    setTimeout(function () {
        // add post category
        divPostCategory.classList.remove('d-none');
        divPostCategory.textContent = data.category

        // change background img to jpg
        backgroundImg.style.backgroundImage = "url('../static/imgs/x.jpg')";
    }, 4000);

}


const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData
    } catch (error) {
        console.log(error);
    }
}