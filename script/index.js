console.log("Index is connected.");

function loadCategories() {
    // 1. We will fetch the Data
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")

    // 2. Convert promise to json()
        .then((res) => res.json())
        // 3. Send the data to display.
        .then((data) => displayCategories(data.categories));
}

function displayCategories(categories) {
    // Get the container
    const categoryContainer =  document.getElementById("category-container");

    // Loop Operation on Array of Object
    for (let cat of categories) {
        console.log(cat);
        // Create Element
        const categoryDiv = document.createElement("div");
        categoryDiv.innerHTML = `
            <button class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
        `;
        // Append Element
        categoryContainer.append(categoryDiv);
    }
        
}

loadCategories();