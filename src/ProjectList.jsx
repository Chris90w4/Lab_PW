import { useState, useEffect } from 'react';
import Card from './Card';

function ProjectList() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    

    useEffect(function() {
        fetch('/data/projectsd.json')
            .then(function(response) {if (!response.ok) {
                    throw new Error("Fisierul JSON nu a putut fi gasit.");
                }
                return response.json();
            })
            .then(function(data) {
                setProjects(data.projects);
                setLoading(false);
            })
            .catch(function(error) {
                console.error("Eroare la fetch:", error);
                setError("A aparut o eroare la incarcarea proiectelor.");
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Se incarca...</p>;
    }

    if (error) {
        return <p style={{ color: 'red', padding: '10px' }}>{error}</p>;
    }

console.log("Proiecte: ", projects);

    return (
        <div>
            <h3>Proiecte din JSON</h3>
            {projects.map(function(item) {
                return (
                    <Card 
                        key={item.id} 
                        title={item.title} 
                        description={item.tech} 
                    />
                );
            })}
        </div>
    );
}

export default ProjectList;