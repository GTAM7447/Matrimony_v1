import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import storyImage1 from "../../assets/SuccessStories/story1.jpg";
import storyImage2 from "../../assets/SuccessStories/story2.jpg";

const SuccessStoriesSubpage = () => {
    const [isBookOpen, setIsBookOpen] = useState(false);
    const [selectedStory, setSelectedStory] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);

    const stories = [
        {
            id: 1,
            name: "Rajesh & Priya",
            profession: "Software Engineer & Doctor",
            location: "Mumbai, India",
            quote: "\"Distance couldn't stop us because we had the right connection. Best decision ever!\"",
            description: "Long-distance became love-distance for Priya and Rajesh. Despite being in different cities, they made their relationship work through the platform's messaging features. Rajesh eventually moved to be with Priya, and they now live happily together.",
            fullStory: `Priya and Rajesh's story began when they matched on our platform in early 2022. Priya was working as a doctor in Mumbai while Rajesh was pursuing his MBA in Delhi. Despite the 1,400 km distance between them, they connected instantly over their shared love for technology and travel.

For the first three months, they used our video call feature every evening after work. They'd share their daily experiences, watch movies together using our synchronized streaming feature, and even cook "virtual dinners" while on video call. Rajesh says, "The platform's ice-breaker questions helped us discover so many common interests we wouldn't have found otherwise."

After six months of long-distance dating, Rajesh secured a job transfer to Mumbai. They met in person for the first time at Mumbai airport - a moment they both describe as "magical." Today, they live together in Mumbai and recently got engaged. "We're planning our wedding for next year," Priya shares with a smile. "The platform didn't just give us a connection - it gave us a lifetime partnership."`,
            image: storyImage1
        },
        {
            id: 2,
            name: "Amit & Sneha",
            profession: "Architect & Filmmaker",
            location: "Bangalore, India",
            quote: "\"From virtual chats to forever chats - our journey was magical!\"",
            description: "Sneha found her perfect match when she least expected it. A simple match led to conversations that lasted hours, and now they're building their future together.",
            fullStory: `Sneha, a successful architect in Bangalore, had almost given up on finding love when she decided to give our platform one last try. "I was skeptical about online connections," she admits. But when she saw Amit's profile, something clicked.

Amit, a documentary filmmaker, had just returned from a project in the Himalayas. Their first conversation started with a simple message about travel photography and stretched into a 4-hour video call. "We talked about everything - from our careers to our dreams, our favorite books to our childhood memories," Sneha recalls.

What made their connection special was how the platform's compatibility algorithm matched them on values rather than just interests. Both prioritized family, creativity, and social impact. They discovered they'd actually attended the same college festival years ago but never met.

After two months of daily conversations, Amit planned a surprise meet-up at Sneha's favorite art gallery. "I walked in and there he was, standing next to my favorite painting," Sneha says. "It felt like the universe had aligned."

They now collaborate on architectural documentary projects together and are planning to start their own design studio. "The platform helped us find not just love but a creative partnership," Amit adds.`,
            image: storyImage2
        }
    ];

    const openBook = (story) => {
        setSelectedStory(story);
        setCurrentPage(0);
        setIsBookOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeBook = () => {
        setIsBookOpen(false);
        setTimeout(() => {
            setSelectedStory(null);
            document.body.style.overflow = 'auto';
        }, 500);
    };

    const nextPage = () => {
        if (selectedStory && currentPage < 1) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(prev => prev - 1);
        }
    };

    return (
        <section className="bg-[#F6F6F6] min-h-screen py-16 px-6 sm:px-12 lg:px-20 font-[Inter]">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-orange-500 mb-4">
                        View More Stories
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Real stories from couples who found their perfect match
                    </p>
                </div>

                {/* Stories - Picture size increased */}
                <div className="flex flex-col gap-8">
                    {stories.map((story, index) => (
                        <motion.div
                            key={story.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="flex flex-col lg:flex-row">
                                {/* Image Section - INCREASED HEIGHT HERE */}
                                <div className="lg:w-2/5">
                                    <div className="flex items-center justify-center h-full">
                                        <img
                                            src={story.image}
                                            alt={story.name}
                                            className="w-full h-92 object-cover m-4 rounded" 
                                        />
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="lg:w-3/5 p-5">
                                    {/* Profile Info */}
                                    <div className="mb-3">
                                        <h2 className="text-lg font-bold text-gray-800">{story.name}</h2>
                                        <p className="text-gray-600 text-sm">{story.profession}</p>
                                        <div className="flex items-center text-orange-500 text-xs mt-1">
                                            <svg
                                                className="w-3 h-3 mr-1 text-orange-500"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                            </svg>
                                            {story.location}
                                        </div>
                                    </div>

                                    {/* Quote */}
                                    <blockquote className="text-gray-700 italic font-semibold text-base leading-relaxed mb-3 border-l-4 border-orange-500 pl-3 py-1">
                                        {story.quote}
                                    </blockquote>

                                    {/* Description */}
                                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                                        {story.description}
                                    </p>

                                    {/* View Story Button */}
                                    <motion.button
                                        onClick={() => openBook(story)}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="bg-orange-500 text-white py-2 px-6 rounded-lg font-semibold text-sm hover:bg-orange-600 transition-colors duration-300 mt-4"
                                    >
                                        View full Story
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Book Modal with Framer Motion */}
            <AnimatePresence>
                {isBookOpen && selectedStory && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closeBook}
                            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
                        />

                        {/* Book Container */}
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                            <motion.div
                                initial={{ scale: 0.8, rotateY: 90, opacity: 0 }}
                                animate={{ scale: 1, rotateY: 0, opacity: 1 }}
                                exit={{ scale: 0.8, rotateY: -90, opacity: 0 }}
                                transition={{
                                    type: "spring",
                                    damping: 25,
                                    stiffness: 120
                                }}
                                className="relative w-full max-w-4xl h-[600px]"
                                style={{ perspective: "2000px" }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Book Spine */}
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10">
                                    <div className="w-12 h-[650px] bg-gradient-to-b from-orange-700 via-orange-600 to-orange-700 rounded-l-lg shadow-2xl flex items-center justify-center">
                                        <div className="transform -rotate-90 whitespace-nowrap">
                                            <span className="text-white font-bold tracking-wider text-xs">LOVE STORY</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Book Pages */}
                                <div className="relative w-full h-full flex" style={{ transformStyle: "preserve-3d" }}>
                                    {/* Left Page (Cover) */}
                                    <motion.div
                                        initial={{ rotateY: -90 }}
                                        animate={{ rotateY: 0 }}
                                        transition={{ delay: 0.2, duration: 0.8 }}
                                        className="w-1/2 h-full bg-gradient-to-br from-orange-50 to-white rounded-l-2xl shadow-2xl overflow-hidden"
                                        style={{ transformStyle: "preserve-3d", transformOrigin: "right center" }}
                                    >
                                        <div className="h-full p-8 overflow-y-auto">
                                            <div className="h-full flex flex-col items-center justify-center">
                                                {/* Cover Image */}
                                                <div className="relative mb-8">
                                                    <div className="w-48 h-48 rounded-xl overflow-hidden border-4 border-white shadow-lg">
                                                        <img
                                                            src={selectedStory.image}
                                                            alt={selectedStory.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
                                                        <span className="text-white text-xl">♥</span>
                                                    </div>
                                                </div>

                                                {/* Cover Title */}
                                                <div className="text-center mb-6">
                                                    <h2 className="text-3xl font-bold text-gray-800 mb-2">
                                                        {selectedStory.name}'s Story
                                                    </h2>
                                                    <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full" />
                                                    <p className="text-gray-600 mt-4 text-sm">{selectedStory.profession}</p>
                                                    <p className="text-gray-500 text-sm">{selectedStory.location}</p>
                                                </div>

                                                {/* Quote on Cover */}
                                                <div className="mb-8 text-center">
                                                    <p className="text-gray-600 italic">"{selectedStory.quote.split('"')[1]}"</p>
                                                </div>

                                                {/* Open Book Button */}
                                                <motion.button
                                                    onClick={nextPage}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                                                >
                                                    Open Book
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7-7 7M5 5l7 7-7 7" />
                                                    </svg>
                                                </motion.button>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Right Page (Content) */}
                                    <motion.div
                                        initial={{ rotateY: 90 }}
                                        animate={{ rotateY: 0 }}
                                        transition={{ delay: 0.4, duration: 0.8 }}
                                        className="w-1/2 h-full bg-white rounded-r-2xl shadow-2xl overflow-hidden"
                                        style={{ transformStyle: "preserve-3d", transformOrigin: "left center" }}
                                    >
                                        <div className="h-full p-8 overflow-y-auto">
                                            {/* Page Header */}
                                            <div className="mb-6">
                                                <div className="flex items-center justify-between mb-4">
                                                    <span className="text-sm font-semibold text-orange-600">
                                                        Page {currentPage + 1} of 2
                                                    </span>
                                                    <button
                                                        onClick={closeBook}
                                                        className="text-gray-400 hover:text-gray-600 transition-colors"
                                                    >
                                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </button>
                                                </div>

                                                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                                                    {currentPage === 0 ? "Their Love Story" : "The Journey Continues"}
                                                </h3>
                                                <div className="w-16 h-1 bg-orange-500 rounded-full" />
                                            </div>

                                            {/* Story Content */}
                                            <div className="mb-8">
                                                {currentPage === 0 ? (
                                                    <div className="text-gray-700 leading-relaxed">
                                                        {selectedStory.description}
                                                        <p className="mt-4">
                                                            Click "Next" to read their full journey...
                                                        </p>
                                                    </div>
                                                ) : (
                                                    <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                                                        {selectedStory.fullStory}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Page Navigation */}
                                            <div className="absolute bottom-8 left-8 right-8">
                                                <div className="flex justify-between items-center">
                                                    <motion.button
                                                        onClick={prevPage}
                                                        disabled={currentPage === 0}
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${currentPage === 0
                                                                ? 'text-gray-400 cursor-not-allowed'
                                                                : 'text-orange-600 hover:bg-orange-50'
                                                            }`}
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                                        </svg>
                                                        Previous
                                                    </motion.button>

                                                    {/* Page Indicators */}
                                                    <div className="flex gap-2">
                                                        {[0, 1].map((index) => (
                                                            <button
                                                                key={index}
                                                                onClick={() => setCurrentPage(index)}
                                                                className={`w-2 h-2 rounded-full transition-all ${index === currentPage
                                                                        ? 'bg-orange-500'
                                                                        : 'bg-gray-300'
                                                                    }`}
                                                            />
                                                        ))}
                                                    </div>

                                                    <motion.button
                                                        onClick={nextPage}
                                                        disabled={currentPage === 1}
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${currentPage === 1
                                                                ? 'text-gray-400 cursor-not-allowed'
                                                                : 'text-orange-600 hover:bg-orange-50'
                                                            }`}
                                                    >
                                                        Next
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    </motion.button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>
        </section>
    );
};

export default SuccessStoriesSubpage;