"use client";

import React, { useState, useEffect } from "react";

export default function CharitySearch() {
    const [results, setResults] = useState([]);
    const [query, setQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {  
        if (!query) return;
            const timer = setTimeout(async () => {  
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(`https://partners.every.org/v0.2/search/${query}?apiKey=${process.env.NEXT_PUBLIC_EVERY_ORG_API_KEY}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch charities");
                }
                const data = await response.json();
                setResults(data.nonprofits);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            } 
            }, 250);
        return () => clearTimeout(timer);
    }, [query]);

    return (
        <><input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a charity" />
            {isLoading && <p>Loading...</p>}
            {!isLoading && query && results.length === 0 && <p>No charities found.</p>}
            {error && <p>{error}</p>}
            <div>
                <ul>
                    {results.map((nonprofit) => (
                        <li key={nonprofit.slug}>{nonprofit.name}</li>
                    ))}
                </ul>
            </div></>
    )
}