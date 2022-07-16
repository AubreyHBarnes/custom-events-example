
const fetchData = async () => {
    const url = `https://www.themealdb.com/api/json/v2/9973533/randomselection.php`
    const res = await fetch(url)

    if (!res.ok) {
        throw new Error(`http response: ${res.status}`)
    }
    const getMeals = await res.json();

    console.log(`Inside fetchData, getMeals length is ${getMeals.meals.length}`)

    processOrder(getMeals)
    
}

const processOrder = (getMeals) => {
    const mealsData = getMeals.meals
    const customerOrder = mealsData.slice(0, Math.floor(Math.random() * mealsData.length) + 1)

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
// fetchData();
// fetchData();
const stopMe = setInterval(fetchData, 3000);

window.addEventListener('order', (evt) => {
    let root = document.getElementById('root');
    const section = document.createElement('section');
    section.className = 'order-container'
    let orderNumber = document.createElement('p')
    orderNumber.className = 'order-number'
    orderNumber.innerText = `Order ${Math.floor(Math.random() * 1000)}`
    section.append(orderNumber)

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
