// components/ArticleDetail.test.tsx  
import React from 'react';  
import { render, screen } from '@testing-library/react';  
import ArticleDetail from '../components/ArticleDetail';  

describe('ArticleDetail Component', () => {  
  it('renders loading state when article is null', () => {  
    render(<ArticleDetail article={null} />);  
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();  
  });  

  it('renders article details correctly', () => {  
    const mockArticle = {  
      title: 'Sample Article Title',  
      abstract: 'This is a sample abstract for the article.',  
      multimedia: [{ url: 'https://example.com/sample-image.jpg' }],  
      url: 'https://example.com/sample-article',  
    };  

    render(<ArticleDetail article={mockArticle} />);  

    // Check if the article title is rendered  
    expect(screen.getByText(mockArticle.title)).toBeInTheDocument();  
    
    // Check if the article abstract is rendered  
    expect(screen.getByText(mockArticle.abstract)).toBeInTheDocument();  

    // Check if the image is rendered  
    const image = screen.getByRole('img');  
    expect(image).toHaveAttribute('src', mockArticle.multimedia[0].url);  
    expect(image).toHaveAttribute('alt', mockArticle.title);  

    // Check if the 'Read more' link is rendered  
    const readMoreLink = screen.getByRole('link', { name: /Read more/i });  
    expect(readMoreLink).toHaveAttribute('href', mockArticle.url);  

    // Check if the 'Back to Articles' link is rendered  
    expect(screen.getByRole('link', { name: /Back to Articles/i })).toBeInTheDocument();  
  });  

  it('renders correctly without multimedia', () => {  
    const mockArticleWithoutImage = {  
      title: 'Sample Article Title',  
      abstract: 'This is a sample abstract for the article.',  
      multimedia: [],  
      url: 'https://example.com/sample-article',  
    };  

    render(<ArticleDetail article={mockArticleWithoutImage} />);  

    // Check if the article title and abstract are rendered  
    expect(screen.getByText(mockArticleWithoutImage.title)).toBeInTheDocument();  
    expect(screen.getByText(mockArticleWithoutImage.abstract)).toBeInTheDocument();  

    // Check that no image is rendered  
    const images = screen.queryAllByRole('img');  
    expect(images.length).toBe(0);  

    // Check if the 'Read more' link is rendered  
    const readMoreLink = screen.getByRole('link', { name: /Read more/i });  
    expect(readMoreLink).toHaveAttribute('href', mockArticleWithoutImage.url);  
  });  
});