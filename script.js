window.onload = function (){
    //changeProperties(); 
    (function printImagesSrc(){
        var images = document.getElementsByTagName("img");
        for (var i = 0; i < images.length; i++){
            console.log(i + ": " + images[i].src)
            images[i].onclick = function(){alert(this.src);}
        }
        console.log(i)
    })()
} 




function deleteContent(){
    var textArea = document.getElementById("comment_input");
    var inputText = textArea.value.trim();
    if (inputText != ""){
        var defaultMessage = "Write your opinion about my website here.";
        if (inputText == defaultMessage.trim()){
            textArea.value = "";
        }    
    }
    
}


function displayImages(){
    var figures = document.getElementsByClassName("to_hide");  /// aici sa creez obiectul
    var buttons = document.getElementsByTagName("button");
    var button = buttons[0];
    for (let figure of figures) {
        // alert(figure.figcaption);
        if (figure.style.visibility != "visible"){
            figure.style.visibility = "visible";
            button.textContent = "Hide";
        } else {
            figure.style.visibility = "hidden";
            button.textContent = "Press here to see another pictures";
        }
    }
}

function changeProperties (){
    var george = document.getElementById("george_pic");
    george.onmouseover = changeGeorgeMouseOver;
    george.onmouseout = changeGeorgeMouseOut;

}


function changeGeorgeMouseOver (){
    var george = document.getElementById("george_pic");
    george.style.boxShadow = "10px 10px 5px grey";
    george.style.marginRight = "10px";
    george.style.marginBottom = "10px";
}

function changeGeorgeMouseOut (){
    var george = document.getElementById("george_pic");
    george.style.boxShadow = "";
    george.style.marginRight = "";
    george.style.marginBottom = "";
}




