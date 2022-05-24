import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import ChatRoom from './ChatRoom';
import Login from './Login'


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element = {<Login  key={1}/>}/>
          <Route path='/chatroom' element = {<ChatRoom key={2}/>} />
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
