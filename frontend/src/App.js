import './App.css';
import TicketForm from "./components/TicketForm";
import TicketList from "./components/TicketList";
function App() {
  return (
      <div className='App'>
          <h1>Ticket Management System</h1>
          <TicketForm/>
          <TicketList/>
      </div>
  );
}

export default App;
