import { Provider } from './components/Provider'
import ReactPanelElement from './ReactPanelElement.js';
customElements.define(__BASE_PATH__.replace('/', ''), ReactPanelElement(Provider));
