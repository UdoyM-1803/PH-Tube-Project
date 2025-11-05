console.log("Index is connected.");

function loadCategories() {
    // 1. We will fetch the Data
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")

        // 2. Convert promise to json()
        .then((res) => res.json())
        // 3. Send the data to display.
        .then((data) => displayCategories(data.categories));
}

function loadVideos() {
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
        .then(response => response.json())
        .then(data => displayVideos(data.videos));
}

const loadCategoryVideos = (id) => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
    console.log(url);

    fetch(url)
        .then(res => res.json())
        .then(data => displayVideos(data.category));
}

function displayCategories(categories) {
    // Get the container
    const categoryContainer = document.getElementById("category-container");

    // Loop Operation on Array of Object
    for (let cat of categories) {
        // Create Element
        const categoryDiv = document.createElement("div");
        categoryDiv.innerHTML = `
            <button onclick="loadCategoryVideos(${cat.category_id})" class="btn btn-md hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
        `;
        // Append Element
        categoryContainer.append(categoryDiv);
    }

}

const displayVideos = (videos) => {
    const videoContainer = document.getElementById("video-container");

    videoContainer.innerHTML = "";

    videos.forEach(video => {
        console.log(video);
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
                    <p class="mt-2 text-sm text-gray-400 flex gap-1">${video.authors[0].profile_name} <img class="h-5 w-5" src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png" alt=""></p>
                    <p class="text-sm text-gray-400">${video.others.views} Views</p>
                </div>
            </div>
        </div>
        `
        // Append
        videoContainer.append(videoCard);
    });
}

loadCategories();
