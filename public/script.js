
/*document.addEventListener('DOMContentLoaded', (e) => {

    const findToDo = async () => {
        let urlrequest = await fetch('http://localhost:3000/todos');
        const items = await urlrequest.json();
       
        items.forEach(item => {
            getToDo(item);
            console.log(item)
        });

    }
        const getToDo = (item) => {
        let toDoList = document.getElementById('toDoList'); //hämtar id på min UL
        let li = document.createElement('LI'); //skapar en LI
        let checkbox = document.createElement('input'); //skapar en checkbox
        checkbox.type = "checkbox"; // väljer checkbox
        checkbox.name = item.done; 
        checkbox.value = item.done; 
        checkbox.id = item._id; 
        let itemTitle = item.title; //title på item
       // let itemDone = item.done; //om den är true eller false
        li.appendChild(document.createTextNode(itemTitle)); //skriver ut titel och done
        li.appendChild(checkbox);//lägger till checkbox
        if(checkbox.name == "true"){
                checkbox.checked = true;
        }

        toDoList.append(li);
    }


    findToDo();


});
*/