import { LitElement, html, css } from 'lit-element';
import { getCode } from '../helper/util';

export default class TrackerModal extends LitElement {
  static get styles() {
    return css`
      img {
        margin: 0 15px 0 0;
        height: auto;
        max-width: 100%;
        vertical-align: middle;
      }
      .modal-content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #172a45;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        height: 17rem;
        width: 30rem;
      }
      .modal-text {
        color: #8892b0;
        font-size: 0.875rem;
        line-height: 1.5;
        margin-bottom: 1.25rem;
        font-weight: 600;
        font-size: 1.2rem;
      }
      .close-button {
        float: right;
        width: 1.5rem;
        line-height: 1.5rem;
        text-align: center;
        cursor: pointer;
        border-radius: 0.25rem;
        border: medium white;
      }

      h1 {
        color: #ccd6f6;
        font-weight: 700;
        font-size: 2rem;
      }

      .close-button:hover {
      }
    `;
  }

  static get properties() {
    return {
      country_name: { type: String },
      new_cases: { type: String },
      new_deaths: { type: String },
      active_cases: { type: String },
      serious_critical: { type: String },
    };
  }

  toggleModal() {
    this.dispatchEvent(new CustomEvent('toggle-modal'));
  }

  modalOnClick(event) {
    const modal = document.querySelector('.modal');
    console.log(event.target);
    if (event.target === modal) {
      this.toggleModal();
    }
  }

  /**
   active_cases: "717,361"
    cases: "849,092"
    country_name: "USA"
    deaths: "47,681"
    deaths_per_1m_population: "144"
    new_cases: "375"
    new_deaths: "22"
    region: ""
    serious_critical: "14,016"
    tests_per_1m_population: "13,071"
    total_cases_per_1m_population: "2,565"
    total_recovered: "84,050"
    total_tests: "4,326,648"
   */

  render() {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    const now = new Date().toLocaleDateString('en-US', options);
    return html`
      <div class="modal-content">
        <span class="close-button" @click=${this.toggleModal}>X</span>
        <h1>
          <img
            src=${`https://www.countryflags.io/${getCode(
              this.country_name
            )}/shiny/64.png`}
          />${this.country_name}
        </h1>
        <div class="modal-text">
          ${`As of ${now}, ${this.new_cases} new cases and ${this.new_deaths} new deaths are recorded.`}
        </div>
        <div class="modal-text">
          ${`There is still ${this.active_cases} active cases, ${this.serious_critical} among are critical.`}
        </div>
      </div>
    `;
  }
}

customElements.define('tracker-modal', TrackerModal);
