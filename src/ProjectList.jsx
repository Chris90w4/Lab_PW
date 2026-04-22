import { useState, useEffect } from 'react';
import Card from './Card';

function ProjectList() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(function() {
        fetch('/data/projects.json')
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                setProjects(data.projects);
                setLoading(false);
            })
            .catch(function(error) {
                console.error("Eroare la fetch:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Se incarca...</p>;
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