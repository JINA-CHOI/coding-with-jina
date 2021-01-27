const form = document.querySelector(".js-form");
const input = form.querySelector("input");
const greeting = document.querySelector(".js-greeting");

const USER_LS = "로컬스토리지의 Key값, 사용자 이름";

//"showing"은 클래스의 이름이고 css에서 display:block;으로 설정되어있음
//클래스에 SHOWING_CN를 추가하면 display:none;인 상태를 block로 바꾸어 보이게 함
const SHOWING_CN="showing";

function paintGreeting(text) {
    //이름을 출력할꺼니까 이름 적는 input란은 숨기기
    form.classList.remove(SHOWING_CN);

    //이름을 출력할 h4는 보이기 함
    greeting.classList.add(SHOWING_CN);

    //인자로 받아온 currentValue 값을 text에 넣어서 출력함
    greeting.innerText=`Hello ${text}`;
}

function saveName(text) {
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
    /* event.preventDefault : form 태그 디폴트값에 의해 form태그 안에 있는 input에서 
    엔터를 누르면 자동으로 값이 어딘가로 보내져버리는 데 우리는 이 값을 다른 곳에 저장해 
    사용해야하기 때문에 디폴트 값인 이벤트를 멈추게 하는 메서드 
    */
    event.preventDefault;

    // input에 쓴 이름을 currentValue에 저장
    const currentValue = input.value;

    //저장한 이름을 paintGreeting()과 saveName()함수 인자로 보냄
    paintGreeting(currentValue);
    saveName(currentValue);
}


function askForName(){
    //form태그에 SHOWING_CN 클래스 이름을 추가함으로써 form태그 안에 있는 input이 보임
    form.classList.add(SHOWING_CN);

    //엔터를 누르면 handleSubmit()함수가 실행되도록 하는 이벤트리스너
    form.addEventListener("submit", handleSubmit);
}



function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){
        askForName();
    }else{
        paintGreeting(currentUser);
    }
}

//맨처음 실행되는 함수
function init(){
    loadName();
}

init();