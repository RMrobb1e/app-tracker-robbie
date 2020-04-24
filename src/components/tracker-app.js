import { LitElement, html, css } from 'lit-element';

import './tracker-loader';
import './tracker-card';
import './tracker-input';

/**
 * Feature layer for TrackerApp
 */
export default class TrackerApp extends LitElement {
  static get styles() {
    return css`
      .paper-input {
        color: #ccd6f6;
      }
      h1 {
        color: #ccd6f6;
      }
    `;
  }

  static get properties() {
    return {
      allResults: { type: Array },
      filteredResults: { type: Array },
      loading: { type: Boolean },
      searchInput: { type: String },
    };
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.allResults) {
      this.getAllCountry();
    }
  }

  static getAllCountry() {
    // Override on Layer 2
  }

  onChange({ detail }) {
    this.searchInput = detail.value;
    this.loading = true;
    if (this.searchInput && this.searchInput.length > 0) {
      this.filteredResults = this.allResults.filter(
        result =>
          result.country_name
            .toLowerCase()
            .indexOf(this.searchInput.toLowerCase()) !== -1
      );
    } else {
      this.filteredResults = this.allResults;
    }
    this.loading = false;
  }

  render() {
    const appBody =
      this.filteredResults && this.filteredResults.length > 0
        ? html` <tracker-card
            .filteredResults=${this.filteredResults}
          ></tracker-card>`
        : html`<h1>No country found...</h1>`;
    return html`
      <tracker-input
        class=""
        name="search"
        placeholder="Search country..."
        id="trackerInput"
        @handle-change=${this.onChange}
      ></tracker-input>
      ${this.loading ? html`<tracker-loader></tracker-loader> ` : appBody}
    `;
  }
}

customElements.define('tracker-app', TrackerApp);
