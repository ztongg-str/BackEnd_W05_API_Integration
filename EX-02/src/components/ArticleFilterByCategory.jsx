import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ArticleFilterByCategory() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([])

  const [allArticles, setAllArticles] = useState([])
  // Fetch all articles when component mounts
  useEffect(() => {
    fetchArticles();
    fetchCategories()
  }, []);

  const fetchArticles = async () => {
    // Fetch articles from the API
    try {
      const res = await axios.get('http://localhost:3000/articles')
      console.log(res.data)
      setArticles(res.data)
      setAllArticles(res.data)
    } catch (error) {
      console.error(error)
    }
  };

  const fetchCategories = async () => {
    // Fetch categories from the API
    try {
      const res = await axios.get('http://localhost:3000/categories')
      console.log(res.data)
      setCategories(res.data)
    } catch (error) {
      console.error(error)
    }
  }



  return (
    <div>
      <h2>Articles</h2>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <label htmlFor="categoryFilter">Filter by Category:</label>
        <select id="categoryFilter">
          <option value="">All Categories</option>
          {/* Options for categories */}
          {categories.map( (c) => ( <option value={c.id} key={c.id}>{c.name}</option> ))}
        </select>

        <button
          onClick={() => {
            // Logic to apply filters
            const cID = document.getElementById("categoryFilter").value
            let result = allArticles
            if (cID !== "" || cID !== 0){
              result = result.filter((a) => a.categoryId === Number(cID))
            }
            setArticles(result)

          }}
        >Apply Filters</button>
        <button
          onClick={() => {
            // Logic to reset filters
            document.getElementById("categoryFilter").value = ""
            setArticles(allArticles)
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