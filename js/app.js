let num = 0;

const deleteLI = t => t.parentElement.remove();

const editLI = t => {
    document.querySelectorAll('li').item(t.id).children[0].textContent.length === 1 ?
    document.querySelectorAll('li').item(t.id).children[0].textContent = document.querySelector('#input').value :
    document.querySelectorAll('li').item(t.id).children[0].textContent = t.value;
    resetNumber();
}

const resetNumber = () => {
    document.querySelectorAll('li').forEach((el, idx) => {
        el.children[0].id = idx;
        el.children[1].id = idx;
        idx += 1;
    })
}

const showInput = t => {
    t.parentElement.children[1].checkVisibility() ? 
    t.parentElement.children[1].style.display = "none" : 
    t.parentElement.children[1].style.display = "inline";
}

const hiddenInput = t => t.parentElement.children[1].style.display = "none";

const checkbox = t => {
    if (t.checked) {
        document.querySelector('.list-done').appendChild(t.parentElement);
        t.parentElement.children[0].style.textDecoration = "line-through";
        t.parentElement.children[0].style.opacity = 0.5;
    } else {
        document.querySelector('.list').appendChild(t.parentElement);
        t.parentElement.children[0].style.textDecoration = "none";
        t.parentElement.children[0].style.opacity = 1;
    }
}

document.querySelector('form').addEventListener('submit', () => {
    event.preventDefault();
    const liEL = document.createElement('li');
    const input = document.querySelector('#input').value;
    document.querySelector('.list').appendChild(liEL);
    liEL.innerHTML = `
            <h2 class="title">${input}</h2>
            <input type="text" class="" id="${num}" value="${input}" oninput="editLI(this)" onmouseout="hiddenInput(this)" style="display:none">
            <input type="checkbox" onchange="checkbox(this)" class="check">
            <button class="btn-edit" onclick="showInput(this)"><i class="ri-file-edit-fill fa-g"></i></button>            
            <button class="btn-delete" onclick="deleteLI(this)"><i class="ri-delete-bin-5-fill fa-g"></i></button>
    `
    num += 1;
    resetNumber();
})

document.querySelector('form').addEventListener('reset', () => {
    event.preventDefault();
    document.querySelector('#input').value = '';
    let className = ['.list' , '.list-done'];
    let attrName = [className[0].slice(1) , className[1].slice(1)]
    const [list , listDone] = [document.createElement('ul') , document.createElement('ul')]
    const nl = [list , listDone];
    if (document.querySelector(className[0]).childElementCount > 0 || document.querySelector(className[1]).childElementCount > 0) {
        for(let i = 0; i < className.length; i++){
            document.querySelector(className[i]).remove();
            list.setAttribute('class', attrName[0]);
            listDone.setAttribute('class', attrName[1]);
            document.querySelector('.container').children[i].appendChild(nl[i])
        }
        num = 0;
        // console.clear();
    } else {
        alert(false)
    }
})