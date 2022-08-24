export function renderGrocery(grocery) {
    const listItem = document.createElement('div');
    const itemInfo = document.createElement('p');
    
    itemInfo.textContent = `${grocery.quantity} ${grocery.item}`;
    listItem.append(itemInfo);

    if (grocery.bought) {
        listItem.classList.add('bought');
    }

    return listItem;
}