
window.onload = function(){
    var commentsDisplayed = false;
    randomColorDisplay = false;


    commentInput = document.querySelector('#comment_input')
    commentInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            postComment()
            commentInput.value = ""
        }
    });
    var comments = document.querySelector("#display_comments");
    comments.addEventListener(
        'click', 
        function(){
            var commentsList = getCommentsFromLocalStorage();
            showHiddenComments(commentsList);
            commentsDisplayed = true;
            alert("You've clicked on a P element");
            
        }
    )
    var hiddenCommentsSection = comments.parentElement;
    hiddenCommentsSection.addEventListener(
        'click',
        function(event){
            if (event.target.tagName == "DIV"){
                hiddenCommentsSection.style.newBackgroundColor = "#b3cccc"; 
            }
            else if (event.target.tagName == "P"){
                hiddenCommentsSection.style.newBackgroundColor = getRandomColor();
                if (hiddenCommentsSection.style.newBackgroundColor == "#ffffff")
                    event.stopPropagation();
            }
            hiddenCommentsSection.style.backgroundColor = hiddenCommentsSection.style.newBackgroundColor;
            if (commentsDisplayed == false)
                alert("You've clicked on a DIV element");
        },
        true
    )

    var brokenA = document.getElementById("broken_a");

    brokenA.addEventListener(
        "click",
        function(event){
            event.preventDefault();
            alert("This link is broken")
        }
    )
    
     
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function showHiddenComments(commentsList){
    var hiddenSection = document.getElementById("hidden_comments");
    for (let i = 0; i < commentsList.length; i++){
        hiddenSection.innerHTML += commentsList[i];
    }
}

function getCommentsFromLocalStorage() {
    var commentsListJSON = localStorage.getItem("commentsList");
    return JSON.parse(commentsListJSON);
}

function postCommentInPage(){
    var main = document.getElementsByTagName("main")[0];
    var form = main.children[1];
    var textarea = form.children[2]; 
    var inputText = textarea.value.trim();
    var defaultMessage = "Write your opinion about my website here.";


    if (inputText != defaultMessage && inputText != ""){

        var newComment = createNewComment(inputText);
        
        //clear the textbox
        inputText = "";
        var post = document.getElementById("post");
        if (post.checked) {
            postCommentInCommentSection(newComment);
        }
        else{
            saveCommentToLocalStorage (newComment);
        }
    }
}

function saveCommentToLocalStorage (newDiv){
    var commentsList;
    if (localStorage.getItem("commentsList") == null){
       commentsList = new Array();
       
    } else {
        commentsListJSON = localStorage.getItem('commentsList')
        commentsList = JSON.parse(commentsListJSON);
    }
    var newDivHtmlContentent = newDiv.outerHTML;
    commentsList.unshift(newDivHtmlContentent);
    var commentsListToString = JSON.stringify(commentsList);
    localStorage.setItem("commentsList", commentsListToString); 
}

function postCommentInCommentSection(newDiv){
    var commentsSections = document.getElementById("comments_section");
    commentsSections.appendChild(newDiv)
}

function createNewComment(inputText) {
    var newDiv = document.createElement("div");
    newDiv.className = "comment";
    //create a new paragraph
    var newParagraph = createCommentParagraph(inputText);
    newDiv.appendChild(newParagraph);

    //create a new date
    var dateParagraph = createDateParagraph()
    newDiv.appendChild(dateParagraph)
    return newDiv;
}

function createCommentParagraph(inputText){
    var newParagraph = document.createElement("p");
    var text = document.createTextNode(inputText);
    newParagraph.appendChild(text);

    return newParagraph;
}
function createDateParagraph(){
    var dateParagraph = document.createElement("p");
    dateParagraph.classList.add("comment-date");
    var dateSpan = document.createElement("span");
    dateSpan.innerHTML = getFormatedDate();
    dateParagraph.innerHTML = "Posted on: ";
    dateParagraph.appendChild(dateSpan);
    return dateParagraph;
}


function getFormatedDate () {
    var currentDate = getCurrentDate();
    return (currentDate.time + " - " + currentDate.date)
}

function getCurrentDate() {
    var d = new Date();
    this.time = d.getHours() + ":" + d.getMinutes();
    this.date = d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear();
    return this;
}


function deleteComments(){
    var comments_section = document.getElementById("comments_section");
    var comments = document.getElementsByClassName("comment");
    var commentsLen =  comments.length;
    for (let i = 0; i < commentsLen; i++) {
        comments_section.removeChild(comments[0]);
    }
}

function changeColorDisplay (){
    var display = document.getElementById("random_color_display");
    let button = document.getElementById("random_color_display_btn")
    if (randomColorDisplay == false) {
        button.innerText = "Stop"
        state = setInterval(function (display){
            display.style.backgroundColor = getRandomColor();
        }, 2000, display )
        randomColorDisplay = true;
    } else {
        clearInterval(state);
        randomColorDisplay = false;
        button.innerText = "Show me random colors"
    }
}

function alertColor(){
    var button = document.getElementById("random_color_display")
    alert("The color is: " + window.getComputedStyle(button).backgroundColor)
}