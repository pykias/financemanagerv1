import React, { useState, useEffect } from 'react';

function App() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Funkce pro načtení uživatelů z backendu
    useEffect(() => {
        fetch('http://localhost:8000/user')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setUsers(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    // Funkce pro přidání nového uživatele
    const addUser = () => {
        const newUser = { name: "Nový Uživatel", email: "novy@email.cz" };
        fetch('http://localhost:8000/user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser)
        })
            .then(response => response.json())
            .then(data => {
                setUsers(prevUsers => [...prevUsers, data]);
            })
            .catch(err => setError(err.message));
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Seznam Uživatelů</h1>
            {users.map(user => (
                <div key={user.id}>
                    <p>{user.name}</p>
                    <p>{user.email}</p>
                </div>
            ))}
            <button onClick={addUser}>Přidej uživatele</button>
        </div>
    );
}

export default App;
