import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ border: '1px solid #ddd', padding: 12, borderRadius: 8, marginTop: 12 }}>
      <p style={{ fontSize: 18 }}>Current Count: <strong>{count}</strong></p>
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={() => setCount(count + 1)}>Increment</button>
        <button onClick={() => setCount(count - 1)}>Decrement</button>
        <button onClick={() => setCount(0)}>Reset</button>
      </div>
    </div>
  );
}

export default Counter;