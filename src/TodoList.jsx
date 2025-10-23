import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
// import './TodoList.css'; // Removed this line to fix the build error

//=================================================================
// EMBEDDED STYLES
//=================================================================
/**
 * @component TodoListStyles
 * @description
 * This component injects a <style> tag directly into the document head.
 * We are using this approach instead of an external .css file to make this
 * component self-contained and resolve the "Could not resolve './TodoList.css'"
 * build error in this environment.
 */
function TodoListStyles() {
  return (
    <style>{`
      /* Page background */
      body {
        font-family: "Poppins", sans-serif;
        background-color: #f5f6fa;
        margin: 0;
        padding: 0;
      }

      /* Center everything */
      .todo-container {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        min-height: 100vh;
        padding-top: 60px;
      }

      /* Main card */
      .todo-card {
        background-color: white;
        width: 400px;
        border-radius: 15px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        padding: 30px 40px;
      }

      /* Headings */
      .todo-title {
        text-align: center;
        color: #1e2a4a;
        margin-bottom: 20px;
      }

      .todo-subtitle {
        color: #2d3b5e;
        font-size: 1.2rem;
        margin-top: 25px;
        border-bottom: 2px solid #ececec;
        padding-bottom: 5px;
      }

      /* Input + Button */
      .input-section {
        display: flex;
        justify-content: center;
        gap: 10px;
      }

      .input-section input {
        flex: 1;
        padding: 10px;
        border: 1.5px solid #ccc;
        border-radius: 8px;
        font-size: 15px;
        outline: none;
        transition: all 0.2s ease;
      }

      .input-section input:focus {
        border-color: #007bff;
      }

      .input-section button {
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 8px;
        padding: 10px 14px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .input-section button:hover {
        background-color: #0056b3;
      }

      /* Task list */
      .todo-list {
        list-style-type: none;
        padding: 0;
        margin-top: 15px;
      }

      .todo-list li {
        background-color: #f9fafc;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 10px 0;
        padding: 12px 15px;
        border-radius: 10px;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
      }

      .task-text {
        font-size: 16px;
        color: #333;
        font-weight: 500;
      }

      /* Buttons */
      .btn-group {
        display: flex;
        gap: 8px;
      }

      .delete-btn {
        background-color: #e74c3c;
        color: white;
        border: none;
        border-radius: 8px;
        padding: 6px 12px;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .delete-btn:hover {
        background-color: #c0392b;
      }

      .update-btn {
        background-color: #f1c40f;
        color: #222;
        border: none;
        border-radius: 8px;
        padding: 6px 12px;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .update-btn:hover {
        background-color: #d4ac0d;
      }
    `}</style>
  );
}


