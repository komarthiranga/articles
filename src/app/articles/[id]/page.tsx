// app/articles/[id]/page.tsx  
import React from 'react';  
import ArticleDetail from '../../components/ArticleDetail';  
import axios from 'axios';  
import { API_URL, API_KEY } from "../../constants";  

interface Article {  
    title: string;  
    abstract: string;  
    multimedia: { url: string }[];  
    url: string;  
    id: string;  
}  

const ArticlePage: React.FC<{ params: Promise<{ id: string }> }> = async ({ params }) => {  
    // Unwrap the params using React.use()  
    const { id } = await params; // Await the params promise  
    console.log('id......', id);

    let article: Article | null = null;  

    try {  
        const res = await axios.get(`${API_URL}?api-key=${API_KEY}`);  
        const articles: Article[] = res.data.results;  
        console.log("articles.......", articles)
        article = articles.find(item => Number(item.id) === Number(id)) || null;  
        console.log("article.......+++", article)
    } catch (error) {  
        console.error("Error fetching article:", error);  
        // Optionally, you can handle the error state or display a message  
    }  

    return <ArticleDetail article={article} />;  
};  

export default ArticlePage;