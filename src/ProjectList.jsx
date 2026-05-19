import { useState, useEffect } from 'react';
import Card from './Card';

function ProjectList() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const [title, setTitle] = useState('');
    const [tech, setTech] = useState('');

    useEffect(function() {
        fetch('http://localhost:3000/api/projects')
            .then(function(response) {
                if (!response.ok) {
                    throw new Error("Fisierul JSON nu a putut fi gasit.");
                }
                return response.json();
            })
            .then(function(data) {
                setProjects(data)
                setLoading(false);
            })
            .catch(function() {
                setError('Eroare la incarcarea datelor');
                setLoading(false);
            });
    }, []);

    async function handleSubmit() {
 try {
    const response = await fetch('http://localhost:3000/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title, tech: tech }),
    });
    const newProject = await response.json();
        setProjects([...projects, newProject]);
        setTitle(''); // Goleste input-urile
        setTech('');
    } catch (err) {
        console.error('Eroare:', err);
    }
}


    async function handleDelete(id) {
try {
    const response = await fetch('http://localhost:3000/api/projects/' + id, {
            method: 'DELETE'
        });

        if (response.ok) {
            setProjects(projects.filter(p => p._id !== id));
        }
    } catch (err) {
        console.error('Eroare la ștergere:', err);
    }
}

    if (loading) {
        return <p>Se incarca...</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    const filteredProjects = projects.filter(function(p) {
        return p.title.toLowerCase().includes(search.toLowerCase());
    });

    const totalProiecte = projects.length;
    const finalizate = projects.filter(p => p.done).length;
    const inLucru = projects.filter(p => !p.done).length;

    return (
        <div>
            <h3>Proiecte din JSON</h3>

            <form onSubmit={handleSubmit} style={{ margin: '20px 0', display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
                <input 
                    type="text" 
                    placeholder="Titlu proiect..." 
                    value={title} 
                    onChange={e => setTitle(e.target.value)} 
                    required 
                />
                <input 
                    type="text" 
                    placeholder="Tehnologii (ex: React, Node)..." 
                    value={tech} 
                    onChange={e => setTech(e.target.value)} 
                    required 
                />
                <button type="submit">Adaugă Proiect</button>
            </form>
            
            <input 
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
                placeholder="Cauta proiect..."
            />

            {filteredProjects.map(function(item) {
                return (
                    <div key={item._id} style={{ border: '1px solid #444', padding: '10px', margin: '10px 0', borderRadius: '4px' }}>
                        <Card 
                            title={item.title} 
                            description={item.tech} 
                        />
                        <button 
                            onClick={() => handleDelete(item._id)}
                            style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer', borderRadius: '4px', marginTop: '5px' }}
                        >
                            Delete
                        </button>
                    </div>
                );
            })}

            <div style={{ marginTop: '20px', borderTop: '1px solid gray' }}>
                <p>Total proiecte: {totalProiecte}</p>
                <p>Finalizate: {finalizate}</p>
                <p>In lucru: {inLucru}</p>
            </div>
        </div>
    );
}

export default ProjectList;