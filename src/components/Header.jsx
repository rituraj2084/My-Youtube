import React, { useEffect, useState } from 'react';
import menu from '../Assets/Hamburger_icon.png';
import youtubeLogo from '../Assets/youtube_logo.jpg';
import userIcon from '../Assets/user-icon.png';
import { useDispatch } from 'react-redux';
import { toggleSidebar } from '../utils/appSlice';
import { YOUTUBE_SEARCH_API } from '../utils/constants';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => getSearchSuggestions(), 200);
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const getSearchSuggestions = async () => {
    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const json = await data.json();
    // console.log(json[1]);
    setSuggestions(json[1]);
  };
  const dispatch = useDispatch();
  const toggleSidebarHandler = () => {
    dispatch(toggleSidebar());
  };

  return (
    <div className="grid grid-flow-col p-5  m-2  shadow-lg">
      <div className="flex col-span-1 gap-4">
        <img
          src={menu}
          alt="menu"
          className="h-8 cursor-pointer"
          onClick={() => toggleSidebarHandler()}
        />
        <img src={youtubeLogo} alt="youtube-logo" className="h-8" />
      </div>
      <div className="col-span-10 mx-28">
        <div>
          <input
            className="border border-gray-300 w-1/2 p-2 rounded-l-full"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setShowSuggestions(false)}
          />
          <button className="border border-gray-300 p-2 rounded-r-full bg-gray-100">
            Search
          </button>
        </div>
        {showSuggestions && (
          <div className="fixed bg-white py-2 px-2 w-[32rem] shadow-lg rounded-lg border border-gray-100">
            <ul>
              {suggestions.map((suggestion) => (
                <li key={suggestion} className="py-2 px-3 hover:bg-gray-100">
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="col-span-1">
        <img className="h-8" src={userIcon} alt="user-icon" />
      </div>
    </div>
  );
};

export default Header;
