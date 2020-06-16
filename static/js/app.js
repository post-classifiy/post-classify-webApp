const btnPost = document.querySelector("#btn-submit");
const post = document.querySelector("textarea");


btnPost.addEventListener('click', predictPostCategory);

function predictPostCategory() {

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
    } catch (error) {
        console.log(error);
    }
}

postData('/test', {
    duck: "waak waak"
});