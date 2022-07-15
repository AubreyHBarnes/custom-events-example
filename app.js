
const fetchData = async () => {
    const url = `https://www.themealdb.com/api/json/v2/9973533/randomselection.php`
    const data = await fetch(url)
    const getMeals = await data.json();

    processOrder(getMeals)
    
}

const processOrder = (getMeals) => {
    const mealsData = getMeals.meals
    const customerOrder = mealsData.slice(0, Math.floor(Math.random() * mealsData.length))
    // console.log(customerOrder)

    const orderDetails = customerOrder.map(item => (
        {
            mealName: item.strMeal,
            mealImg: item.strMealThumb
        }
    ))

    var orderEvent = new CustomEvent(
        'order',
        { detail: orderDetails }
    );

    window.dispatchEvent(orderEvent)
}
fetchData();
// setInterval(fetchData, 3000);

window.addEventListener('order', (evt) => {
    let root = document.getElementById('root');
    const section = document.createElement('section');
    section.className = 'order-container'
    
    
    const displayOrder = evt.detail.map(item => {
        const p = document.createElement('p')
        const img = document.createElement('img')
        const div = document.createElement('div')
        div.className = 'item-in-order'
        img.src = `${item.mealImg}/preview`
        img.alt = item.mealName
        p.innerText = item.mealName
        div.append(p)
        div.append(img)

        return div

    })

    displayOrder.forEach(item => {
        section.append(item)
    })
    root.append(section)
})
