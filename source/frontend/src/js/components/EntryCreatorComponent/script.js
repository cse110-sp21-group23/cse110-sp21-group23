  
let template; 

//Modal parts came from https://www.w3schools.com/howto/howto_css_modals.asp
// Get the modal
/*
var modal = document.getElementById("myModal");
var modalcontent = document.getElementsByClassName("modal-content");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
} 

// When the user clicks anywhere outside of the modal, close it
window.addEventListener("click", (event) =>  {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});*/

document.addEventListener("DOMContentLoaded", ()=>{ 

    //Create the component in the DOM 
    template = document.createElement("entry-creator"); 

    //Grab the main block and append
    let mainB = document.getElementsByTagName("main"); 
    mainB[0].appendChild(template); 

    //Assign id to created component
    template.id = "entryTemplate"; 

    //Obtain form from the shadow root of cretaed component
    let entryForm = document.getElementById("entryTemplate").shadowRoot.getElementById("entryCreator"); 

    //Send the entry from the form to textbox
     entryForm.addEventListener('submit', (event) => {
        event.preventDefault();

        //Obtain the text box in index.html

        //Make an entry component 
        let entryComponent = document.createElement('entry-comp');

        //Create entry object using entry-creator and use to set entry-component
        let entry = template.createEntry(); 
        let textBox = document.getElementById("entry-container");

        /*
        //Opens modal to edit bullet
        entryComponent.addEventListener("click", () => {

            //Displays modal and changes the text of modal
            modal.style.display = "block";
            document.getElementById("modal-words").innerHTML = entry.content;

            var edit = document.getElementById("editButton")

            //updates bullet
            edit.onclick = function(event) {
                event.preventDefault();
                entry.content = document.getElementById("modal-words").innerHTML;
                let choices = document.getElementById("radioEdit").querySelectorAll("input[name='entryTypeEdit']"); 
                for (const choice of choices) { 
                    if (choice.checked){ 
                        entry.type = choice.value;
                    }
                }
                
                console.log("submit entry.content = " + entry.content);
                entryComponent.entry = entry; 
                modal.style.display = "none"
                
            }

            var strike = document.getElementById("doneButton");
            if(entry.content.startsWith("<del>")) {
                strike.firstChild.nodeValue = "Unfinish Bullet"
            }
            else {
                strike.firstChild.nodeValue = "Finish Bullet"
            }
            strike.onclick = function(event) {
                event.preventDefault();
                var qwer;
                if(entry.content.startsWith("<del>")) {
                    qwer = entry.content.replace("<del>",'');
                    qwer = qwer.replace("</del>", '');
                    console.log("qwer = " + qwer);
                }
                else {
                    qwer = "<del>" + entry.content + "</del>";
                    //console.log("qwer =" + qwer);
                }
                entry.content = qwer;
                entryComponent.entry = entry; 
                modal.style.display = "none"
            }

            
            //Edit your bullet
            edit.addEventListener("submit", (event) => {
                event.preventDefault();
                //console.log("entry.content = " + entry.content);
                
                entry.content = document.getElementById("modal-words").innerHTML;
                let choices = document.getElementById("radioEdit").querySelectorAll("input[name='entryTypeEdit']"); 
                for (const choice of choices) { 
                    if (choice.checked){ 
                        entry.type = choice.value;
                    }
                }
                
                console.log("submit entry.content = " + entry.content);
                entryComponent.entry = entry; 
                modal.style.display = "none"
            });
            edit.reset();
            
        });*/
        
        entryComponent.entry = entry; 

        //Add the entry component to the text box        
        textBox.appendChild(entryComponent); 
        
        entryForm.reset(); 
    });     
}); 

