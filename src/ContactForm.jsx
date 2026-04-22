import { useState } from 'react';

function ContactForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [msg, setMsg] = useState('');
    const [feedback, setFeedback] = useState('');

    function trimite(e) {
        e.preventDefault();
        if (name && email && msg) {
            setFeedback("Multumim, " + name + "!");
        } else {
            setFeedback("Completeaza toate campurile");
        }
    }
return (
    <form onSubmit={trimite} style={{ border: '1px solid gray', padding: '10px' }}> <br/>
        <input placeholder="Nume" value={name} onChange={e => setName(e.target.value)}/><br/>
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/><br/>
        <textarea placeholder="Mesaj" value={msg} onChange={e => setMsg(e.target.value)}/><br/>
        <button type="submit">Trimite</button>
        <p>{feedback}</p> 
    </form>
);
}

export default ContactForm;