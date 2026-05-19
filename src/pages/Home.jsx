import { useState, useEffect } from 'react';

function Home() {
    const [stats, setStats] = useState({ total: 0, done: 0, inProgress: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(function() {
        fetch('http://localhost:3000/api/stats')
            .then(function(response) {
                if (!response.ok) {
                    throw new Error('Nu s-au putut incarca statisticile.');
                }
                return response.json();
            })
            .then(function(data) {
                setStats(data);
                setLoading(false);
            })
            .catch(function(err) {
                console.error('Eroare statistici:', err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Se incarca statisticile live...</p>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <h1>Pagina Home</h1>
            <h3>Statistici live din Baza de Date:</h3>
            
            <div style={{ border: '1px solid #444', padding: '15px', borderRadius: '6px', maxWidth: '300px', marginTop: '15px' }}>
                <p>Total proiecte: {stats.total}</p>
                <p>Finalizate: {stats.done}</p>
                <p>In lucru: {stats.inProgress}</p>
            </div>
        </div>
    );
}

export default Home;