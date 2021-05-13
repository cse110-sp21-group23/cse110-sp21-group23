let template; 
let img = document.createElement("img");
document.addEventListener("DOMContentLoaded", ()=>{ 

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
    entryForm.addEventListener('submit', (event) => {
        event.preventDefault(); 

        //Obtain the text box in index.html
        let textBox = document.getElementById("entry-container");
        //Make an entry component 
        let entryComponent = document.createElement('entry-comp');
        
        //Create entry object using entry-creator and use to set entry-component
        let entry = template.createEntry(); 
        entryComponent.entry = entry; 

        //Add the entry component to the text box        
        textBox.appendChild(entryComponent); 
        
        entryForm.reset(); 
    });       
}); 

