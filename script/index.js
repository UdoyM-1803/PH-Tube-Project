console.log("Index is connected.");

function removeActiveClass() {
    const activeButtons = document.getElementsByClassName("active");

    for (let btn of activeButtons) {
        btn.classList.remove("active");
    }
}

function loadCategories() {
    // 1. We will fetch the Data
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")

        // 2. Convert promise to json()
        .then((res) => res.json())
        // 3. Send the data to display.
        .then((data) => displayCategories(data.categories));
}

function loadVideos(searchText = "") {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
        .then(response => response.json())
        .then(data => {
            removeActiveClass();
            document.getElementById("btn-all").classList.add("active");
            displayVideos(data.videos)
        });
}

const loadCategoryVideos = (id) => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
    console.log(url);

    fetch(url)
        .then(res => res.json())
        .then(data => {
            removeActiveClass();
            // NO active class.....................
            const clickedButton = document.getElementById(`btn-${id}`);
            clickedButton.classList.add("active");
            displayVideos(data.category)
        });
}

function displayCategories(categories) {
    // Get the container
    const categoryContainer = document.getElementById("category-container");

    // Loop Operation on Array of Object
    for (let cat of categories) {
        // Create Element
        const categoryDiv = document.createElement("div");
        categoryDiv.innerHTML = `
            <button id= "btn-${cat.category_id}" onclick="loadCategoryVideos(${cat.category_id})" class="btn btn-md hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
        `;
        // Append Element
        categoryContainer.append(categoryDiv);
    }

}

const loadVideoDetails = (videoId) => {
    console.log(videoId);
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;

    fetch (url)
        .then(res => res.json())
        .then(data => displayVideoDetails(data.video))

}

const displayVideoDetails = (video) => {
    console.log(video);
    document.getElementById("video_details").showModal();
    const detailsContainer = document.getElementById("details-container");
    detailsContainer.innerHTML = `
        <div class="card bg-base-100 image-full shadow-sm">
            <figure>
                <img class= "w-full"
                src="${video.thumbnail}"
                alt="Shoes" />
            </figure>
            <div class="card-body">
                <p class= "text-xl text-yellow-400">${video.description}</p>
                </div>
            </div>
        </div>
    `
}

const displayVideos = (videos) => {
    const videoContainer = document.getElementById("video-container");

    videoContainer.innerHTML = "";

    if (videos.length == 0) {
        videoContainer.innerHTML = `
            <div class="py-20 col-span-full text-center flex flex-col justify-center items-center">
                <img class="w-[120px]" src="Resources/Icon.png" alt="">
                <h2 class="text-2xl font-bold">Oops!! Sorry, There is no content here</h2>
            </div>
        `
        return;
    }

    videos.forEach(video => {
        const videoCard = document.createElement("div");
        videoCard.innerHTML = `
            <div class="card bg-base-100">
            <figure class="relative">
                <img class="w-full h-[200px] object-cover rounded-sm" src="${video.thumbnail}" alt="Shoes" />
                <span class="absolute bottom-2 right-2 text-white bg-black px-2 text-sm rounded">3hrs 56 min ago</span>
            </figure>
            <div class="flex gap-3 px-0 py-5">
                <div class="profile">
                    <div class="avatar">
                        <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring-2 ring-offset-2">
                            <img src="${video.authors[0].profile_picture}" />
                        </div>
                    </div>
                </div>
                <div class="intro">
                    <h2 class="font-semibold">${video.title}</h2>
                    <p class="mt-2 text-sm text-gray-400 flex gap-1">
                    ${video.authors[0].profile_name} 
                    ${video.authors[0].verified == true ? `<img class="h-5 w-5" src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png" alt=""></img>` : ``}
                    </p>
                    <p class="text-sm text-gray-400">${video.others.views} Views</p>
                </div>
            </div>
            <button onclick= "loadVideoDetails('${video.video_id}') " class="btn btn-block">Show Details</button>
        </div>
        `
        // Append
        videoContainer.append(videoCard);
    });
}

document.getElementById("search-input").addEventListener("keyup", (e) => {
    const input = e.target.value;
    loadVideos(input);
})

loadCategories();
