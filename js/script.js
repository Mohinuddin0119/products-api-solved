const loadAllProducts = async() =>{
    const res = await fetch(` https://fakestoreapi.com/products`)
    const data = await res.json()
    console.log(data)
}
loadAllProducts()