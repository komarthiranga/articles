// components/ArticleDetail.tsx
import React from "react";
import Link from "next/link"; // Import Link from next/link

interface Article {
  title: string;
  abstract: string;
  multimedia: { url: string }[];
  url: string;
}

interface ArticleDetailProps {
  article: Article | null;
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ article }) => {
  if (!article)
    return <div className="text-center text-gray-500">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">{article.title}</h2>
      <p className="text-gray-700 mb-6">{article.abstract}</p>
      {article?.multimedia?.length > 0 && (
        <img
          src={article.multimedia[0].url}
          alt={article.title}
          className="w-full h-auto rounded-lg shadow-md mb-4"
        />
      )}
      <div className="flex">
      <div className="flex">
            <a
            href="/"
            className="mt-4 inline-block text-blue-600 hover:underline font-medium transition duration-300"
            >
            &larr; Back to Articles
            </a>
        </div>    
        &nbsp;&nbsp;
        <div className="flex justify-end items-end w-[80%]">
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-lg text-blue-600 hover:underline mt-4"
        >
          Read more
        </a>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
