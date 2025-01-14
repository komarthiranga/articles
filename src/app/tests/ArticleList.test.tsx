// components/ArticleList.test.tsx  
import React from 'react';  
import { render, screen, waitFor } from '@testing-library/react';  
import ArticleList from '../components/ArticleList';  
import axios from 'axios';  
import MockAdapter from 'axios-mock-adapter';  
import { API_URL, API_KEY } from "../constants";  

const mockAxios = new MockAdapter(axios);  

describe('ArticleList Component', () => {  
    beforeEach(() => {  
        mockAxios.reset();  
    });  

    it('renders loading state initially', () => {  
        render(<ArticleList />);  
        expect(screen.getByText(/NY Times Most Popular Articles/i)).toBeInTheDocument();  
    });  

    it('fetches and displays articles', async () => {  
        const articles = [  
            {  
                id: '1',  
                title: 'Article 1',  
                abstract: 'This is the abstract for article 1.',  
                multimedia: [{ url: 'https://example.com/image1.jpg' }],  
            },  
            {  
                id: '2',  
                title: 'Article 2',  
                abstract: 'This is the abstract for article 2.',  
                multimedia: [{ url: 'https://example.com/image2.jpg' }],  
            },  
        ];  

        mockAxios.onGet(`${API_URL}?api-key=${API_KEY}`).reply(200, { results: articles });  

        render(<ArticleList />);  

        // Wait for articles to be displayed  
        await waitFor(() => {  
            expect(screen.getByText('Article 1')).toBeInTheDocument();  
            expect(screen.getByText('Article 2')).toBeInTheDocument();  
        });  

        // Check if abstracts are displayed  
        expect(screen.getByText('This is the abstract for article 1.')).toBeInTheDocument();  
        expect(screen.getByText('This is the abstract for article 2.')).toBeInTheDocument();  

        // Check if images are displayed  
        const images = screen.getAllByRole('img');  
        expect(images.length).toBe(2);  
        expect(images[0]).toHaveAttribute('src', 'https://example.com/image1.jpg');  
        expect(images[1]).toHaveAttribute('src', 'https://example.com/image2.jpg');  
    });  

    it('handles empty articles list', async () => {  
        mockAxios.onGet(`${API_URL}?api-key=${API_KEY}`).reply(200, { results: [] });  

        render(<ArticleList />);  

        await waitFor(() => {  
            expect(screen.queryByText('Article 1')).not.toBeInTheDocument();  
            expect(screen.queryByText('Article 2')).not.toBeInTheDocument();  
        });  
    });  

    it('handles fetch error', async () => {  
        mockAxios.onGet(`${API_URL}?api-key=${API_KEY}`).reply(500);  

        render(<ArticleList />);  

        await waitFor(() => {  
            // You can check for an error message or just confirm it doesn't crash  
            expect(screen.getByText(/NY Times Most Popular Articles/i)).toBeInTheDocument();  
        });  
    });  
});