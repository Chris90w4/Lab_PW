import { useState, useEffect } from 'react';
import Card from './Card';

function ProjectList() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');

    useEffect(function() {
        fetch("public/data/projects.json")
            .then(function(response) {
                if (!response.ok) {
                    throw new Error("Fisierul JSON nu a putut fi gasit.");
                }
                return response.json();
            })
            .then(function(data) {
                setProjects(data.projects);
                setLoading(false);
            })
            .catch(function() {
                // Am scos 'err' de aici pentru ca nu il foloseai
                setError('Eroare la incarcarea datelor');
                setLoading(false);
            });
    }, []);

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
            
            <input 
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
                placeholder="Cauta proiect..."
            />

            {filteredProjects.map(function(item) {
                return (
                    <Card 
                        key={item.id} 
                        title={item.title} 
                        description={item.tech} 
                    />
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