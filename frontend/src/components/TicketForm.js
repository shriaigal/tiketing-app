import React, { useState } from "react";
import axios from "axios";

function TicketForm() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "",
    createdby: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/tickets", form);
      alert("Ticket created");
      setForm({ title: "", description: "", priority: "", createdby: "" });
      window.dispatchEvent(new Event("ticketcreated"));
    } catch (error) {
      alert("Error creating ticket");
      console.error(error);
    }
  };

  return (
    <div className="ticket-form">
      <h2>Ticket Tracker</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />

          <label htmlFor="description">Description:</label>
          <textarea
            name="description"
            id="description"
            value={form.description}
            onChange={handleChange}
            required
          />

          <label htmlFor="priority">Priority:</label>
          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <label htmlFor="createdby">Your name:</label>
          <input
            type="text"
            name="createdby"
            id="createdby"
            value={form.createdby}
            onChange={handleChange}
            required
          />

          <button type="submit" className="btn">Create Ticket</button>
        </div>
      </form>
    </div>
  );
}

export default TicketForm;
