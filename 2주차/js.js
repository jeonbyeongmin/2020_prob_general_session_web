

//============================= 전역변수 =================================

let bt_addStudent = document.getElementById("addStudentBt");
let bt_deleteStudent = document.getElementById("deleteStudentBt");
let avgGrade = document.getElementById("avgGrade");
let tot = document.getElementById("numberOfStudent");
let tbody_tbody1 = document.getElementById("tbody1");

let checkedBox = document.getElementsByClassName("chk")
let content = document.getElementsByClassName("content");
let grade = document.getElementsByClassName("grade");
let checkedList = new Array();

    // # 1. var --> 재선언 가능 :: 재할당 가능
    //
    //      var name = 'bathingape'
    //      console.log(name) --> bathingape  
    //      var name = 'javascript'
    //      console.log(name) --> javascript

    // # 2. let --> 재선언 불가능 :: 재할당 가능
    //
    //      let name = 'bathingape'
    //      console.log(name) --> bathingape  
    //      let name = 'javascript'
    //      console.log(name) --> Uncaught SyntaxError: Identifier 'name' has already been declared


//=======================================================================






//============================== BUTTON =================================

bt_addStudent.addEventListener("click", addRow);
bt_deleteStudent.addEventListener("click", deleteHandler);

//=======================================================================






//============================ FUNCTION ================================

window.onload = function(){ // 평균 학점과, 총 인원을 계산하여 자동으로 채워주는 함수

    //  # window.onload = function 형식의 함수는 다음 설명과 같다.
    //    
    //    html load 후 무언가를 해주세요.
    //    이 code는 html load 이후에 실행 됩니다.
    //    즉, 무명함수. 일회성 함수. html load 이후 단 한번만 사용되는 함수
    //    여기서는 평균학점과, 총 인원을 계산하는 함수가 될 것이다.
    
    // 평균 학점 계산
    let averageOfGrade = 0;

    for(let i = 0; i < content.length; i++){
        checkedBox[i].addEventListener("click", getChecked);
        let td_grade = grade[i].innerHTML;
        // grade 라는 클래스를 배열로 접근하며, innerHTML로 td_grade라는 변수에 담아준다.

        switch(td_grade){
            case 'A+' : averageOfGrade += 4.5; 
                break;
            case 'A' : averageOfGrade += 4.0; 
                break;
            case 'B+' : averageOfGrade += 3.5; 
                break;
            case 'B' : averageOfGrade += 3.0; 
                break;
            case 'C+' : averageOfGrade += 2.5; 
                break;
            case 'C' : averageOfGrade += 2.0; 
                break;
            case 'D+' : averageOfGrade += 1.5; 
                break;
            case 'D' : averageOfGrade += 1.0; 
                break;
            default : averageOfGrade += 0.0;
                break;

        }
    }

    averageOfGrade = averageOfGrade/content.length;

    // 평균학점과 총 인원 innerHTML을 이용하여 기입
    avgGrade.innerHTML = averageOfGrade;
    tot.innerHTML = content.length;

    //  # innerHTML 에 대한 설명
    //
    //      inner 해당 변수가 가리키는 아이디나 클래스의 태그 안쪽에 String을 적을 수 있음
    //      등호 오른쪽에 쓰인 숫자는 html에 적힐 때 자동으로 String로 변환되게 된다.

}

function addRow(){ // 새로운 row 추가하는 함수

    // row
    let addedRow = tbody_tbody1.insertRow(tbody_tbody1.rows.length);
    addedRow.className += "content"; // row가 추가될 때마다 해당 row에 content라는 class 명을 붙여준다. 

    // cell_1 :: checkbox :: 첫번째 cell은 checkbox라는 element가 있기 때문에 js에서 element를 만들어줘야 한다.
    let cell_1= addedRow.insertCell(0);
    let addCheckbox = document.createElement("input");
    addCheckbox.className = "chk";
    addCheckbox.type = "checkbox";
    cell_1.appendChild(addCheckbox); //  appendChild를 통해 element를 붙여줄 수 있다.
    
    // cell_2 :: 이름
    let cell_2 = addedRow.insertCell(1);
    cell_2.innerHTML = "jeon";

    // cell_3 :: 학번   
    let cell_3 = addedRow.insertCell(2);
    cell_3.innerHTML = "201702068";
    
    // cell_4 :: 나이
    let cell_4 = addedRow.insertCell(3);
    cell_4.innerHTML = "23";

    // cell_5 :: 학점
    let cell_5 = addedRow.insertCell(4);
    cell_5.className += "grade";
    cell_5.innerHTML = "A";

    // cell_6 :: 비고
    let cell_6 = addedRow.insertCell(5);
    
    setGradePoint()
    setTot();
    
    addCheckbox.addEventListener("click", getChecked); // 추가적인 셀도 체크해주기 위해서
}





function deleteHandler(){ // row를 삭제하는 함수
    
    // # delete rules
    //  1. checkbox에 체크하지 않고 삭제버튼을 누르면 마지막 row 삭제
    //  2. checkbox에 체크하면 해당 row 삭제 

    if(checkedList.length){
        deleteCheckRows();
    } else{
        delete_row();
    }
    setGradePoint()
    setTot();
}

function delete_row(){ // 1. 체크하지 않았을 때 Row 삭제
    
    tbody_tbody1.deleteRow(tbody_tbody1.rows.length-1);

}

function deleteCheckRows(){ // 2. 체크했을 때 row들 삭제
    while(checkedList.length !=0){
        tbody_tbody1.deleteRow(checkedList.pop());
    }
}





function getChecked(){ // 무엇이 체크되었는지 파악해서 
    let arr = new Array();
    for(let i = 0; i < checkedBox.length; i++){
        if(checkedBox[i].checked == true){
            arr.push(i);
        }
    }
    checkedList = arr;
    console.log(checkedList);
}

function setGradePoint(){
    let averageOfGrade = 0;
    for(let i = 0; i < content.length; i++){
        let td_grade = grade[i].innerHTML;
        switch(td_grade){
            case 'A+' : averageOfGrade += 4.5; 
                break;
            case 'A' : averageOfGrade += 4.0; 
                break;
            case 'B+' : averageOfGrade += 3.5; 
                break;
            case 'B' : averageOfGrade += 3.0; 
                break;
            case 'C+' : averageOfGrade += 2.5; 
                break;
            case 'C' : averageOfGrade += 2.0; 
                break;
            case 'D+' : averageOfGrade += 1.5; 
                break;
            case 'D' : averageOfGrade += 1.0; 
                break;
            default : averageOfGrade += 0.0;
                break;
        }
    }
    if(content.length == 0){
        averageOfGrade = 0;
    } else{
        averageOfGrade = averageOfGrade/content.length;
        averageOfGrade = averageOfGrade.toFixed(2); // toFixed :: 소수점 둘째 자리에서 끊는 함수
    }
    avgGrade.innerHTML = averageOfGrade;
}

function setTot(){
    tot.innerHTML = content.length;
}

//=======================================================================