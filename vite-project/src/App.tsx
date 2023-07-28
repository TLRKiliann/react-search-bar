import { useState, useEffect } from 'react'
import { postsLib } from "./lib/indexSearch"
import './App.css'

type PropsPosts = {
  id: number;
  name: string;
  link: string;
}

const App:React.FC = () => {

  const [ posts, setPosts ] = useState<PropsPosts[] | undefined>([]);
  const [ searchPost, setSearchPost ] = useState<string>("");

  useEffect(() => {
    setPosts(postsLib);
    return () => console.log("+ useEffect ok");
  }, []);

  const [ change, setChange ] = useState<string[]>([""]);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setChange(event.target.value);
  }

  const handleSearch = (): void => {
    const searchPost = posts?.filter((post) => post.name === change);
    setSearchPost(searchPost);
    setChange([]);
  }

  return (
    <>
      <div className="div--inputbtn">
        <input type="text" value={change} onChange={(e) => handleInput(e)} />
        <button type="button" onClick={handleSearch}>Enter</button>
      </div>

      <div>
        { change === searchPost ? <p>{change}</p> : <p>Enter something</p> }
      </div>

      {searchPost ? (
        searchPost.map((post) => (
          <div key={post.id} className="div--display">
              <li>{post.name}</li>
              <a href={post.link} rel="noopener noreferrer" target="_blank">{post.link}</a>
          </div>
        ))) : posts.map((post) => (
          <div key={post.id}>
            <li>{post.name}</li>
            <a href={post.link} rel="noopener noreferrer" target="_blank">{post.link}</a>
          </div>
        ))
      }
    </>
  )
}

export default App