//INFORMATION ABOUT COMPONENTS
//input -> value = {} , this attribute tells input box to always contain a specific value e.g(val = "hello" inside input box -> hello)
//input -> onChange = {} , this is an Event Listener which tracks each and every change in input box and letters
//In Case of Arrays React always Checks that if the Address of Array is Same if Address of Array is same as that of initiliazed
// then React will feel that there is no change in Array even if we push or pop elements from Array
// So to Overcome this we use Spread operator(...) to return a new Array by copying old Array
export default function TodoList(){
  	//As we are going to change the State of UI by rendering our Todo List Array(Array of objects) We will use React's "hook" called [useState]
  	const[todoArr , setTodoArr] = useState([{task:"Sample-Task",id:uuidv4()}]);//Initial Todo List with one Sample Task
  	const[todoValue , settodoValue] = useState("");//State variable to store the value of input box
  	
    //function to add Task into Object Array
  	function addTask(){
  	 	//We have to pass new Value to State Function because  React needs a new Value to Rerender the UI with that value 
  	 	//we will use here Spread function 
        // We also add a check to prevent adding empty tasks
        if (todoValue.trim() === "") {
            return; // Don't add empty tasks
        }
  	 	setTodoArr([...todoArr,{task:todoValue,id:uuidv4()}]);//Adding new Object inside the Array
  	 	settodoValue("");//Clearing the input box after adding task
  	}
  	
    //Function to pass value of input box to the state variable named "todoValue"
  	function inputValue(event){
  	 	//Always pass a new Value to State Function 
  	 	settodoValue(event.target.value);
  	}

    //Function to delete a task from the Todo List
  	function deleteTask(id){
  	 	/*While Deleting task we will not perform any pop action we will simply make a new Array using filter method
  	 	based on ID condition which will automatically exclude that ID which we want to delete and we will pass a 
  	 	new Array of Objects to State Function Which will Rerender UI Again
  	 	Here the id that will match el.id will automatically Excluded and this is also returned in React Document */
  	 	
        // Using a functional update for 'setTodoArr' is a best practice.
        // It ensures we are always working with the most recent state (prevArr).
  	 	setTodoArr((prevArr) => prevArr.filter((el) => el.id !== id));
  	}

    //=================================================================
    // STATE UPDATE LOGIC (IMMUTABLE)
    //=================================================================
    /**
     * @function updateTask
     * @param {string} id - The unique identifier of the task to update.
     * @param {string} newText - The new task description.
     *
     * @description
     * This function handles the core logic for immutably updating a specific task.
     * It receives the current state (prevArr) from the 'setTodoArr' updater,
     * maps over the array, and returns a new array instance.
     *
     * By checking the 'id', we ensure only the target object is replaced with a new
     * object instance ({ ...el, task: newText }), while all other objects
     * are returned unchanged (preserving their reference). This is crucial
     * for React's reconciliation process and performance.
     */
    function updateTask(id, newText) {
        setTodoArr((prevArr) =>
          prevArr.map((el) => {
            if (el.id === id) {
              // Found the element to update: return a new object
              return { ...el, task: newText };
            } else {
              // This element is not the one: return it unchanged
              return el;
            }
          })
        );
    }

    //=================================================================
    // EVENT HANDLER (USER INTERACTION)
    //=================================================================
    /**
     * @function handleUpdateClick
     * @param {string} id - The ID of the task to be updated, passed from the list item.
     *
     * @description
     * This function acts as a controller between the user's action (click) and
     * the state update logic.
     * 1. It retrieves the new task text from the user via a native browser prompt.
     * 2. It validates the input to prevent null or empty string submissions.
     * 3. If valid, it dispatches the update action by calling 'updateTask'
     * with the correct 'id' and 'newText'.
     */
    function handleUpdateClick(id) {
        // 1. Get new task text from user
        const newText = prompt("Enter new task text:");

        // 2. Validate the input
        if (newText != null && newText.trim() !== "") {
          // 3. Call the state update logic
          updateTask(id, newText);
        }
        // If the user presses "Cancel" (newText is null) or enters empty space,
        // nothing happens.
    }

 	console.log("UI Rerendered"); // This log is useful for debugging renders

    //=================================================================
    // COMPONENT RENDER (UI)
    //=================================================================
    return(
      // We use a React Fragment (<>) to return multiple elements:
      // 1. The <TodoListStyles /> component to inject CSS
      // 2. The main <div> for the app UI
      <>
        <TodoListStyles />
        {/* Main container for the app */}
    	 	<div className="todo-container">
          <div className="todo-card">
              {/* App Title */}
        	 	 	<h1 className="todo-title">Todo List</h1>
              
              {/* Input and Add Button Group */}
              <div className="input-section">
                  {/* This is a "Controlled Component".
                    The 'value' prop connects the input box directly to the 'todoValue' state.
                    The 'onChange' prop updates the 'todoValue' state.
                    This two-way binding ensures the input field clears when 'settodoValue("")' is called.
                  */}
        	 	 	 	<input 
                      type="text" 
                      placeholder="Enter task name" 
                      onChange={inputValue} 
                      value={todoValue}
                  />
        	 	 	 	
                  {/* Add Task Button */}
        	 	 	 	<button onClick={addTask}>
                      Add Task
                  </button>
              </div>


              {/* Tasks List Title */}
        	 	 	<h2 className="todo-subtitle">Todo Tasks</h2>
    	 	 	
              {/* Unordered list to hold tasks */}
              <ul className="todo-list">
                {/* We map over the 'todoArr' to render each task.
                  The 'key' prop (el.id) is essential for React to track each item
                  efficiently during updates, additions, and deletions.
                */}
                {todoArr.map((el)=>(
                  // Each task item
                  <li key={el.id}>
                    {/* Task Text */}
                    <span className="task-text">{el.task}</span>
                    
                    {/* Action Buttons Container */}
                    <div className="btn-group">
                        {/* Delete Task Button */}
                        <button 
                          onClick={()=>deleteTask(el.id)} 
                          className="delete-btn"
                        >
                          Delete
                        </button>
                        
                        {/* We pass the element's unique 'id' to the handler */}
                        {/* Update Task Button */}
                        <button 
                          onClick={()=>handleUpdateClick(el.id)} 
                          className="update-btn"
                        >
                          Update
                        </button>
                    </div>
                  </li>
                ))}
              </ul>
          </div>
    	 	</div>
      </>
  	);
}

