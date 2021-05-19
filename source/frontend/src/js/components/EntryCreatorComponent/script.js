  
let template; 

//Modal parts came from https://www.w3schools.com/howto/howto_css_modals.asp
// Get the modal
var modal = document.getElementById("myModal");
var modalcontent = document.getElementsByClassName("modal-content");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
/*window.addEventListener("click", (event) =>  {
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
        let textBox = document.getElementById("entry-container");
        //Make an entry component 
        let entryComponent = document.createElement('entry-comp');
        //Create entry object using entry-creator and use to set entry-component
        let entry = template.createEntry(); 
        entryComponent.entry = entry; 

        //Opens modal to edit bullet
        entryComponent.addEventListener("click", () => {
            //Displays modal
            modal.style.display = "block";
            document.getElementById("modal-words").innerHTML = entry.content;
            var edit = document.getElementById("edit")

            //Edit your bullet
            edit.addEventListener("submit", (event) => {
                event.preventDefault();
                entry.content = document.getElementById("modal-words").innerHTML;
                let choices = document.getElementById("radioEdit").querySelectorAll("input[name='entryTypeEdit']"); 
                for (const choice of choices) { 
                    if (choice.checked){ 
                        entry.type = choice.value;
                    }
                }
                entryComponent.entry = entry;
                modal.style.display = "none";
                edit.reset();
            });
        });

        //Add the entry component to the text box        
        textBox.appendChild(entryComponent); 
        
        entryForm.reset(); 
    });     
    
}); 

