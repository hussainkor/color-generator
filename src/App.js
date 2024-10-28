import { useState } from 'react';
import SingleColor from './SingleColor';
import Values from 'values.js';

function App() {
  const [color, setColor] = useState('');
  const [error, setError] = useState(false);
  const [lists, setLists] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      let colors = new Values(color).all(10);
      setLists(colors)
      console.log(colors);
      setError(false);
    }
    catch (error) {
      setError(true);
    }
  }

  return (
    <div className="App">
      <h1>Color Generator</h1>
      <form onSubmit={handleSubmit} className='form-box'>
        <input
          placeholder='#f15025'
          type='text'
          value={color}
          onChange={(e) => setColor(e.target.value)}
          style={{ borderColor: error && 'red' }}
        />
        <button>Generate</button>
      </form>
      <div className='color-list'>
        {error ? <div className='alert'><p>Enter correct color code</p></div> :
          lists.map((list, i) => {
            return <SingleColor key={i} {...list} index={i} />
          })
        }
      </div>
    </div>
  );
}

export default App;
