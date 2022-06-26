// import ReactDom from 'react-dom';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/style.css';
import init from './init.jsx';

const render = () => {
  const vdom = init();
  const root = createRoot(document.getElementById('books'));
  root.render(vdom);
  // ReactDom.render(vdom, document.getElementById('books'));
};

render();
