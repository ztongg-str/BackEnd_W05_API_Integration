import axios from 'axios';
import { useEffect, useState } from 'react';

export default function ArticleFilterByJournalist() {
  const [articles, setArticles] = useState([]);
  const [journalists, setJournalists] = useState([])
  const [allArticles, setAllArticles] = useState([]); // for display

  // Fetch all articles when component mounts
  useEffect(() => {
    fetchArticles();
    fetchJournalists()
  }, []);

  const fetchArticles = async () => {
    // Fetch articles from the API
    try {
      const res = await axios.get('http://localhost:3000/articles')
      setArticles(res.data)
      setAllArticles(res.data)
    } catch (error) {
      console.error(error)
    }
  };

  const fetchJournalists = async () => {
    // Fetch journalists from the API
    try {
      const res = await axios.get('http://localhost:3000/journalists')
      setJournalists(res.data)
    } catch (error) {
      console.error(error)
    }

  };


  return (
    <div>
      <h2>Articles</h2>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <label htmlFor="journalistFilter">Filter by Journalist:</label>
        <select id="journalistFilter">
          <option value="">All Journalists</option>
          {/* Options for journalists */}
          {journalists.map((item) => 
            <option value={String(item.id)} key={item.id}>{item.name}</option>
          )}
        </select>

        <button
          onClick={() => {
            // Logic to apply filters
            const journalistId = document.getElementById("journalistFilter").value;

            let result = allArticles
            if (journalistId !== "" ){
              result = result.filter( (a) => (a.journalistId) === Number(journalistId))
              setArticles(result);
              console.log(result);
            } 
            
          }}
        >Apply Filters</button>
        <button
          onClick={() => {
            // Logic to reset filters
            document.getElementById("journalistFilter").value ="";
            setArticles(allArticles);
          }}
        >Reset Filters</button>
      </div>

      <ul>
        {articles.map(article => (
          <li key={article.id}>
            <strong>{article.title}</strong> <br />
            <small>By Journalist #{article.journalistId} | Category #{article.categoryId}</small><br />
            <button disabled>Delete</button>
            <button disabled>Update</button>
            <button disabled>View</button>
          </li>
        ))}
      </ul>
    </div>
  );
}