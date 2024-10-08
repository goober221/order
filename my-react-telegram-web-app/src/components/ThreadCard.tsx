import {Thread} from "../models/Thread.ts";
import '../App.css'
import React, {useState} from "react";
import SlideShow from "./SlideShow.tsx";
import {Link} from "react-router-dom";

interface ThreadCardProps {
    thread: Thread;
}

const ThreadCard: React.FC<ThreadCardProps> = ({ thread }) => {
    const [isSliderOpen, setIsSliderOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const baseURL = 'https://2ch.hk/';

    const openSlider = () => setIsSliderOpen(true);
    const closeSlider = () => setIsSliderOpen(false);

    const maxLength = 500;
    const fullComment = thread.comment || "";
    const truncatedComment = fullComment.length > maxLength
        ? fullComment.substring(0, maxLength) + "..."
        : fullComment;

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <>
            <div className="relative m-2 bg-amber-400 border-2 border-indigo-600 flex flex-col md:flex-row p-3">
                <div className="absolute right-2 top-2">
                    <Link
                        to={'thread/' + thread.num}
                        className="text-lg md:text-xl cursor-pointer text-indigo-700 hover:text-indigo-900"
                    >
                        В тред
                    </Link>
                </div>

                {/* Image Section */}
                <div className="w-full md:w-48 flex-shrink-0">
                    <div className="m-3 flex items-center justify-center">
                        <img
                            className="object-contain max-w-full max-h-48 cursor-pointer"
                            onClick={openSlider}
                            src={baseURL + thread.files[0].thumbnail}
                            alt={thread.files[0].displayname}
                        />
                    </div>
                </div>

                {isSliderOpen && <SlideShow files={thread.files} onClose={closeSlider} />}

                <div className="flex-1 mt-5 md:mt-0 md:ml-5">
                    <p
                        className="text-left text-sm md:text-base mb-4"
                        dangerouslySetInnerHTML={{ __html: isExpanded ? fullComment : truncatedComment }}
                    ></p>

                    {fullComment.length > maxLength && (
                        <button
                            onClick={toggleExpand}
                            className="text-blue-500 hover:underline focus:outline-none"
                        >
                            {isExpanded ? 'Show Less' : 'Show More'}
                        </button>
                    )}

                    <div className="flex flex-col md:flex-row justify-between mt-auto">
                        <p className="text-sm md:text-base">
                            <strong>Постов:</strong> {thread.posts_count}
                        </p>
                        <p className="text-sm md:text-base">
                            <strong>Создано:</strong> {thread.date}
                        </p>
                        <p className="text-sm md:text-base">
                            <strong>№:</strong> {thread.num}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ThreadCard