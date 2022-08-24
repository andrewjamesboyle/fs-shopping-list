export function renderGrocery(grocery, anyFunction) {
    const listItem = document.createElement('div');
    const itemInfo = document.createElement('p');
    
    itemInfo.textContent = `${grocery.quantity} ${grocery.item}`;
    listItem.append(itemInfo);

    listItem.addEventListener('click', async () => {
        await anyFunction(grocery);
    });

    if (grocery.bought) {
        listItem.classList.add('bought');
    }

    return listItem;
}