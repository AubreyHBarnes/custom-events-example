// fetch data from api using netlify functions
const fetchData = async () => {
    //get the data from my super secret netlify function
    const res = await fetch(`/.netlify/functions/token-hider`)
    //if something goes wrong, throw an error
    if (!res.ok) {
        throw new Error(`http response: ${res.status}`)
    }
    // if something goes right, save the json response
    const getMeals = await res.json();
    // pass the fetched data to a new function to process
    processOrder(getMeals)
    
}
// This function is called to get a random selection of meals from the array passed in from fetch
const processOrder = (getMeals) => {
    //save an array of randomly selected meals
    const mealsData = getMeals.meals
    // select a random number of meals starting from the beginning of the mealsData array
    // at least one, up to the length of the array given.
    const customerOrder = mealsData.slice(0, Math.floor(Math.random() * mealsData.length) + 1)
// map an array of objects
    const orderDetails = customerOrder.map(item => (
        {
            mealName: item.strMeal,
            mealImg: item.strMealThumb
        }
    ))

// create and initialize event. 

    var orderEvent = new CustomEvent(
        'order',
        { detail: orderDetails }
    );
    // tell the browser api to fire the event
    window.dispatchEvent(orderEvent)
}

const stopMe = setInterval(fetchData, 2000);

window.addEventListener('order', (evt) => {
    let root = document.getElementById('root');
    const section = document.createElement('section');
    let orderNumber = document.createElement('p')

    section.className = 'order-container'
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
