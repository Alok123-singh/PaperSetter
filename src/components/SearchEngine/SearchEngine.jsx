import React, { useState, useEffect, useRef } from 'react';
import { Button1, Input1 } from '../index';
import { FaSearch } from 'react-icons/fa';


const SearchEngine = (
    { 
        items, 
        setFilteredItems, 
        searchProperty = 'name', 
        enableSuggestion = false, 
        enableContinuousSearching = false, 
        enableSmartSearch = !enableContinuousSearching,
        minSuggestionsLimit = 5, // min minSuggestionsLimit suggestions will be shown
        maxSuggestionsLimit = 100, // after maxSuggestionsLimit the Show more suggestions options would not appear. In short maximum suggestions that can be suggested for a particular search term
        width = 'w-[90%] sm:w-[50%] md:w-[50%] lg:w-[30%]' // width of input field
    }) => {
    
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedSuggestion, setSelectedSuggestion] = useState(null);
    const [selectedSuggestions,setSelectedSuggestions] = useState([]);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const [searchLimit, setSearchLimit] = useState(minSuggestionsLimit);
    const [showMoreOptions,setShowMoreOptions] = useState(false);
    const [startSearching, setStartSearching] = useState(false);

    const [isHovered, setIsHovered] = useState(false);

    const [lastSearchedTerm, setLastSearchedTerm] = useState(searchTerm);
    
    const [clicked,setClicked] = useState(false);

    const searchRef = useRef(null);

    if(enableContinuousSearching === true){
        enableSmartSearch = false;
    }

    useEffect(() => {

        const handleOutsideClick = (event) => {
            // Close suggestions if clicked outside the Search component
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setSuggestions([]);
                setSearchLimit(minSuggestionsLimit);
                setShowMoreOptions(true);
                setClicked(false);

            }
        };

        // Add click event listener to the document body
        document.addEventListener('click', handleOutsideClick);

        return () => {
            // Remove the click event listener when the component is unmounted
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);


    useEffect(() => {
        // console.log('Clicked',clicked);
        // console.log('Search limit',searchLimit);
        if(!enableContinuousSearching && enableSmartSearch && searchTerm === '' && clicked === true){
            let previousSuggestions = JSON.parse(localStorage.getItem('selectedSuggestions'));
            if(previousSuggestions){
                setShowMoreOptions(true);
                let filteredSuggestions = [];
                previousSuggestions = previousSuggestions.map((suggestion) => {
                    let isPresent = false;
                    filteredSuggestions.map((item) => {
                        if(item[searchProperty] === suggestion[searchProperty])
                            isPresent = true;

                        return (item);
                    });

                    if(isPresent === false) filteredSuggestions.push(suggestion);
                    return (suggestion);
                });
                setSuggestions(filteredSuggestions.slice(0, searchLimit));
                if(searchLimit >= filteredSuggestions.length || searchLimit >= maxSuggestionsLimit) setShowMoreOptions(false);
            }
        }

    }, [clicked, searchLimit]);


    useEffect(() => {
        // If the search term is empty, set suggestions to an empty array
        if (searchTerm === '') {
            // setSuggestions([]);
            // setSearchLimit(minSuggestionsLimit);
            // setShowMoreOptions(false);
            
        } else {
            
            // Filter the items based on the search term
            const filteredItems = items.filter(item =>
                item[searchProperty].toLowerCase().includes(searchTerm.toLowerCase())
            );

            // Sort the suggestions by the most recent selections
            const sortedSuggestions = filteredItems.sort((a, b) => {
                const valueA = a[searchTerm];
                const valueB = b[searchTerm];
            
                // Handle different data types
                if (typeof valueA === 'string' && typeof valueB === 'string') {
                    // Case-insensitive string comparison
                    return valueA.localeCompare(valueB);
                } else if (typeof valueA === 'number' && typeof valueB === 'number') {
                    // Numeric comparison
                    return valueA - valueB;
                } else if (valueA instanceof Date && valueB instanceof Date) {
                    // Date comparison
                    return valueA.getTime() - valueB.getTime();
                } else {
                    // Default: string comparison
                    return String(valueA).localeCompare(String(valueB));
                }
            });
            // sortedSuggestions now contains the items sorted based on their data types and in increasing order
            

            // If a suggestion is selected, move it to the top of the list
            let updatedSuggestions = sortedSuggestions;

            if(enableSmartSearch === true){

                let previousSuggestions = JSON.parse(localStorage.getItem('selectedSuggestions'));

                if(previousSuggestions !== null && previousSuggestions.length > 0){
                    let presentInPreviousSuggestions = updatedSuggestions;
                    presentInPreviousSuggestions = presentInPreviousSuggestions.filter(item => {

                        let isPresent = false;
                        previousSuggestions.map((currentItem) => {

                            if(currentItem[searchProperty] === item[searchProperty]) isPresent = true;
                            return (currentItem);
                        });

                        return isPresent;
                    }).reverse();

                    presentInPreviousSuggestions = presentInPreviousSuggestions.filter(item => item[searchProperty] !== previousSuggestions[0][searchProperty]);

                    presentInPreviousSuggestions.unshift(previousSuggestions[0]);

                    let notPresentInPreviousSuggestions = updatedSuggestions;
                    notPresentInPreviousSuggestions = notPresentInPreviousSuggestions.filter(item => {

                        let isNotPresent = true;
                        previousSuggestions.map((currentItem) => {

                            if(currentItem[searchProperty] === item[searchProperty]) isNotPresent = false;
                            return (currentItem);
                        });

                        return isNotPresent;
                    }).sort();


                    // console.log('previousSuggestions', previousSuggestions);
                    // console.log('updatedSuggestions', updatedSuggestions);
                    // console.log('presentInPreviousSuggestions', presentInPreviousSuggestions);
                    // console.log('notPresentInPreviousSuggestions',notPresentInPreviousSuggestions);

                    const modifiedSuggestions = [... presentInPreviousSuggestions, ...notPresentInPreviousSuggestions];

                    updatedSuggestions = modifiedSuggestions;
                }
            }

            if(searchLimit >= filteredItems.length || searchLimit > maxSuggestionsLimit) setShowMoreOptions(false);
            // Update the suggestions based on the filtered and sorted items, limit to top 5
            setSuggestions(updatedSuggestions.slice(0, searchLimit));
        }

    }, [searchTerm, searchProperty, selectedSuggestion, searchLimit]);

    useEffect(() => {
        if(searchTerm !== ''){
            const filteredItems = items.filter(item =>
                item[searchProperty].toLowerCase().includes(searchTerm.toLowerCase())
            );
            if(searchLimit >= filteredItems.length || searchLimit > maxSuggestionsLimit) setShowMoreOptions(false);
            else setShowMoreOptions(true);
        }
        else setShowMoreOptions(false);
        
        setSearchLimit(minSuggestionsLimit);

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
        setSearchLimit(minSuggestionsLimit);
        setHighlightedIndex(-1);

        // Reset suggestions after a short delay to allow for re-render
        setTimeout(() => {
            setSuggestions([]);
        }, 100);
    };

    useEffect(() => {
        
        if(enableContinuousSearching === false){
            if(startSearching === true || searchTerm === ''){
                const filtered =
                searchTerm.trim() === ''
                    ? items // Show all items if search field is empty
                    : items.filter((item) =>
                        item[searchProperty].toLowerCase() === searchTerm.toLowerCase()
                    );
                
                // can store selected suggestion in a array in cache and when the next time same search field is show in suggestions then it should be in the top
                if(enableSmartSearch === true && selectedSuggestion !== null){
                    // console.log("Selected suggestion saved in local storage",selectedSuggestion);

                    selectedSuggestions.unshift(selectedSuggestion);
                    // console.log('Selected Suggestions in saving useEffect', selectedSuggestions);
                    localStorage.setItem('selectedSuggestions', JSON.stringify(selectedSuggestions));

                    const temp = JSON.parse(localStorage.getItem('selectedSuggestions'));
                    
                    // console.log('Local Storage Data starts');
                    // temp.map((item) => {
                    //     console.log(item[searchProperty]);
                    //     return item;
                    // })
                    // console.log('Local Storage Data ends');
                }

                setClicked(false);
                setSuggestions([]);
                setLastSearchedTerm(searchTerm);
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

    }, [searchTerm, startSearching]);

    // useEffect for use cases like if searchTerm is not empty and user changes any item of items variable then the filteredItems should be changed to show updated state of items in UI
    useEffect(() => {
        // setSearchTerm('');
        const filtered =
                searchTerm.trim() === ''
                    ? items // Show all items if search field is empty
                    : items.filter((item) =>{
                            if(enableContinuousSearching === true){
                                return item[searchProperty].toLowerCase().includes(searchTerm.toLowerCase());
                            }

                            if(lastSearchedTerm === '') return (true);
                        
                            return (startSearching === true ) ? false : item[searchProperty].toLowerCase() === lastSearchedTerm.toLowerCase();
                        }
                    );
        
        // console.log('Start searching',startSearching);
        if(suggestions.length > 0)
            setSuggestions([]);
        
        setFilteredItems(filtered);

    },[items]);

    const handleKeyDown = event => {

        // console.log("Highlighted index Before", highlightedIndex);

        if (event.key === 'ArrowDown' && highlightedIndex < suggestions.length - 1) {
            // handleSuggestionClick(suggestions);
            setHighlightedIndex(prevIndex => prevIndex + 1);
        } else if (event.key === 'ArrowUp' && highlightedIndex > 0) {
            // handleSuggestionClick(suggestions[highlightedIndex]);
            setHighlightedIndex(prevIndex => prevIndex - 1);
        } else if (event.key === 'Enter') {
            if(highlightedIndex !== -1)
                handleSuggestionClick(suggestions[highlightedIndex]);
            
            if(highlightedIndex === -1){
                setStartSearching(true);
            }
        }

        if(event.key === 'ArrowUp' && highlightedIndex === -1){
            setHighlightedIndex(suggestions.length-1);
        }
        
        if(event.key === 'ArrowUp' && highlightedIndex === 0){
            setHighlightedIndex(-1);
        }
        
        if(event.key === 'ArrowDown' && highlightedIndex === suggestions.length-1){
            setHighlightedIndex(-1);
        }

        // console.log("Highlighted index After", highlightedIndex);

    };

    const resetSuggestions = () => {
        // clear local storage
        localStorage.clear();
        if(localStorage.length === 0) console.log('Empty');
        setSuggestions([]);

        if(searchTerm === ''){
            setSuggestions([]);
            return;
        }

        // Filter the items based on the search term
        const filteredItems = items.filter(item =>
            item[searchProperty].toLowerCase().includes(searchTerm.toLowerCase())
        );

        // Sort the suggestions by the most recent selections
        const sortedSuggestions = filteredItems.sort((a, b) => {
            const valueA = a[searchTerm];
            const valueB = b[searchTerm];
        
            // Handle different data types
            if (typeof valueA === 'string' && typeof valueB === 'string') {
                // Case-insensitive string comparison
                return valueA.localeCompare(valueB);
            } else if (typeof valueA === 'number' && typeof valueB === 'number') {
                // Numeric comparison
                return valueA - valueB;
            } else if (valueA instanceof Date && valueB instanceof Date) {
                // Date comparison
                return valueA.getTime() - valueB.getTime();
            } else {
                // Default: string comparison
                return String(valueA).localeCompare(String(valueB));
            }
        });
        // sortedSuggestions now contains the items sorted based on their data types and in increasing order
        

        // If a suggestion is selected, move it to the top of the list
        let updatedSuggestions = sortedSuggestions;

        if(searchLimit >= filteredItems.length || searchLimit > maxSuggestionsLimit) setShowMoreOptions(false);
        // Update the suggestions based on the filtered and sorted items, limit to top 5
        setSuggestions(updatedSuggestions.slice(0, searchLimit));

    };

    // for clearing local storage on window refresh
    useEffect(() => {
        // Clear local storage when the component is mounted
        localStorage.clear();
    
        // Attach an event listener to the beforeunload event
        const handleBeforeUnload = () => {
          // Clear local storage when the page is about to unload (refresh or close)
          localStorage.clear();
        };

        // if(localStorage.length === 0) console.log('Local Storage has been reset');
    
        window.addEventListener('beforeunload', handleBeforeUnload);

        // Clean up the event listener when the component is unmounted
        return () => {
          window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    const formatPlaceholder = () => {
        // Example: Convert 'courseCode' to 'Course Code'
        const formattedPlaceholder = typeof searchProperty === 'string'
            ? searchProperty
                .replace(/([A-Z])/g, ' $1') // Insert space before capital letters
                .toLowerCase() // Convert the entire string to lowercase
            : searchProperty.toString(); // For non-string types, convert to string
      
        return `Search by ${formattedPlaceholder}`;
    };
    

    return (
        <div className='w-[98%] relative flex justify-center items-center mt-5' >
            <div ref={searchRef} className={`flex flex-col justify-center w-[90%] sm:w-[50%] md:w-[50%] lg:w-[30%] items-center ${width}`}>
                {/* Input field section */}
                <div className='w-full relative'>
                    <Input1
                        type="text"
                        placeholder={formatPlaceholder()}
                        value={searchTerm}
                        onClick={() => {
                            if(enableContinuousSearching === false) setClicked(true);
                            setHighlightedIndex(-1);
                        }}
                        onChange={(event) => handleInputChange(event)}
                        onKeyDown={(event) => handleKeyDown(event)}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        className={`${isHovered === true ? 'pr-2 sm:pr-7' : 'pr-2'} h-[2.6rem] ${highlightedIndex === -1 && 'focus:bg-slate-200 hover:bg-gray-100 '}`}
                    />
                    
                    {isHovered && (
                        <div className={`hidden sm:flex absolute right-0 top-1/2 transform -translate-y-1/2 mr-2`}>
                        <FaSearch className='text-blue-400' />
                        </div>
                    )}
                </div>
                {/* Suggestions section */}
                {enableSuggestion && 
                    <div className='w-full relative flex flex-col justify-start items-start'>
                        {suggestions.length > 0 && (
                            <ul className='absolute z-10 bg-white border rounded-md border-gray-300 flex flex-col w-full justify-center items-center'>
                                {suggestions.map((item, index) => (
                                    <li
                                        className={`w-full text-gray-600 hover:bg-gray-200 flex justify-start items-center p-2 border-b border-gray-300 ${
                                            selectedSuggestion === item || highlightedIndex === index ? 'bg-gray-200' : ''
                                        }`}
                                        key={index}
                                        onClick={() => handleSuggestionClick(item)}
                                    >
                                        {item[searchProperty]}
                                    </li>
                                ))}
                                <div  className={`w-full text-xs flex justify-end pr-2 ${showMoreOptions === true ? 'pt-3 pb-2 sm:pt-2' : 'py-2'} border-gray-300 items-center text-gray-400 hover:text-gray-300 `}>
                                    <p onClick={() => resetSuggestions()} className='cursor-pointer text-gray-500 hover:text-gray-400 md:text-gray-400 md:hover:text-gray-300'>
                                        Reset Suggestions
                                    </p>
                                </div>
                                {showMoreOptions &&
                                    <div className='text-sm text-gray-400 pb-3 sm:pb-2'>
                                        <p onClick={() => setSearchLimit(prev => prev+minSuggestionsLimit)}  className='cursor-pointer hover:text-gray-300'>
                                            Show more suggestions...
                                        </p>
                                    </div>
                                }
                            </ul>
                            
                        )}
                    </div>
                }
            </div>
            {/* Search button section */}
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

export default SearchEngine;
