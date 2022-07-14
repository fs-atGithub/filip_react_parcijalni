import React, { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [userName, setUsername] = useState("");
  const [followers, setFollowers] = useState("");
  const [following, setFollowing] = useState("");
  const [repos, setRepos] = useState("");
  const [avatar, setAvatar] = useState("");
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState(null);
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    fetch("https://api.github.com/users/example/")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
  }, []);

  const setData = ({
    login,
    followers,
    following,
    public_repos,
    avatar_url,
    location,
    bio,
  }) => {
    setName(name);
    setUsername(login);
    setFollowers(followers);
    setFollowing(following);
    setRepos(public_repos);
    setAvatar(avatar_url);
    setLocation(location);
    setBio(bio);
  };
  const handleSearch = (e) => {
    setUserInput(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`https://api.github.com/users/${userInput}/`)
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          setError(data.message);
        } else {
          setData(data);
          setError(null);
        }
      });
  };
  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="search">
        <input
          class="input"
          type="text"
          placeholder="Search"
          name="github user"
          onChange={handleSearch}
          required
        />
        <button>Search</button>
        {error ? (
          <h1>{error}</h1>
        ) : (
          <section>
            <div className="card">
              <img src={avatar} alt={name} />
            </div>
            <div className="card">
              <h2>{name}</h2>
            </div>
            <div className="card">
              <h2>{userName}</h2>
            </div>
            <div className="card">
              <h2>{followers}</h2>
            </div>
            <div className="card">
              <h2>{following}</h2>
            </div>
            <div className="card">
              <h2>{repos}</h2>
            </div>
            <div className="card">
              <h2>{location}</h2>
            </div>
            <div className="card">
              <h2>{bio}</h2>
            </div>
          </section>
        )}
      </form>
    </div>
  );
}

export default App;
