"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  
  const [posts, setPosts] = useState([]);

  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchedTimeout, setSearchedTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const filterPrompt = (searchtext) => {
    const regex = new RegExp(searchtext, 'i');  // 'i' flag for case-insensitive search

    return posts.filter((item) => 
      regex.test(item.creator.username) || regex.test(item.prompt) || regex.test(item.tag) 
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchedTimeout);
    setSearchText(e.target.value);

    setSearchedTimeout(
      setTimeout(() => {
        const searchResults = filterPrompt(e.target.value);
  
        setSearchedResults(searchResults);
      }, 5000)
    )
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchTag = filterPrompt(tagName);
    setSearchedResults(searchTag);
  }

  

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="realtive w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
     {searchText ? (
       <PromptCardList data={searchedResults} handleTagClick={handleTagClick} />
     ) : (
      <PromptCardList data={posts} handleTagClick={handleTagClick} />
     ) }
    </section>
  );
};

export default Feed;
