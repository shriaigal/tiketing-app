import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TicketList() {
  const [tickets, setTickets] = useState([]);

  const fetchTickets = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/tickets');
      setTickets(res.data);
    } catch (error) {
      alert('Error fetching tickets...');
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:3000/api/tickets/${id}`, { status: newStatus });
      

      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket._id === id ? { ...ticket, status: newStatus } : ticket
        )
      );
    } catch (error) {
      alert("Error updating ticket");
      console.log(error);
    }
  };

  const deleteTicket=async(id)=>{
    try{
        await axios.delete(`http://localhost:3000/api/tickets/${id}`);
        alert("Ticket Deleted...");
        setTickets(prevTickets=>prevTickets.filter(ticket=>ticket._id!==id));
    }catch(error)
    {
        alert("Error Deleting ticket");
    }
  };

  useEffect(() => {
    fetchTickets();
    window.addEventListener('ticketcreated', fetchTickets);
    return () => window.removeEventListener('ticketcreated', fetchTickets);
  }, []);

  return (
    <div className="ticket-list">
      <h2>Ticket List</h2>
      {tickets.length === 0 && <p>No Ticket Found in database</p>}
      <div className="ticket-grid">
        {tickets.map((ticket) => (
          <div key={ticket._id} className="ticket-card">
            <h3>{ticket.title}</h3>
            <div className="ticket-info">
              <div><b>Priority:</b> <span>{ticket.priority}</span></div>
              <div><b>Created By:</b> <span>{ticket.createdby}</span></div>
              <div><b>Status:</b> <span>{ticket.status}</span></div>
            </div>
            <div className="student-update">
              <button onClick={() => updateStatus(ticket._id, "placed")}>Placed</button>
              <button onClick={() => updateStatus(ticket._id, "unplaced")}>Unplaced</button>
              <button onClick={()=>deleteTicket(ticket._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TicketList;
