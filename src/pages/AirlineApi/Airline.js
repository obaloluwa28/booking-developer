import React, { useState } from "react";
import ProductCard from "../../components/ProductCard";
import { Filter } from 'lucide-react';

const Airline = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');

    const categories = ['All']

    const products = [
         {
            title: "Wisefares Airline API B2B",
            description: "Comprehensive airline API for flight search, booking, and management",
            version: "2.0.0",
            badge: "Agentic",
            tags: ["Flight Search", "Booking", "Airline Integration"],
            slug: "wisefares-airline"
        },
          {
            title: "Sabre Mosaic",
            description: "Comprehensive airline API for flight search, booking, and management",
            version: "2.0.0",
            badge: "Agentic",
            tags: ["Flight Search", "Booking", "Airline Integration"],
            slug: "wisefares-airline-api"
        },
    ];





    const filteredProducts = selectedCategory === 'all'
        ? products
        : products.filter(p => p.category === selectedCategory);


    return (
        <div>
            {/*Header */}
            <section className="bg-[#f8fafc] border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <h1 className="text-3xl lg:text-4xl font-bold text-[#1a2b4c] mb-4">Airline API</h1>
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

export default Airline;