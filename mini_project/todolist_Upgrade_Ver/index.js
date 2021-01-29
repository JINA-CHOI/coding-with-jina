const form = document.querySelector(".input-form");
const formInput = form.querySelector("input");
const pendingList = document.querySelector(".pending-ul");
const finishedList = document.querySelector(".finished-ul");


// 모든 함수 가장 위에 위치하도록 해야함
// 할일목록은 배열이 되어야 여러개를 저장할 수 있으므로
//pending은 배열로 생성 
let pending = [];
let finished = [];

//로컬스토리지의 key값
const PENDING = "PENDING",
    FINISHED = "FINISHED";    

//맨처음 실행되는 함수    
function loadTask(){
    //로컬스토리지 value 값을 변수 pendingValue와 finishedValue에 각각 저장
    const pendingValue = localStorage.getItem(PENDING);
    const finishedValue = localStorage.getItem(FINISHED);


    if(pendingValue !== null){
        // JSON.parse : 인수로 전달받은 문자열을 자바스크립트 객체로 변환하여 반환하는 메서드
        // 여기서는 pendingValue가 string이므로 객체로 변환하여 parsedTask에 저장
        const parsedTask = JSON.parse(pendingValue);

        //헷갈리면 콘솔찍어보기
        // 찍어보면 parsedTask는 배열 객체라는 것을 알 수 있다.
        console.log("parsedTask = "+parsedTask);
        console.log(parsedTask);

        // forEach : 주어진 함수를 배열 요소마다 실행 
        // 여기서 toDo는 parsedTask의 배열 요소들
        parsedTask.forEach(function (toDo) {

        // data 형태로 저장되어 있는 parsedTask 안에 있는 text를 불러온것
        paintPending(toDo.text); 

           
        });
    }

    if(finishedValue !== null){
        const parsedTask = JSON.parse(finishedValue);
        parsedTask.forEach(function (toDo) {
            paintFininshed(toDo.text); 
        }); 
    }
}    


function init(){
    loadTask();
    form.addEventListener("submit", handleSubmitPending);
}

init();

//-----pending----------------------------------------------------

//input에 쓴 text를 savePending과 paintPending 함수에 인자로 보내는 함수
function handleSubmitPending(event){
    
    //기본 input의 디폴트값으로 엔터를 누르면 자동으로 어딘가 보내지는 기능을
    //중지시키는 메서드
    event.preventDefault();

    //input에 쓴 text를 currentValue에 저장하고 
    const currentValue = formInput.value;

    //함수 인자로 보낸다.
    savePending(currentValue);
    paintPending(currentValue);

    //그리고 input의 빈칸은 다시 비워지게 만듬
    formInput.value="";
}


//로컬스토리지 value값을 화면에 출력하는 함수
function paintPending(text){
    const li = document.createElement("li"); // li 태그를 만들어서 변수에 할당
    const passBtn = document.createElement("button"); // button 태그를 만들어서 변수에 할당
    const delBtn = document.createElement("button"); // button 태그를 만들어서 변수에 할당
    const span = document.createElement("span"); // span 태그를 만들어서 변수에 할당


    //pending.length는 pending 객체 안 배열 요소의 갯수를 의미함
    //예를 들어 input에 숨쉬기와 밥먹기를 입력해서 넣어놨다면
    //pending.length는 2가 됨
    const newId=pending.length+1;
    
    //id가 0부터 시작하므로 1부터 시작하게 하기 위해서 1을 더해준것
    //const newId=pending.length;
    //console.log("아이디 = "+newId);

    
    delBtn.innerHTML="❌"; // 버튼의 텍스트는 "❌"로 설정
    delBtn.addEventListener("click",delPending); //❌ 버튼을 누르면 delPending 함수 실행
    passBtn.innerHTML="⭕"; // 버튼의 텍스트는 "⭕"로 설정
    passBtn.addEventListener("click",moveToFinished); //⭕ 버튼을 누르면 moveToFinished 함수 실행
    
    span.innerText=text;// 사용자가 입력한 텍스트가 span태그의 텍스트가 되도록 설정
    li.appendChild(span); // li 태그의 자식 태그로 span 태그 삽입
    
    li.id=newId; // li태그의 id 속성을 object의 id와 같게 함.
    li.appendChild(delBtn);// li 태그의 자식 태그로 버튼을 삽입
    li.appendChild(passBtn);// li 태그의 자식 태그로 버튼을 삽입
    pendingList.appendChild(li);// 위에서 설정한 li 태그들을 최종적으로 pendingList에 삽입

    //할일을 pending 배열에 추가해야하므로 객체로 만들어서 추가함
    const toDoObj={
        text: text, 
        id: newId  
    };

    pending.push(toDoObj);  // toDos라는 Array 안에 toDoObj 객체를 넣음.
    savePending();
}

