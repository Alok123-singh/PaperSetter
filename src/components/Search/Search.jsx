import React, { useState, useEffect, useRef } from 'react';
import { Button1, Input1 } from '../index';

const Search = ({ items, setFilteredItems, searchProperty = 'name', enableSuggestion = false, enableContinuousSearching = true }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedSuggestion, setSelectedSuggestion] = useState(null);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const [searchLimit, setSearchLimit] = useState(5);
    const [showMoreOptions,setShowMoreOptions] = useState(false);
    const [startSearching, setStartSearching] = useState(false);

    const searchRef = useRef(null);

    useEffect(() => {

        const handleOutsideClick = (event) => {
            // Close suggestions if clicked outside the Search component
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setSuggestions([]);
                setSearchLimit(5);
                setShowMoreOptions(true);
            }
        };

        // Add click event listener to the document body
        document.addEventListener('click', handleOutsideClick);

        return () => {
            // Remove the click event listener when the component is unmounted
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);


    // useEffect1
    useEffect(() => {
        // If the search term is empty, set suggestions to an empty array
        if (searchTerm === '') {
            setSuggestions([]);
            setSearchLimit(5);
            setShowMoreOptions(false);
        } else {

            // can store selected suggestion in a array in cache and when the next time same search field is show in suggestions then it should be in the top
            console.log("Selected suggestion",selectedSuggestion);

            // Filter the items based on the search term
            const filteredItems = items.filter(item =>
                item[searchProperty].toLowerCase().includes(searchTerm.toLowerCase())
            );

            // Sort the suggestions by the most recent selections
            const sortedSuggestions = filteredItems.sort((a, b) => {
                // You can replace 'timestamp' with the actual property representing the time of selection
                return b.timestamp - a.timestamp;
            });

            // If a suggestion is selected, move it to the top of the list
            let updatedSuggestions = selectedSuggestion
                ? [selectedSuggestion, ...sortedSuggestions.filter(s => s !== selectedSuggestion)]
                : sortedSuggestions;

            if(searchLimit >= filteredItems.length || searchLimit > 20) setShowMoreOptions(false);
            // Update the suggestions based on the filtered and sorted items, limit to top 5
            setSuggestions(updatedSuggestions.slice(0, searchLimit));
        }
    }, [searchTerm, items, searchProperty, selectedSuggestion, searchLimit]);

    useEffect(() => {
        if(searchTerm !== ''){
            const filteredItems = items.filter(item =>
                item[searchProperty].toLowerCase().includes(searchTerm.toLowerCase())
            );
            if(searchLimit >= filteredItems.length || searchLimit >= 20) setShowMoreOptions(false);
            else setShowMoreOptions(true);
        }
        else setShowMoreOptions(false);
        
        setSearchLimit(5);

    }, [searchTerm]);


    const handleInputChange = event => {
        setSearchTerm(event.target.value);
        setSelectedSuggestion(null); // Reset selected suggestion when input changes
        setHighlightedIndex(-1); // Reset highlighted index when input changes
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchTerm(suggestion[searchProperty]);
        setSelectedSuggestion(suggestion);
        setShowMoreOptions(true);
        setSearchLimit(5);

        // Reset suggestions after a short delay to allow for re-render
        setTimeout(() => {
            setSuggestions([]);
        }, 100);
    };

    useEffect(() => {
        const filtered =
            searchTerm.trim() === ''
                ? items // Show all items if search field is empty
                : items.filter((item) =>
                    item[searchProperty].toLowerCase().includes(searchTerm.toLowerCase())
                );
        
        if(enableContinuousSearching === false){
            if(startSearching === true || searchTerm === ''){
                const filtered =
                searchTerm.trim() === ''
                    ? items // Show all items if search field is empty
                    : items.filter((item) =>
                        item[searchProperty].toLowerCase() === searchTerm.toLowerCase()
                    );

                setSuggestions([]);
                setStartSearching(false);
                setFilteredItems(filtered);
            }
        }
        else{
            const filtered =
            searchTerm.trim() === ''
                ? items // Show all items if search field is empty
                : items.filter((item) =>
                    item[searchProperty].toLowerCase().includes(searchTerm.toLowerCase())
                );

            setFilteredItems(filtered);
        }

    }, [searchTerm, items, startSearching]);

    // useEffect for use cases like if searchTerm is not empty and user changes any item of items variable then the filteredItems should be changed to show updated state of items in UI
    useEffect(() => {
        // setSearchTerm('');
        const filtered =
                searchTerm.trim() === ''
                    ? items // Show all items if search field is empty
                    : items.filter((item) =>
                        item[searchProperty].toLowerCase() === searchTerm.toLowerCase()
                    );

                setSuggestions([]);
                setStartSearching(false);
                setFilteredItems(filtered);
        
    },[items]);

    const handleKeyDown = event => {
        if (event.key === 'ArrowDown' && highlightedIndex < suggestions.length - 1) {
            setHighlightedIndex(prevIndex => prevIndex + 1);
        } else if (event.key === 'ArrowUp' && highlightedIndex > 0) {
            setHighlightedIndex(prevIndex => prevIndex - 1);
        } else if (event.key === 'Enter' && highlightedIndex !== -1) {
            handleSuggestionClick(suggestions[highlightedIndex]);
        }
    };

    return (
        <div className='w-[98%] relative flex justify-center items-center mt-5' >
            <div ref={searchRef} className="flex flex-col justify-center w-[90%] sm:w-[50%] md:w-[50%] lg:w-[30%] items-center ">
                <Input1
                    type="text"
                    placeholder={`Search by ${searchProperty}`}
                    value={searchTerm}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    className="pr-2 h-[2.6rem]"
                />
                {enableSuggestion && 
                    <div className='w-full relative flex flex-col justify-start items-start'>
                        {suggestions.length > 0 && (
                            <ul className='absolute z-10 bg-white border rounded-md border-gray-300 flex flex-col sm:w-[23.3rem] justify-center items-center'>
                                {suggestions.map((item, index) => (
                                    <li
                                        className={`w-full text-gray-600 flex justify-start items-center p-3 border-b border-gray-300 ${
                                            selectedSuggestion === item || highlightedIndex === index ? 'bg-gray-200' : ''
                                        }`}
                                        key={index}
                                        onClick={() => handleSuggestionClick(item)}
                                    >
                                        {item[searchProperty]}
                                    </li>
                                ))}
                                {showMoreOptions &&
                                    <div onClick={() => setSearchLimit(prev => prev+5)} className='cursor-pointer text-sm text-gray-400 p-2'>
                                        Show more suggestions...
                                    </div>
                                }
                            </ul>
                            
                        )}
                    </div>
                }
            </div>
            {enableContinuousSearching === false && 
                <Button1
                    className="w-[4.3rem] ml-1 sm:ml-2 my-1 h-[2.3rem] flex justify-center hover:bg-blue-500  items-center rounded-md"
                    onClick={() => {
                        setStartSearching(true);
                    }}
                >
                    Search
                </Button1>
            }
        </div>
    );
};

export default Search;
