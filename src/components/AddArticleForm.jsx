import { useState } from "react";
import axios from "axios";
function ArticleForm(){
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); 

        const articleData = {
            name: name,
            title: title,
            content: content.split('\n').filter(paragraph => paragraph.trim() !== '')
        };

        axios.post('http://localhost:8000/api/articles', articleData)
            .then(response => {
                console.log('Artigo enviado com sucesso:', response.data);
                setMessage(response.data.message);
                setName('');
                setTitle('');
                setContent('');
            })
            .catch(error => {
                console.error('Erro ao enviar o artigo:', error);
                setMessage(error.response.data.message)
            });
    };
    return(
        <>
            <h1>Insira um artigo novo</h1>
            <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Nome do Artigo:</label>
                <input 
                    type="text" 
                    id="name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                />
            </div>
            <div>
                <label htmlFor="title">Título:</label>
                <input 
                    type="text" 
                    id="title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    required 
                />
            </div>
            <div>
                <label htmlFor="content">Conteúdo:</label>
                <textarea 
                    id="content" 
                    value={content} 
                    onChange={(e) => setContent(e.target.value)} 
                    required 
                ></textarea>
            </div>
            <button type="submit">Enviar Artigo</button>
        </form>
        {message && <p>{message}</p>}
        </>
    )
}
export default ArticleForm