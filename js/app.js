let numID = 0;
let className = ['.list' , '.list-done'];
let attrName = [className[0].slice(1) , className[1].slice(1)]
const [list , listDone] = [document.createElement('ul') , document.createElement('ul')]
const nl = [list , listDone];

const resetNumID = () => {
    document.querySelectorAll('li').forEach((el, idx) => {
        el.children[1].children[0].id = idx;
        el.children[2].children[0].id = idx;
        el.children[2].children[1].id = idx;
        el.children[2].children[2].id = idx;
    })
}

const deleteLI = (t)=> {
    resetNumID();
    if([...document.querySelectorAll('li')[t.id].classList].includes("task")){
        document.querySelector('.list').removeChild(document.querySelectorAll(`li`).item(t.id));
    } else if([...document.querySelectorAll('li')[t.id].classList].includes("task-done")){
        resetNumID();
        document.querySelector('.list-done').removeChild(document.querySelectorAll(`li`).item(t.id));
    }  else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          })
    }  
}

const editLI = (t) => {
    resetNumID();
    document.querySelectorAll('li').item(t.id).children[0].children[0].textContent.length === 1 ?
    document.querySelectorAll('li').item(t.id).children[0].children[0].textContent = document.querySelector('#input').value :
    document.querySelectorAll('li').item(t.id).children[0].children[0].textContent = t.value;
}

const showInput = (t) => {
    document.querySelectorAll('li').item(t.id).children[1].children[0].checkVisibility() ? 
    document.querySelectorAll('li').item(t.id).children[1].children[0].style.display = "none" : 
    document.querySelectorAll('li').item(t.id).children[1].children[0].style.display = "block";
}

const hiddenInput = (t) => document.querySelectorAll('li').item(t.id).children[1].children[0].style.display = "none";

const checkbox = (t) => {
    resetNumID();
    const select  = document.querySelector(`#li-${t.id}`);
    if (t.checked) {
        select.children[0].children[0].classList.toggle("line")
        select.classList.add('line-g')
        document.querySelector('.list-done').append(select);
        document.querySelector(`#li-${t.id}`).classList.remove("task");
        document.querySelector(`#li-${t.id}`).classList.add("task-done");        
    } else {
        select.children[0].children[0].classList.toggle("line")
        select.classList.remove('line-g')
        document.querySelector('.list').append(select);
        document.querySelector(`#li-${t.id}`).classList.remove("task-done");
        document.querySelector(`#li-${t.id}`).classList.add("task");
    }
}

document.querySelector('form').addEventListener('submit', () => {
    event.preventDefault();
    let x = true;
    document.querySelectorAll('li').forEach((el) => {
        if(el.children[0].children[0].textContent.toString() === document.querySelector('#input').value){
            x = false;
        } 
    })
    if(x){
        const liEL = document.createElement('li');
        const input = document.querySelector('#input').value;
        document.querySelector('.list').appendChild(liEL);
        liEL.setAttribute('id' , `li-${numID}`)
        liEL.classList.add("task");
        liEL.innerHTML = `
                <header>
                    <h2 class="title">${input}</h2>      
                    <p>${new Date().toDateString()}</p>      
                </header>
                <div class="input-group">
                    <input type="text" class="" id="${numID}" value="${input}" oninput="editLI(this)" onmouseout="hiddenInput(this)" style="display:none" maxlength="16">            
                </div>
                <span class="btn-group">    
                    <input type="checkbox" id="${numID}" onchange="checkbox(this)" class="check">   
                    <button class="btn-edit" id="${numID}" onclick="showInput(this)"><i class="ri-file-edit-fill fa-g"></i></button>            
                    <button class="btn-delete" id="${numID}" onclick="deleteLI(this)"><i class="ri-delete-bin-5-fill fa-g"></i></button>            
                </span>
        `   
        numID += 1;    
        resetNumID();        
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          })
    }
})

document.querySelector('form').addEventListener('reset', () => {
    event.preventDefault();
    document.querySelector('#input').value = '';
    numID = 0;
    if (document.querySelector(className[0]).childElementCount > 0 || document.querySelector(className[1]).childElementCount > 0) {
        for(let i = 0; i < className.length; i++){
            document.querySelector(className[i]).remove();
            list.setAttribute('class', attrName[0]);
            listDone.setAttribute('class', attrName[1]);
            document.querySelector('.container').children[i].appendChild(nl[i])
        }
        console.clear();
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          })
    }
})
