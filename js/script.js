const loadAllProducts = async(category = '') =>{
    const res = await fetch(` https://fakestoreapi.com/products${category}`)
    const data = await res.json()
    console.log(data)
    // spinner or loader
    // show not found data
    const spinnerId = document.getElementById('spinner')
    const notFoundContainer = document.getElementById('notFoundContainer')
    const namePriceContainer = document.getElementById('namePriceContainer')
    if(data.length > 0){
        notFoundContainer.classList.add('hidden')
        spinnerId.classList.add('hidden')
    }
    if(!data.length){
        notFoundContainer.classList.remove('hidden')
        namePriceContainer.classList.add('hidden')
    }
    else{
        namePriceContainer.classList.remove('hidden')
    }


    const allProductsContainer = document.getElementById('allProductsContainer')
    allProductsContainer.innerHTML = ''
    data.forEach((product) =>{
        // console.log(product)
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="rounded-lg bg-blue-400 py-10 px-5 shadow-lg ">
            <div class="flex justify-center bg-white rounded-lg p-5">
                <img class="w-52 " src="${product?.image}" alt="">
            </div>
            <h3 class="text-xl font-bold my-3">${product?.title}</h3>
            <div class="flex justify-between items-center">
                <div>
                    <p class="font-bold text-xl">Price: <span>${product?.price} </span>$</p>
                </div>
                <div>
                    <button class="bg-green-500 px-2  md:px-3 py-2 text-white rounded-lg">${product?.category}</button>
                </div>
            </div>
            <hr class="border border-gray-600 my-5">
            <div class="flex flex-col md:flex-row justify-between items-center gap-5">
                <div class="flex items-center gap-3">
                    <img class="w-10" src="./image/view.png" alt="">
                    <p class="text-black font-bold">${product?.rating?.count}</p>
                </div>
                <div class="flex items-center gap-3">
                    <img class="w-10" src="./image/star.png" alt="">
                    <p class="text-black font-bold">${product?.rating?.rate} / 5</p>
                </div>
                <div class="flex items-center gap-3">
                    <button onclick ="handleClick('${product?.title}','${product?.price}')" class="bg-cyan-300 px-4 py-2 rounded-lg text-black">Add to Cart</button>
                </div>
            </div>
        </div>
        `
        allProductsContainer.appendChild(div)
    })
};

// handle search
const handleSearch = () =>{

    const searchFieldId = document.getElementById('search-field')
    const searchField = searchFieldId.value
    // console.log(searchField)
    searchFieldId.value = ''
    loadAllProducts(`/category/${searchField}`)
}

// handle click
const handleClick = (name,price) =>{
    // count increase
    let count = 0;
    const markCount =document.getElementById('mark-count').innerText
    let countValue = parseInt(markCount)
    // console.log(countValue)
    count = countValue + count
    count++;
    document.getElementById('mark-count').innerText = count;

    // show name and price
    const showNamePrice = document.getElementById('showNamePrice')
    const div = document.createElement('div')
    div.classList = "flex justify-between gap-3 my-3 "
    div.innerHTML =  `
    <h3 class='font-bold'>${name}</h3>
    <p class = 'text-blue-600 font-bold'>${price}$</p>
    `
    showNamePrice.appendChild(div)
    console.log(count)
}

loadAllProducts()