const form = document.getElementById("note-form"); //empty space and the button
const input = document.getElementById("note-input"); // empty space which is the white box
const errorMessage = document.getElementById("error-message"); //which is empty initially and is not shown at all
const notesContainer = document.getElementById("notes-container");  //the area where all the notes will be appeared
let notes = [];   // list of all the notes


const savedNotes = localStorage.getItem("notes");

if (savedNotes !== null) {
    notes = JSON.parse(savedNotes);
}

renderNotes();

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const noteText = input.value.trim();

    if (noteText === "") {                            //this will just add the text content which was initially nothing 
        errorMessage.textContent = "Please write something first.";
        return;
    }

    errorMessage.textContent = "";                          //if everything is all good

    const newNote = {
        id: Date.now(),
        text: noteText,
        completed: false
    };

    notes.push(newNote);
    saveNotes();
    input.value = "";
    renderNotes();
});

function renderNotes() {
    notesContainer.innerHTML = "";

    for (let i = 0; i < notes.length; i++) {
        const note = notes[i];                              //element of the array

        const noteCard = document.createElement("div");     //element created
        noteCard.className = "note-card";                    

        if (note.completed === true) {
            noteCard.classList.add("completed");
        }

        const noteText = document.createElement("p");           //text of the note
        noteText.textContent = note.text;

        const actions = document.createElement("div");
        actions.className = "note-actions";                     // div with two buttons one complete/undo and second dleete

        const completeButton = document.createElement("button");
        completeButton.textContent = note.completed ? "Undo" : "Complete";   //one complete/undo

        completeButton.addEventListener("click", function () {                //logic of first button
            note.completed = !note.completed;
            saveNotes();
            renderNotes();
        });

        const deleteButton = document.createElement("button");          //second dleete
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function () {
            notes = notes.filter(function (currentNote) {              // logic of second button
                return currentNote.id !== note.id;
            });

            saveNotes();
            renderNotes();
        });

        actions.appendChild(completeButton);
        actions.appendChild(deleteButton);

        noteCard.appendChild(noteText);
        noteCard.appendChild(actions);

        notesContainer.appendChild(noteCard);
    }
}

function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(notes));
}