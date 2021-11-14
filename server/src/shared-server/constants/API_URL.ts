import { PORT } from "./PORT";

export const API_URL = process.env.NODE_ENV === 'production'  
  ? ''
  : `http://localhost:${PORT}/api`