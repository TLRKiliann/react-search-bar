import { useState, useEffect, useRef } from 'react'
import { postsLib } from "./lib/indexSearch"
import './App.css'

type PropsPosts = {
  id: number;
  name: string;
  link: string;
}

const App:React.FC = () => {

  const [ posts, setPosts ] = useState<PropsPosts | undefined>(undefined);
  //console.log(typeof(posts), posts, "typeof ++ posts");

  useEffect(() => {
    setPosts(postsLib);
    if (inputElement) {
      inputElement.current?.focus();
    }
    return () => console.log("+ useEffect ok");
  }, [posts]);

  const inputElement = useRef(null);
  const [ searchPost, setSearchPost ] = useState<string | undefined>("");
  const [ change, setChange ] = useState<string>("");

  const handleReset = () => {
    setPosts(undefined);
    setChange("");
    setSearchPost("");
  }

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setChange(event.currentTarget.value);
  }

  const handleSearch = (): void => {
    const searchPost = posts?.filter((post: PropsPosts) => post.name === change?.toString());
    console.log(posts, "posts name");
    if (searchPost) {
      setSearchPost(searchPost);
      setChange("");
      console.log("Success");
    }
    else {
      setSearchPost("");
      setChange("Doesn't exist !");
      setPosts(postsLib);
      console.log("Issue");
    }
  }

  return (
    <>
      <div className="div--inputbtn">
        <input
          ref={inputElement}
          type="text" 
          autoFocus 
          value={change} 
          onChange={(e) => handleInput(e)}
        />
        <button type="button" onClick={handleSearch}>Enter</button>
        <button type="button" onClick={handleReset}>Reset</button>
      </div>

      <div>
        {change === searchPost ? <p>{change}</p> : <p>Error: this name is not in db.</p> }
      </div>

      {searchPost !== "" ? (
        searchPost?.map((s: PropsPosts) => (
          <div key={s.id} className="div--display">
              <li>{s.name}</li>
              <a 
                href={s.link}
                rel="noopener noreferrer" 
                target="_blank">{s.link}
              </a>
          </div>
        ))) : (
          posts?.map((post: PropsPosts) => (
          <div key={post.id} className="div--fulllist">
            <li>{post.name}
            </li>
            <a 
              href={post.link}
              rel="noopener noreferrer"
              target="_blank">{post.link}
            </a>
          </div>
        )))
      }
    </>
  )
}

export default App
