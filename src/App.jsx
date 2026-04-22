import Card from './Card';
import QuickNote from './QuickNote';
import TodoList from './TodoList';
import ContactForm from './ContactForm';
import ProjectList from './ProjectList';

function App() {
  return (
    <div className="App">
      <h1>Dashboard</h1>
      <QuickNote />
      <TodoList />
      <ContactForm />
      
      <ProjectList /> 
    </div>
  );
}
export default App;