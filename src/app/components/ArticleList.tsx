// components/ArticleList.tsx  
'use client';  
import React, { useEffect, useState } from 'react';  
import axios from 'axios';  
import Link from 'next/link';  
import { API_URL, API_KEY } from "../constants";  

interface Article {  
    id: string;  
    title: string;  
    abstract: string;  
    multimedia: { url: string }[];  
}  

const ArticleList: React.FC = () => {  
    const [articles, setArticles] = useState<Article[]>([]);  

    useEffect(() => {  
        const fetchArticles = async () => {  
            try {
            const response = await axios.get(`${API_URL}?api-key=${API_KEY}`);  
            setArticles(response.data.results);  
            } catch (e) {
                console.error(e);
            }
        };  

        fetchArticles();  
    }, []);  

    return (  
        <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-300 p-6">  
            <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-lg">  
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">NY Times Most Popular Articles</h1>  
                <ul className="space-y-6">  
                    {articles.map(article => (  
                        <li key={article.id} className="border border-gray-200 rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300 bg-gray-50">  
                            <Link href={`/articles/${article.id}`} legacyBehavior>  
                                <a className="text-2xl font-semibold text-blue-600 hover:underline">{article.title}</a>  
                            </Link>  
                            <p className="text-gray-700 mt-2">{article.abstract}</p>  
                            {article?.multimedia?.length > 0 && (  
                                <img   
                                    src={article.multimedia[0].url}   
                                    alt={article.title}   
                                    className="mt-4 rounded-lg w-full h-auto object-cover"   
                                />  
                            )}  
                        </li>  
                    ))}  
                </ul>  
            </div>  
        </div>  
    );  
};  

export default ArticleList;