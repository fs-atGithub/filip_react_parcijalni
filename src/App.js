import React, { useState, useEffect } from "react";
import { Form, Card, Image, Icon } from "semantic-ui-react";

import "./App.css";

function App() {
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [repos, setRepos] = useState("");
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://api.github.com/users/dstrekelj")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
  }, []);

  const setData = ({
    name,

    public_repos,
    avatar_url,
    location,
    bio,
  }) => {
    setName(name);

    setRepos(public_repos);
    setAvatar(avatar_url);
    setLocation(location);
    setBio(bio);
  };
  const handleSearch = (e) => {
    setUserInput(e.target.value);
  };
  const handleSubmit = () => {
    fetch(`https://api.github.com/users/${userInput}`)
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
    <div>
      <div className="navbar">Github Search</div>
      <div className="search">
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Input
              placeholder="username"
              name="github user"
              onChange={handleSearch}
            />
            <Form.Button content="Search" />
          </Form.Group>
        </Form>
      </div>
      {error ? (
        <h1>{error}</h1>
      ) : (
        <div className="card">
          <Card>
            <Image src={avatar} wrapped ui={false} />
            <Card.Content extra>
              <p>
                <Icon name="user" /> name: {name}
              </p>

              <p>
                <Icon name="user" /> repos: {repos}
              </p>
              <p>
                <Icon name="user" /> bio: {bio}
              </p>
              <div>
                <Icon name="user" /> location: {location}
              </div>
            </Card.Content>
          </Card>
        </div>
      )}
    </div>
  );
}

export default App;
