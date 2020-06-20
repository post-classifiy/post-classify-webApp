const backgroundImg = document.querySelector(".bg-image");;
const btnPost = document.querySelector("#btn-submit");
const post = document.querySelector("textarea");
const cardBody = document.querySelector(".card-body");
const divPostCategory = document.querySelector("#result");
const chartCol = document.querySelectorAll("div.col-md")[1];


btnPost.addEventListener('click', predictPostCategory);

async function predictPostCategory() {
    const data = await postData('/predict', {
        post: post.value
    });

    console.log(data)
    console.log(data.category);
    console.log(data.y_axis[0]);


    // change background img to gif
    backgroundImg.style.backgroundImage = "url('../static/imgs/x.gif')";


    setTimeout(function () {
        // add post category
        divPostCategory.classList.remove('d-none');
        divPostCategory.textContent = `${data.category} (${data.confidence}%)`;

        // change background img to jpg
        backgroundImg.style.backgroundImage = "url('../static/imgs/x.jpg')";

        // display chart
        chartCol.classList.remove('d-none');
        document.querySelector('.chart').remove();

        const divChart = document.createElement('div');
        divChart.classList.add('chart', 'p-md-4', 'mx-auto');

        const canvas = document.createElement('canvas');
        canvas.id = 'myChart';


        divChart.appendChild(canvas);
        chartCol.appendChild(divChart);

        document.querySelectorAll("div.col-md")[0].classList.remove('animate__fadeIn')
        document.querySelectorAll("div.col-md")[0].classList.add('animate__fadeIn')

        // create chart
        createChart(data.x_axis, data.y_axis[0]);
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



var ctx = document.getElementById('myChart').getContext('2d');

function createChart(labels, data) {

    const ctx = document.getElementById('myChart').getContext('2d');

    var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            data: data,
            datasets: [{
                //label: '# of Votes',
                data: data,
                backgroundColor: [
                    'rgba(255, 99, 132)',
                    'rgba(54, 162, 235)',
                    'rgba(255, 206, 86)',
                    'rgba(75, 192, 192)',
                    'rgba(153, 102, 255)',
                    'rgba(255, 159, 64)',
                    'rgba(255, 99, 132)',
                    'rgba(54, 162, 235)',
                    'rgba(255, 206, 86)',
                    'rgba(75, 192, 192)',
                ],
                borderWidth: 0
            }]
        },
        options: {
            legend: {
                labels: {
                    fontColor: "white",
                    fontSize: 14
                }
            },
        }

    });
}