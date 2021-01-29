const todoForm = document.querySelector(".js-input-form"),
    todoInput = todoForm.querySelector("input"),
    todoUl = document.querySelector(".js-todoList");

// 로컬스토리지의 key값
const TODOLIST = "TODOLIST";  

/*여기를 let으로 바꿔줘야 
Uncaught TypeError: Assignment to constant variable. at HTMLButtonElement.deleteToDo
이런 에러가 안남*/
//할일목록을 저장하면 배열변수
let toDos=[]; 

function loadTodo(){
    const todoList = localStorage.getItem(TODOLIST);
    if(todoList !== null){
        // console.log(loadedToDos); //JSON.parse 하기 전(String)
        const parsedToDos = JSON.parse(todoList);
        // console.log(parsedToDos); //JSON.parse 변환(element)
       
       

        //로컬스토리지에 있는 내용을 자동으로 paintToDo함수에 적용되게 해줌
        //원래 새로고침하면 LS에는 남아있으나 화면에선 사라졌었음
        //parsedToDos array에 있는 각각의 element에 지금 만들 함수를 적용 
        //그 각각을 toDo로 칭함
        parsedToDos.forEach(function (toDo) {
            
            //각각의 toDo 요소에 대해서 paintToDo 함수가 적용됨
            paintTodo(toDo.text); 
        
        });

    }
}

function init(){
    loadTodo();
    todoForm.addEventListener("submit", handleSubmit);
}    

init();

//input에 쓴 text를 paintTodo와 saveList 함수에 인자로 보내는 함수
function handleSubmit(event){
    //기본 input의 디폴트값으로 엔터를 누르면 자동으로 어딘가 보내지는 기능을
    //중지시키는 메서드
    event.preventDefault();

    const currentValue = todoInput.value;
    paintTodo(currentValue);
    saveList(currentValue);
    todoInput.value="";
}

//로컬스토리지 value값을 화면에 출력하는 함수
function paintTodo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");

    //+1 하는 이유 : toDos.length가 id인데 0부터 시작하기 때문에
    const newId=toDos.length+1;
    delBtn.innerHTML="❌";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText=text;
    li.appendChild(span);
    li.id=newId; //li에도 id값 입력
    li.appendChild(delBtn);
    todoUl.appendChild(li);
    
    //배열 toDos에 저장하는 객체
    const toDoObj={
        text: text, //text에는 text(실제입력한값) 입력
        id: newId  // id에는 newId(toDos 수량+1) 입력
        //toDos array에 왜 이런식으로 저장하냐? 
        //그건 localstorage에 입력을 받을때마다 여러개 같이 저장해줘야 하기 떄문 
    };

    //push:배열 요소에 추가하는 메서드
    toDos.push(toDoObj);
    saveList();
}

//로컬스토리지 value 값에 저장하는 함수
function saveList(){
    localStorage.setItem(TODOLIST, JSON.stringify(toDos));
}    



//ToDo 삭제 함수
function deleteToDo(event) {
    //출력한 리스트를 삭제함 새로고침하면 다시 나타나므로 
    const btn = event.target; //target한 버튼
    const li = btn.parentNode; //btn의 부모 li 선택
    todoUl.removeChild(li); //toDoList에서 li삭제
   
   //로컬스토리지에 있는 것들을 다시 모아서 출력해줘야함
    const cleanToDos = toDos.filter(function (toDo) {
        console.log(toDo.id,parseInt(li.id) );
      return toDo.id !== parseInt(li.id);
      //toDo id는 숫자, li id는 string
      //li를 parseInt 써서 string에서 number로 변경
    });
    //filterFn함수에서 체크된 아이템의 array를 주는 역할
    //filterFn함수에 id===1만 있으면 id 1인 아이템만 가져온다.
    console.log(cleanToDos);
    //콘솔에 cleanToDos(새로운 array) 3개, toDos(예전 array)는 4개
    toDos = cleanToDos; //toDos let으로 정의 유의
    saveList(); //toDos를 저장할꺼임(즉 새로고침해도 다시 html에서 toDos 생기지 안음)
  }
  






