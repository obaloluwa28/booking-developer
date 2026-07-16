import React, { useState } from "react";
import ProductCard from "../../components/ProductCard";
import { Filter } from "lucide-react";



const WisefaresAirline = () => {

    const [selectedCategory, setSelectedCategory] = useState('all');

    const categories = ['All', ];

    const products = [
        {
            title: "Flight Search API",
            description: "Comprehensive flight search and shopping capabilities with real-time availability and pricing.",
            version: "1.0",
            tags: ["AIRLINES", "SEARCH", "BOOKING"],
            category: "Airlines",
            slug: "wisefares-flight-search-api"
        },
        {
            title: "Flight Retrieve API",
            description: "Retrieve and manage existing flight bookings and itineraries.",
            version: "1.0",
            badge: "Premium",
            tags: ["AIRLINES", "RETRIEVE", "BOOKING"],
            category: "Airlines",
            slug: "wisefares-flight-retrieve-api"
        },
        {
            title: "Agentic APIs",
            description: "Empower your AI agents with direct, accurate, and realtime access to Wisefares's industry...",
            version: "1.0",
            badge: "+Agentic ready",
            tags: ["SEARCH", "Wisefares AI", "TRAVEL AGENCY"],
            slug: "agentic-apis"
        },
        {
            title: "Affiliate Commission API",
            description: "Empower your AI agents with direct, accurate, and realtime access to Wisefares's industry...",
            version: "1.0",
            badge: "+Agentic ready",
            tags: ["SEARCH", "Wisefares AI", "TRAVEL AGENCY"],
            slug: "agentic-apis"
        },
    ];

    const filteredProducts = selectedCategory === 'all'
        ? products
        : products.filter(p => p.category === selectedCategory);


    return (
        <div>

            {/* Header */}
            <section className="bg-[#f8fafc] border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <h1 className="text-3xl lg:text-4xl font-bold text-[#1a2b4c] mb-4">Wisefares Airline B2B</h1>
                    <p className="text-gray-600 max-w-2xl">
                        Explore our comprehensive collection of APIs and services designed to power the future of travel technology.
                    </p>
                </div>
            </section>

            {/* Filters and Products */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Category Filters */}
                    <div className="flex flex-wrap items-center gap-4 mb-8 pb-4 border-b border-gray-200">
                        <Filter size={18} className="text-gray-400" />
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category.toLowerCase() === 'all' ? 'all' : category)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${(selectedCategory === 'all' && category === 'All') || selectedCategory === category
                                        ? 'bg-[#1a2b4c] text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Products Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProducts.map((product, index) => (
                            <ProductCard key={index} {...product} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
};

export default WisefaresAirline;