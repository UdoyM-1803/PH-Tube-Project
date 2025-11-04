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

function displayCategories(categories) {
    // Get the container
    const categoryContainer = document.getElementById("category-container");

    // Loop Operation on Array of Object
    for (let cat of categories) {
        // Create Element
        const categoryDiv = document.createElement("div");
        categoryDiv.innerHTML = `
            <button class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
        `;
        // Append Element
        categoryContainer.append(categoryDiv);
    }

}

const displayVideos = (videos) => {
    const videoContainer = document.getElementById("video-container");

    videos.forEach(video => {
        console.log(video);
        const videoCard = document.createElement("div");
        videoCard.innerHTML = `
            <div class="card bg-base-100 shadow-sm">
            <figure>
                <img
                src="${video.thumbnail}"
                alt="Shoes" />
            </figure>
            <div class="card-body">
                <h2 class="card-title">${video.title}</h2>
                <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                <div class="card-actions justify-end">
                <button class="btn btn-primary">Buy Now</button>
                </div>
            </div>
            </div>
        `
        // Append
        videoContainer.append(videoCard);
    });
}

loadCategories();
loadVideos()