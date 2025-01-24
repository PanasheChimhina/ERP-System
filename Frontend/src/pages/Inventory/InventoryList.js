import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios

const InventoryList = () => {
    const [inventory, setInventory] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/inventory')
            .then(response => setInventory(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h1>Inventory List</h1>
            <ul>
                {inventory.map(item => (
                    <li key={item._id}>{item.name} - {item.stockLevel}</li>
                ))}
            </ul>
        </div>
    );
};

export default InventoryList;