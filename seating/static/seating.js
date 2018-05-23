canvas = document.getElementById("canvas");
ctx = canvas.getContext('2d');
canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.8;

studentNameInput = document.getElementById("student-name-input");

onCanvasClick = createNewDeskOnClick;
onCanvasMouseDown = null;
onCanvasMouseUp = null;
onCanvasMouseMove = shadowNewDeskOnMouseMove;

desks = [];
students = [];

class Desk {
    constructor(x, y, width, height) {
        this.vertices = [
            [x, y],
            [x + width, y],
            [x + width, y+height],
            [x, y+height]
        ];
        this.width = width;
        this.height = height;
        this.strokeColor = "black";
        this.color = "white";
        this.selected = false;
        this.name = "";
    }
    render() {
        ctx.strokeStyle = this.strokeColor;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(...this.vertices[0]);
        this.vertices.forEach((point) => {
            ctx.lineTo(...point);
        });
        ctx.closePath();
        ctx.stroke();
        if(this.color !== "white") {
            ctx.fill();
        }
        
        // draw the text
        ctx.fillStyle = "black";
        ctx.fillText(this.name, this.vertices[0][0]+this.width/4, this.vertices[0][1]+this.height/4);
    }
    rotate(angle) {
        
    }
    select() {
        this.color = "gray";
        this.selected = true;
    }
    unselect() {
        this.color = "white";
        this.selected = false;
    }
    setStudent(name) {
        this.name = name; 
    }
    move(x, y) {
        this.vertices.forEach((vertice) => {
            vertice[0] += x;
            vertice[1] += y;
        });
    }
    contains(x, y) {
        return x > this.vertices[0][0] && x < this.vertices[1][0] && y > this.vertices[0][1] && y < this.vertices[2][1];
    }
}
canvas.addEventListener('click', (evt) => {
    if(onCanvasClick) {
        var x = evt.pageX - canvas.offsetLeft;
        var y = evt.pageY - canvas.offsetTop;
        onCanvasClick(x, y);
    }
});
canvas.addEventListener('mousedown', (evt) => {
    if(onCanvasMouseDown) {
        var x = evt.pageX - canvas.offsetLeft;
        var y = evt.pageY - canvas.offsetTop;
        onCanvasMouseDown(x, y);
    }
});
canvas.addEventListener('mouseup', (evt) => {
    if(onCanvasMouseUp) {
        var x = evt.pageX - canvas.offsetLeft;
        var y = evt.pageY - canvas.offsetTop;
        onCanvasMouseUp(x, y);
    }
});
canvas.addEventListener('mousemove', (evt) => {
    if(onCanvasMouseMove) {
        var x = evt.pageX - canvas.offsetLeft;
        var y = evt.pageY - canvas.offsetTop;
        onCanvasMouseMove(x, y);
    }
});
function createNewDeskOnClick(x, y) {
    desks.push(new Desk(x, y, 200, 100));
    render();
}
function shadowNewDeskOnMouseMove(x, y) {
    render();
    ctx.strokeStyle = "#D3D3D3";
    ctx.strokeRect(x, y, 200, 100);
}
function assignStudentOnClick(x, y) {
    clickedDesk = false;
    input = document.getElementById("student-name-input");
    for(var i = 0;i < desks.length;i++) {
        desks[i].unselect();
        if(desks[i].contains(x, y)) {
            desks[i].select();
            clickedDesk = true;
            input.style.display = "block";
            input.style.left = desks[i].vertices[0][0] + canvas.offsetLeft;
            input.style.top = desks[i].vertices[0][1] + canvas.offsetTop - 25;
            input.focus();
        }
    }
    if(!clickedDesk) {
        input.style.display = "none";    
        input.value = "";
    }
    render();
}
function removeDeskOnClick(x, y) {
    for(var i = 0;i < desks.length;i++) {
        if(desks[i].contains(x, y)) {
            desks.splice(i, 1);
            render();
            break;
        }
    }
}
function highlightDeskOnMouseMove(x, y) {
    desks.forEach((desk) => {
        desk.unselect();
    });
    for(var i = 0;i < desks.length;i++) {
        if(desks[i].contains(x, y)) {
            desks[i].select();
            render();
            break;
        }
    }
}
var previousMousePosition = [];
function dragDeskOnMouseDown(x, y) {
    previousMousePosition = [x, y];
    desks.forEach((desk) => {
        if(desk.contains(x, y)) {
            desk.select();
        }
    });
    render();
}
function dragDeskOnMouseMove(x, y) {
    desks.forEach((desk) => {
        if(desk.selected) {
            desk.move(x - previousMousePosition[0], y - previousMousePosition[1]);
        }
    });
    previousMousePosition = [x, y];
    render();
}
function dragDeskOnMouseUp(x, y) {
    desks.forEach((desk) => {
        desk.unselect();
    });
    render();
}

function clearFunctions() {
    onCanvasClick = null;
    onCanvasMouseDown = null;
    onCanvasMouseUp = null;
    onCanvasMouseMove = null;
}
function switchOnClickMode(funcDown, funcMove) {
    clearFunctions();
    onCanvasClick = funcDown;
    onCanvasMouseMove = funcMove;
}
function switchOnMouseDownMode(funcDown, funcUp, funcMove) {
    clearFunctions();
    onCanvasMouseDown = funcDown;
    onCanvasMouseUp = funcUp;
    onCanvasMouseMove = funcMove;
}
studentNameInput.addEventListener('keyup', (evt) => {
    var kc = evt.keyCode;
    if(kc == 13) {
        desks.forEach((desk) => {
            if(desk.selected) {
                desk.setStudent(studentNameInput.value);
                studentNameInput.value = "";
            }
            render();
        });
    }
});
function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    desks.forEach((desk) => {
        desk.render();
    });
}
function randomlyAssignStudents() {
    students = document.getElementById("student-names").value.split("\n");
    for(var i = 0;i < students.length;i++) {
        index1 = Math.floor(Math.random() * students.length);
        index2 = Math.floor(Math.random() * students.length);
        temp = students[index1];
        students[index1] = students[index2];
        students[index2] = temp;
    }
    var counter = 0;
    desks.forEach((desk) => {
        if(counter < students.length) {
            desk.setStudent(students[counter]);
        }
        counter++;
    });
    render();
}
