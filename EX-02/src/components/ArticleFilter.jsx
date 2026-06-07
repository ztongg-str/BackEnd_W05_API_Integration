import { useEffect, useState } from 'react';
import axios from "axios";

export default function ArticleFilter() {
  const [articles, setArticles] = useState([]);
  const [journalists, setJournalists] = useState([])
  const [categories, setCategories] = useState([])

  const [AllArticles, setAllArticle] = useState([])

  // Fetch all articles when component mounts
  useEffect(() => {
    fetchArticles();
    fetchJournalists();
    fetchCategories();
  }, []);

  const fetchArticles = async () => {
    // Fetch articles from the API
    try {
      const res = await axios.get('http://localhost:3000/articles')
      setArticles(res.data)
      setAllArticle(res.data)
      console.log(res.data)
    } catch (error){
      console.error(error)
    }
   };

  const fetchJournalists = async () => {
    // Fetch journalists from the API
    try {
      const res = await axios.get('http://localhost:3000/journalists')
      setJournalists(res.data)
      console.log(res.data)
    } catch (error) {
      console.error(error)
    }
  };

  const fetchCategories = async () => {
    // Fetch categories from the API
    try {
      const res = await axios.get('http://localhost:3000/categories')
      setCategories(res.data)
      console.log(res.data)
    } catch ( error) {
      console.error(error)
    }
  }

  //we apply filter to find the article, which journalist and category it belong to
  const applyFilter = () => {
    //read the current value from dropdown
    const jID = document.getElementById("journalistFilter").value
    const cID = document.getElementById("categoryFilter").value

    // use the data that we have copy from fetching api above
    let result = AllArticles
    //filter time
    if ( jID !== ""){
      result = result.filter( (a) => a.journalistId === Number(jID))
    }

    if ( cID !== "") {
      result = result.filter((a) => (a.categoryId === Number(cID)))
    }
    setArticles(result)
    console.log(result)
  }


  const resetFilter = () => {
    document.getElementById("journalistFilter").value = ""
    document.getElementById("categoryFilter").value = ""

    //reset it back to the orignal back
    setArticles(AllArticles)

  }


  return (
    <div>
      <h2>Articles</h2>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <label htmlFor="journalistFilter">Filter by Journalist:</label>
        <select id="journalistFilter">
          <option value="">All Journalists</option>
          {/* Options for journalists */}
          {journalists.map( (j )=> <option value={j.id} key={j.id}>{j.name}</option> )}
        </select>

        <label htmlFor="categoryFilter">Filter by Category:</label>
        <select id="categoryFilter">
          <option value="">All Categories</option>
          {/* Options for categories */}
          {categories.map(( c) => ( <option value={c.id} key={c.id}>{c.name}</option> ))}
        </select>

        <button
          onClick={() => {
            // Logic to apply filters
            applyFilter()
          }}
        >Apply Filters</button>
        <button
          onClick={() => {
            // Logic to reset filters
            resetFilter()
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