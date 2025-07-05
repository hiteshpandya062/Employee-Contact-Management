import './App.css';
import { EmployeesView } from './features/employees';
import { ToastMessageProvider } from './utils/ToastMessageProvider';

function App() {
  return (
    <div>
      <ToastMessageProvider>
        <EmployeesView />
      </ToastMessageProvider>
    </div>
  );
}

export default App;
