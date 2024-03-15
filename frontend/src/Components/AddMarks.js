import React, { useState } from "react";

function AddMarks() {
  const [marks, setMarks] = useState([""]);

  const handleaddinput = () => {
    setMarks([...marks, ""]);
  };
  const handleInputChange = (index, event) => {
    const newMarks = [...marks];
    newMarks[index] = event.target.value;
    setMarks(newMarks);
    };
    
    const handleSubmit = () => {
        
    };

  return (
    <div className="flex  justify-center items-center flex-col">
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">ID: {userid}</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>Home</li>
            <li></li>
            <li>
              <button className="btn btn-secondary" onClick={handlelogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          {/* Map through the inputs state to render input fields */}
          {inputs.map((input, index) => (
            <input
              key={index}
              type="text"
              value={input}
              onChange={(event) => handleInputChange(index, event)}
            />
          ))}
          {/* Button to add more input fields */}
          <button type="button" onClick={handleaddinput}>
            + Add
          </button>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default AddMarks;
