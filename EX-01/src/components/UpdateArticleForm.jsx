import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function UpdateArticleForm() {
  const [form, setForm] = useState({
    title: '',
    content: '',
    journalistId: '',
    categoryId: '',
  });

  const {id} = useParams()
  const navigate = useNavigate()
  // Fetch to prefill a form and update an existing article
  useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/articles/${id}`);
      setForm(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  fetchData();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Update article with axios
    try {
    await axios.put(`http://localhost:3000/articles/${id}`, {
      ...form,
      journalistId: Number(form.journalistId),
      categoryId: Number(form.categoryId),
    });

    navigate("/articles");
    } catch (error) {
      console.error(error);
    };
  }
  return (
    <form onSubmit={handleSubmit}>
      <h3>Update Article</h3>
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required /><br />
      <textarea name="content" value={form.content} onChange={handleChange} placeholder="Content" required /><br />
      <input name="journalistId" value={form.journalistId} onChange={handleChange} placeholder="Journalist ID" required /><br />
      <input name="categoryId" value={form.categoryId} onChange={handleChange} placeholder="Category ID" required /><br />
      <button type="submit">Update</button>
    </form>
  );
}
