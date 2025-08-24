// src/lib/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '', // '' = use proxy in dev
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;