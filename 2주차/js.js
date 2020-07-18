

/************************** GLOBAL VARIABLES ********************************/

let _buttonAddStudent = document.getElementById("addStudentBt");
let _buttonDeleteStudent = document.getElementById("deleteStudentBt");
let _averageOfGrade = document.getElementById("avgGrade");
let _numberOfStudent = document.getElementById("numberOfStudent");
let _studentInfoTable = document.getElementById("studentInfoTable");

let _checkBox = document.getElementsByClassName("chk")
let _tableContent = document.getElementsByClassName("content");
let _grade = document.getElementsByClassName("grade");

let _checkedList = new Array();

/******************************* BUTTON ***********************************/

_buttonAddStudent.addEventListener("click", addRow);
_buttonDeleteStudent.addEventListener("click", deleteHandler);


/******************************* FUNCTION ***********************************/

window.onload = function() {

    for(let i = 0; i < _tableContent.length; i++){
        _checkBox[i].addEventListener("click", getChecked);
    }
    setGradePoint();
    setNumberOfStudent();

}

function addRow(){ // 새로운 row 추가하는 함수

    // row
    let addedRow = _studentInfoTable.insertRow(_studentInfoTable.rows.length);
    addedRow.className += "content"; // row가 추가될 때마다 해당 row에 content라는 class 명을 붙여준다. 

    // cell_1 :: checkbox :: 첫번째 cell은 checkbox라는 element가 있기 때문에 js에서 element를 만들어줘야 한다.
    let cell1= addedRow.insertCell(0);
    let addCheckbox = document.createElement("input");
    addCheckbox.className = "chk";
    addCheckbox.type = "checkbox";
    cell1.appendChild(addCheckbox); //  appendChild를 통해 element를 붙여줄 수 있다.
    
    // cell_2 :: 이름
    let cell2 = addedRow.insertCell(1);
    cell2.innerHTML = "jeon";

    // cell_3 :: 학번   
    let cell3 = addedRow.insertCell(2);
    cell3.innerHTML = "201702068";
    
    // cell_4 :: 나이
    let cell4 = addedRow.insertCell(3);
    cell4.innerHTML = "23";

    // cell_5 :: 학점
    let cell5 = addedRow.insertCell(4);
    cell5.className += "grade";
    cell5.innerHTML = "A";

    // cell_6 :: 비고
    let cell6 = addedRow.insertCell(5);
    
    setGradePoint()
    setNumberOfStudent();
    
    addCheckbox.addEventListener("click", getChecked); // 추가적인 셀도 체크해주기 위해서
}




// 1. 체크하지 않았을 때 Row 삭제
function deleteRow(){ 
    _studentInfoTable.deleteRow(_studentInfoTable.rows.length-1);
}
 // 2. 체크했을 때 row들 삭제
function deleteCheckedRows(){
    while(_checkedList.length != 0){
        _studentInfoTable.deleteRow(_checkedList.pop());
    }
}
function deleteHandler(){ // row를 삭제하는 함수
    if(isChecked()){
        deleteCheckedRows();
    } else{
        deleteRow();
    }
    setGradePoint();
    setNumberOfStudent();
}

// 무엇이 체크되었는지 파악해서 
function getChecked(){
    let tempArr = new Array();
    for(let i = 0; i < _checkBox.length; i++){
        if(_checkBox[i].checked == true){
            tempArr.push(i);
        }
    }
    _checkedList = tempArr;
}

// checked = true
function isChecked(){
    return _checkedList.length;
}

// 평균 학점 : 
function setGradePoint(){
    let sumOfPoint = 0;
    let averageOfPoint;
    for(let i = 0; i < _tableContent.length; i++){
        switch(_grade[i].innerHTML){
            case 'A+' : sumOfPoint += 4.5; 
                break;
            case 'A' : sumOfPoint += 4.0; 
                break;
            case 'B+' : sumOfPoint += 3.5; 
                break;
            case 'B' : sumOfPoint += 3.0; 
                break;
            case 'C+' : sumOfPoint += 2.5; 
                break;
            case 'C' : sumOfPoint += 2.0; 
                break;
            case 'D+' : sumOfPoint += 1.5; 
                break;
            case 'D' : sumOfPoint += 1.0; 
                break;
            default : sumOfPoint += 0.0;
                break;
        }
    }
    if(_tableContent.length == 0){
        averageOfPoint = 0;
    } else{
        averageOfPoint = sumOfPoint / _tableContent.length;
        averageOfPoint = averageOfPoint.toFixed(2); // toFixed :: 소수점 둘째 자리에서 끊는 함수
    }
    _averageOfGrade.innerHTML = averageOfPoint;
}

// 총 인원 : 
function setNumberOfStudent(){
    _numberOfStudent.innerHTML = _tableContent.length;
}