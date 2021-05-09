let template; 
document.addEventListener('DOMContentLoaded', ()=>{ 

    //Create the component in the DOM 
    template = document.createElement('entry-creator'); 

    //Grab the main block and append
    let mainB = document.getElementsByTagName('main'); 
    mainB[0].appendChild(template); 

    //Assign id to created component
    template.id = "entryTemplate"; 

    //Obtain form from the shadow root of cretaed component
    let entryForm = document.getElementById("entryTemplate").shadowRoot.getElementById("entryCreator"); 
    
    //Send the entry from the form to textbox
    entryForm.addEventListener('submit', (event) =>{
        event.preventDefault(); 

        let textBox = document.getElementById("textWrapper");
        let entry = template.createEntry(); 
        
        let newEntry = document.createElement("p"); 

        //Only showing the text right now **TODO** 
        newEntry.innerHTML = entry.content; 
        textBox.appendChild(newEntry);
        entryForm.reset(); 
    });
}); 



