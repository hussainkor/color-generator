import { useState } from 'react';
import SingleColor from './SingleColor';
import Values from 'values.js';

function App() {
  const [color, setColor] = useState('');
  const [error, setError] = useState(false);
  const [variation, setVariation] = useState(10)
  const [lists, setLists] = useState(new Values('#f15025').all(variation));

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      let colors = new Values(color).all(variation);
      setLists(colors)
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
        <div className='field-control'>
          <div className='input-block'>
            <label>Color Code</label>
            <input
              placeholder='#f15025'
              type='text'
              value={color}
              onChange={(e) => setColor(e.target.value)}
              style={{ borderColor: error && 'red' }}
            />
          </div>
          <div className='input-block'>
            <label>Color Variations</label>
            <select value={variation} onChange={(e) => setVariation(+e.target.value)}>
              {Array.from({ length: 20 }, ((_, i) => i + 1)).map((index) => <option key={index} value={index}>{index}</option>)}
            </select>
          </div>
        </div>
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
