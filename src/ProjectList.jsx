import { useState, useEffect } from 'react';
import Card from './Card';

function ProjectList() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const [title, setTitle] = useState('');
    const [tech, setTech] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editTech, setEditTech] = useState('');

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
        if (window.confirm('Sigur doriti sa stergeti acest proiect?')) {
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
}

    async function handleToggle(id, currentDone) {
try {
    const response = await fetch('http://localhost:3000/api/projects/' + id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ done: !currentDone })
        });

        if (!response.ok) {
                throw new Error("Serverul a raspuns cu eroarea: " + response.status);
            }

    const updatedProject = await response.json();
        
            setProjects(projects.map(p => p._id === id ? updatedProject : p));
    } catch (err) {
        console.error('Eroare la modificarea statusului:', err);
    }
}


    async function handleSaveEdit(id) {
        try {
            const response = await fetch('http://localhost:3000/api/projects/' + id, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: editTitle, tech: editTech })
            });

            if (response.ok) {
                const updatedProject = await response.json();
                setProjects(projects.map(p => p._id === id ? updatedProject : p));
                setEditingId(null);
            }
        } catch (err) {
            console.error('Eroare la salvarea editarii:', err);
        }
    }

    function startEdit(project) {
        setEditingId(project._id);
        setEditTitle(project.title);
        setEditTech(project.tech);
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

            <form onSubmit={handleSubmit} style={{ margin: '20px 0', display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px', padding: '15px', backgroundColor: '#1e1e1e', borderRadius: '6px', border: '1px solid #333', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                <input 
                    type="text" 
                    placeholder="Titlu proiect..." 
                    value={title} 
                    onChange={e => setTitle(e.target.value)} 
                    required 
                    style={{ padding: '6px', borderRadius: '4px', border: '1px solid #555' }}
                />
                <input 
                    type="text" 
                    placeholder="Tehnologii (ex: React, Node)..." 
                    value={tech} 
                    onChange={e => setTech(e.target.value)} 
                    required 
                    style={{ padding: '6px', borderRadius: '4px', border: '1px solid #555' }}
                />
                <button type="submit" style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '8px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                    Adauga Proiect
                </button>
            </form>
            
            <input 
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
                placeholder="Cauta proiect..."
            />

            {filteredProjects.map(function(item) {

                if (editingId === item._id) {
                        return (
                            <div key={item._id} style={{ border: '2px dashed #17a2b8', padding: '20px', margin: '10px 0', borderRadius: '4px', backgroundColor: '#252526', boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }}>
                                <input 
                                    type="text" 
                                    value={editTitle} 
                                    onChange={e => setEditTitle(e.target.value)} 
                                    style={{ color: 'black', display: 'block', marginBottom: '5px', width: '100%', padding: '6px' }}
                                />
                                <input 
                                    type="text" 
                                    value={editTech} 
                                    onChange={e => setEditTech(e.target.value)} 
                                    style={{ color: 'black', display: 'block', marginBottom: '10px', width: '100%', padding: '6px' }}
                                />
                                <button onClick={() => handleSaveEdit(item._id)} style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer', borderRadius: '4px', marginRight: '5px' }}>
                                    Salveaza
                                </button>
                                <button onClick={() => setEditingId(null)} style={{ backgroundColor: '#6c757d', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer', borderRadius: '4px' }}>
                                    Anuleaza
                                </button>
                            </div>
                        );
                    } 


                return (
                        <div 
                            key={item._id} 
                            style={{ 
                                border: item.done ? '1px solid #28a745' : '1px solid #444', 
                                padding: '10px', 
                                margin: '10px 0', 
                                borderRadius: '4px',
                                backgroundColor: item.done ? '#1e3d2f' : '#252526',
                                boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
                                transition: 'transform 0.2s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <Card 
                                title={item.title} 
                                description={item.tech} 
                            />
                            <button 
                                onClick={() => handleToggle(item._id, item.done)}
                                style={{ 
                                    backgroundColor: item.done ? '#28a745' : '#ffc107', 
                                    color: 'black', 
                                    border: 'none', 
                                    padding: '5px 10px', 
                                    cursor: 'pointer', 
                                    borderRadius: '4px',
                                    marginRight: '10px',
                                    fontSize: '14px'
                                }}
                            >
                                {item.done ? 'Finalizat' : 'In lucru'}
                            </button>
                            <button 
                                onClick={() => startEdit(item)}
                                style={{ backgroundColor: '#007bff', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer', borderRadius: '4px', marginRight: '10px', fontSize: '14px' }}
                            >
                                Editeaza
                            </button>
                            <button 
                                onClick={() => handleDelete(item._id)}
                                style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer', borderRadius: '4px' }}
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