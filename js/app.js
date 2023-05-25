let numID = 0;

const resetNumID = () => {
    document.querySelectorAll(`li`).forEach((el, idx) => {
        el.id = `li-${idx}`;
        el.children[1].children[0].id = idx;
        el.children[2].children[0].id = idx;
        el.children[2].children[1].id = idx;
        el.children[2].children[2].id = idx;
    })
}

const deleteLI = (t) => {
    resetNumID();
    if ([...document.querySelectorAll('li')[t.id].classList].includes("task")) {
        document.querySelector('.list').removeChild(document.querySelectorAll(`li`).item(t.id));
    } else if ([...document.querySelectorAll('li')[t.id].classList].includes("task-done")) {
        resetNumID();
        document.querySelector('.list-done').removeChild(document.querySelectorAll(`li`).item(t.id));
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
        })
    }
}

const editLI = (t) => {
    resetNumID()
    document.querySelectorAll('li').item(t.id).children[0].children[0].textContent.length === 1 || t.value === '' ?
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
    function addAndRemove(bool, task, task2, list) {
        const select = document.querySelector(`#li-${t.id}`);
        const className = select.parentElement.classList.value.toString();
        const selectFilter = document.querySelector(`.${className} #li-${t.id}`);
        const title = document.querySelector(`.${className} #li-${t.id} header .title`);
        title.classList.toggle("line");
        bool ? selectFilter.classList.add("line-g") : selectFilter.classList.remove("line-g");
        document.querySelector(list).appendChild(selectFilter);
        selectFilter.classList.remove(task);
        selectFilter.classList.add(task2);
        resetNumID();
    }
    t.checked ?
        addAndRemove(true, 'task', 'task-done', '.list-done') :
        addAndRemove(false, 'task-done', 'task', '.list');
    if ([...t.parentElement.parentElement.classList].includes("task-done")) {
        t.nextElementSibling.setAttribute('disabled', 'disabled');
        t.nextElementSibling.style.display = "none";
    } else {
        t.nextElementSibling.removeAttribute('disabled')
        t.nextElementSibling.style.display = "inline";
    }
}

document.querySelector('form').addEventListener('submit', () => {
    event.preventDefault();
    let bool = true;
    let maxList = 50;
    document.querySelectorAll('li').forEach((el) => {
        if (el.children[0].children[0].textContent.toString() === document.querySelector('#input').value) bool = !bool;
    })
    if (bool) {
        console.log(document.querySelector('.list').childElementCount + 1);
        if (document.querySelector('.list').childElementCount + 1 > maxList) {
            Swal.fire({
                icon: 'info',
                title: 'information!',
                html: 'No more to-do items can be added, only <p style="color:#37d4fc;">50 items</p> can be added.',
            })
        } else {
            const liEL = document.createElement('li');
            const input = document.querySelector('#input').value;
            document.querySelector('.list').appendChild(liEL);
            liEL.setAttribute('id', `li-${numID}`)
            liEL.classList.add("task");
            const date = {
                dateStrig: new Date().toDateString(),
                timeString: new Date().toLocaleTimeString()
            }
            Object.freeze(date);
            liEL.innerHTML = `
                    <header>
                        <h2 class="title">${input}</h2>      
                        <p>${date.dateStrig} ${date.timeString}</p>      
                    </header>
                    <div class="input-group">
                        <input type="text" class="" id="${numID}" value="${input}" oninput="editLI(this)" onmouseout="hiddenInput(this)" style="display:none" maxlength="50">            
                    </div>
                    <span class="btn-group">    
                        <input type="checkbox" id="${numID}" onchange="checkbox(this)" class="check">   
                        <button class="btn-edit" id="${numID}" onclick="showInput(this)"><i class="ri-file-edit-fill fa-g"></i></button>            
                        <button class="btn-delete" id="${numID}" onclick="deleteLI(this)"><i class="ri-delete-bin-5-fill fa-g"></i></button>            
                    </span>
            `
            resetNumID();
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Names cannot be duplicated or identical.',
        })
    }
})

document.querySelector('form').addEventListener('reset', () => {
    event.preventDefault();
    document.querySelector('#input').value = '';
    const className = ['.list', '.list-done'];
    const attrName = [className[0].slice(1), className[1].slice(1)];
    const [list, listDone] = [document.createElement('ul'), document.createElement('ul')];
    const liEL = [list, listDone];
    if (document.querySelector(className[0]).childElementCount > 0 || document.querySelector(className[1]).childElementCount > 0) {
        for (let i = 0; i < className.length; i++) {
            document.querySelector(className[i]).remove();
            list.setAttribute('class', attrName[0]);
            listDone.setAttribute('class', attrName[1]);
            document.querySelector('.container').children[i].appendChild(liEL[i]);
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `There is no to-do list right now, can't start over'`,
        })
    }
})
