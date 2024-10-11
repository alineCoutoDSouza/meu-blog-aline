import { useEffect, useState } from "react";
import ArticleList from "../components/ArticleList";
import articles from "./article-content";
import axios from 'axios'
import ArticleForm from "../components/AddArticleForm";


const ArticlesListPage = () => {
    const [artigos,Setartigos] = useState(articles)
    useEffect(()=>{
        axios.get(`http://localhost:8000/api/articles/`)
        .then(res=>{
            Setartigos(artigos_padrao => [...artigos_padrao,...res.data])
        })
        .catch(e=>{
            console.error(e)
        })
    },[])
    return (
        <>
        <ArticleForm/>
        <hr></hr>
        <h1>Confira os artigos</h1>
        <ArticleList articles={artigos} />
        </>
    )
}

export default ArticlesListPage;