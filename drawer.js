const myApp = function () {
    document.addEventListener("DOMContentLoaded", () => {
        const colorsButtons =  function (){
            const buttons = document.querySelectorAll('.colorWrapper > a');

            buttons.forEach(btn => btn.addEventListener("click", e => {                
                clear();
                btn.style.border = "3px solid gray";               
            }));

            function clear(){
                buttons.forEach(s => s.style.border = "none");
            };
            function onClick(func){
                buttons.forEach(btn => btn.addEventListener("click", e => {
                    func(btn);                   
                }));
            };

            return{
                onClick:onClick
            };
        }();         
        const thicknessButtons = function(){
            const buttons = document.querySelectorAll('.thicknessWrapper > a');
                        
            buttons.forEach(btn => btn.addEventListener("click", e => {                
                clear();
                btn.style.border = "3px solid gray";    
            }));
            
            function clear(){
                buttons.forEach(s => s.style.border = "none");
            };           
            function onClick(func){
                buttons.forEach(btn => btn.addEventListener("click", () => {
                    func(btn);   
                }));
            };

            return{
                onClick:onClick
            };
        }(); 
        const clearButton = function(){
            return document.querySelector('#clear');
        }(); 
        const saveButton = function(){
            return document.querySelector('#save');
        }();       
        const canvas = function () {            
            let isDrawing = false;
            const _canvas = document.getElementById("drawingCanvas");
            const context = _canvas.getContext("2d");
            const localKey = "savedCanvas";

            _canvas.onmousedown = startDrawing;
            _canvas.onmouseup = stopDrawing;
            _canvas.onmouseout = stopDrawing;
            _canvas.onmousemove = draw;

            window.addEventListener('storage', restore);
            restore();
                   
            function restore(){   
                const image = new Image();
                image.src = localStorage.getItem(localKey); 
                image.onload = function() {
                    clearCanvas();
                    context.drawImage(image, 0, 0);
                };                
            };
            function clearCanvas() {
                context.clearRect(0, 0, _canvas.width, _canvas.height);
            };
            function save() {
                localStorage.setItem(localKey, _canvas.toDataURL());
               
                restore();
            };
            function startDrawing(e) {
                isDrawing = true;
                context.beginPath();
                context.moveTo(e.pageX - _canvas.offsetLeft, e.pageY - _canvas.offsetTop);
            };
            function draw(e) {
                if (isDrawing == true) {
                    const x = e.pageX - _canvas.offsetLeft;
                    const y = e.pageY - _canvas.offsetTop;

                    context.lineTo(x, y);
                    context.stroke();
                }
            };
            function stopDrawing() {
                isDrawing = false;
            };
            function setThickness(val) {
               context.lineWidth = val;
            };
            function setColor(val) {
               context.strokeStyle = val;
            };

            return {
                setThickness: setThickness,
                setColor: setColor,
                clear: clearCanvas,
                save: save
            };
        }();              
       
        !function init() {
            clearButton.addEventListener("click", canvas.clear);
            saveButton.addEventListener("click", canvas.save);
            colorsButtons.onClick(btn => {
                canvas.setColor(btn.style.backgroundColor);
            });
            thicknessButtons.onClick(btn => {
               canvas.setThickness(btn.attributes.thickness.value);
            });

            document.querySelectorAll(".colorWrapper > a")[0].click();
            document.querySelectorAll(".thicknessWrapper > a")[0].click();            
        }();
    });
}();