//로컬스토리지 value 값에 저장하는 함수
function savePending(){

    //JSON.stringify : 블로그에 설명된 링크 볼것
    localStorage.setItem(PENDING, JSON.stringify(pending));
}

//사용자가 선택한 요소의 로컬스토리지 pending의 value값을 지우고 출력된 리스트에도 삭제되는 함수
function delPending(event){
    
    // event.target : 블로그 링크 설명
    // 클릭된 버튼을 할당
    const btn = event.target;

    // console.dir(event.target) // 이 방법으로 event.target의 부모 노드를 확인가능
    // event.target.parentNode 
    /* event.target.parentNode 
        -여러 개의 버튼 중 어느 버튼이 클릭됐는지 알려줌 
        - 클릭된 버튼 태드의 부모 태그를 불러옴 */
   
    const li = btn.parentNode; // 할당된 버튼의 부모 태그(li)를 할당
    pendingList.removeChild(li); // 해당 태그 삭제
    
    
    /*filter 함수는 array의 모든 요소들에 함수를 실행하고, 
    값이 true인 것들만 가지고 새로운 array를 만들어 반환함 */
    const cleanTask = pending.filter(function(toDo){
       return toDo.id !== parseInt(li.id);
    });

    //값이 true인 것들만 가지고 새로운 array를 만들어 반환한 것들만 저장된 cleanTask 변수를
    //다시 pending에 저장
    pending=cleanTask;
    savePending();
}


//버튼을 누르면 finished 리스트로 옮겨지는 기능
function moveToFinished(event){

    //구글링으로 알아온 코드인데 아직 어떤 개념인지 설명을 못하겠음
    //event.path[1] 추후에 알게되면 다시 설명
   const span1 = event.path[1].childNodes[0].innerHTML;
   
    console.log(span1);
    delPending(event);
    paintFininshed(span1);
}


//----finished---------------------------------------------------------

//3번 
//로컬스토리지에 저장된 value 배열 요소를 리스트로 만들어 출력하는 함수 
function paintFininshed(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const passBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId=finished.length+1;
    delBtn.innerHTML="❌";
    delBtn.addEventListener("click",delFinished);
    passBtn.innerHTML="🔁";
    passBtn.addEventListener("click",moveToPending);
    span.innerText=text;
    li.appendChild(span);
    li.id=newId;
    li.appendChild(delBtn);
    li.appendChild(passBtn);
    finishedList.appendChild(li);
    
    const toDoObj={
        text: text, 
        id: newId  
    };
    finished.push(toDoObj);
    saveFinished();

}


//4번 
//currentValue를 인자로 받아 로컬스토리지 value값으로 저장하는 함수
function saveFinished(){
    localStorage.setItem(FINISHED, JSON.stringify(finished));
}


//5번
//사용자가 선택한 요소의 로컬스토리지 finished의 value값을 지우고 출력된 리스트에도 삭제되는 함수
function delFinished(event){
    const btn = event.target;
    const li = btn.parentNode;
    finishedList.removeChild(li);

    const cleanFinished = finished.filter(function(toFinished){
       return toFinished.id !== parseInt(li.id);
    });
    finished=cleanFinished;
    saveFinished();
}


//6번
//버튼을 누르면 pending 리스트로 옮겨지는 기능
function moveToPending(event){
    const span2 = event.path[1].childNodes[0].innerHTML;
    console.log(span2);
    delFinished(event);
    paintPending(span2);
}

