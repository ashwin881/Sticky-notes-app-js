const containerElement = document.getElementsByClassName("container")[0];
const btnAdd = document.getElementsByClassName("btn-add")[0];


function getAppStorage (){
    return JSON.parse(localStorage.getItem("joker") || "[]")
}
getAppStorage().forEach(element=>{

    const textArea = createElement(element.id,element.content);
    containerElement.insertBefore(textArea,btnAdd);
})
function createElement(id,content){
    const textElement = document.createElement("textarea");
    textElement.classList.add('sticky');
    textElement.value = content;
    textElement.placeholder = "enter your data";
    textElement.setAttribute('id',id);
    textElement.addEventListener('change',()=>updateNote(id,textElement.value))
    textElement.addEventListener('dblclick',()=>{
        const check = confirm('Are you sure you want to delete the note?');
        if(check){
            deleteNote(id,textElement)
        }
        
    })
    return textElement;
}
function addSticky(){
    const data = getAppStorage();
    const note = {
        id:Math.floor(Math.random()*100000),
        content:""
    }
    const addElement = createElement(note.id,note.content);
    containerElement.insertBefore(addElement,btnAdd);
    data.push(note);
    saveNotes(data);

}
function saveNotes(data){
    localStorage.setItem("joker",JSON.stringify(data))
}

btnAdd.addEventListener('click',()=>addSticky())
function updateNote(id,content){
    console.log('called updatenote')
    const notes = getAppStorage();
    const updateElement = notes.filter(note=>note.id==id)[0];
    updateElement.content = content;
    saveNotes(notes);
}
function deleteNote(id,element){
    const notes = getAppStorage();
    const deleteContent = notes.filter(note=>note.id!=id)
    saveNotes(deleteContent);
    containerElement.removeChild(element);
}