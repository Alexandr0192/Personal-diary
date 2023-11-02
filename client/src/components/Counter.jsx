import React, {useState} from 'react';

/**
 * Пример
 * @returns {JSX.Element}
 * @constructor
 */
const Counter = () => {
    const [count, setCount] = useState(0)

    function decrement() {
        setCount(count + 1)
    }

    function increment() {
        setCount(count - 1)
    }

    return (
        <div>
            <h1>{count}</h1>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decremet</button>
        </div>
    );
};

export default Counter;