import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className='login-form'>
        <form>
          <h1>System login</h1>
          <div className='email-login'>
            <p>Email</p>
            <input type='email'></input>
          </div>
          <div>
            <p>Password</p>
            <input type='password'></input>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
