import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Editor from 'react-simple-code-editor'
import axios from 'axios'
import Markdown from 'react-markdown'

function App() {
  const [count, setCount] = useState(0)
  const[code , setcode]= useState(` `)

const[ review,setreview] = useState(``)

useEffect(() => {
    // We use a setTimeout to ensure Prism.js has loaded from the CDN.
    // A small delay is often sufficient for the browser to parse the script tags.
    const timer = setTimeout(() => {
      // This function tells Prism.js to find all code blocks and highlight them.
      // It should be called after the DOM is updated with the code content.
      // Ensure Prism.js is loaded before this runs.
      // Using window.Prism to ensure it's loaded globally via CDN.
      if (window.Prism) {
        window.Prism.highlightAll(); // Use highlightAll to automatically find and highlight code blocks
      } else {
        console.error("Prism.js not loaded. Code highlighting may not work.");
      }
    }, 100); // A small delay, e.g., 100ms, usually works.

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timer);
  }, []);

 async function reviewCode(){
 


  try {
    const response = await axios.post('http://localhost:3000/ai/get-review', { code });
    
    // The response object typically looks like:
    // { data: { ...actual response... }, status: 200, ... }
      setreview(response.data.result)
  } catch (error) {
    console.error('Error reviewing code:', error.message);
  }
}

 
  return (
    <>
    <main>
      <div className='left'>
        <div className="code">
           <Editor
            value={code}
            onValueChange={(code) => setcode(code)}
            highlight={(code) => window.Prism.highlight(code, window.Prism.languages.javascript, 'javascript')}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 14,
              backgroundColor: '#000000',
              borderRadius: '5px',
              minHeight: '200px',
              overflow: 'auto',
              color: '#ffffff'
            }}
          />
        </div>
        <div className='language-Javascript'>
          {code}
        </div>
        <div 
        onClick={reviewCode}
        className="review">Review</div>
      </div>
      <div className="right">
        <Markdown>{review}</Markdown>
      </div>
      </main>
    </>
  )
}




export default App

