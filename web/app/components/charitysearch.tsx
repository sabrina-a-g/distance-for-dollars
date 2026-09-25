"use client";

import React, { useState, useEffect } from "react";

export default function CharitySearch() {
    const [results, setResults] = useState([]);
    const [query, setQuery] = useState("");

    useEffect(() => {  
        if (!query) return;
            const timer = setTimeout(async () => {  
            const response = await fetch(`https://partners.every.org/v0.2/search/${query}?apiKey=${process.env.NEXT_PUBLIC_EVERY_ORG_API_KEY}`);
            const data = await response.json();
                 setResults(data.nonprofits);
        }, 250);
        return () => clearTimeout(timer);
    }, [query]);

    return (
        <><input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a charity" />
            <div>
                <ul>
                    {results.map((nonprofit) => (
                        <li key={nonprofit.slug}>{nonprofit.name}</li>
                    ))}
                </ul>
            </div></>
    )
}