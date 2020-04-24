import { html, css, LitElement } from 'lit-element';

import './components/tracker-app-connected';

// eslint-disable-next-line import/prefer-default-export
export default class AppTrackerRobbie extends LitElement {
  static get styles() {
    return css`
      /* Design */
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }
      .main {
        max-width: 1200px;
        margin: 0 auto;
      }

      h1 {
        color: #ccd6f6;
        font-weight: 600;
        font-size: 35px;
        text-align: center;
      }
    `;
  }

  static get properties() {
    return {
      results: { type: Array },
    };
  }

  render() {
    return html`
      <div class="main">
        <h1>Covid Tracker Application</h1>
        <tracker-app-connected></tracker-app-connected>
      </div>
    `;
  }
}
