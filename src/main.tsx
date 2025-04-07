
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Set viewport meta for mobile responsiveness
const setViewportMeta = () => {
  const meta = document.createElement('meta');
  meta.name = 'viewport';
  meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
  document.getElementsByTagName('head')[0].appendChild(meta);
};

// Execute viewport meta setup
setViewportMeta();

createRoot(document.getElementById("root")!).render(<App />);
