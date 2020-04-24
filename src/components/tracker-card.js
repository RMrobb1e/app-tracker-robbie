import { LitElement, html, css } from 'lit-element';

import { limitCountryTitle, getCode } from '../helper/util';
import './tracker-modal';

export default class TrackerCard extends LitElement {
  constructor() {
    super();
    this.country_name = '';
    this.cases = '0';
    this.deaths = '0';
    this.total_recovered = '0';
    this.addEventListener('click', this.modalOnClick);
  }

  static get styles() {
    return css`
      img {
        height: auto;
        max-width: 100%;
        vertical-align: middle;
      }

      .btn {
        color: #64ffda;
        padding: 0.8rem;
        font-size: 14px;
        text-transform: uppercase;
        border-radius: 4px;
        font-weight: 600;
        display: block;
        width: 100%;
        cursor: pointer;
        border: 1px solid rgba(255, 255, 255, 0.2);
        background: transparent;
      }

      .btn:hover {
        background-color: rgba(255, 255, 255, 0.12);
      }

      .card {
        background-color: #172a45;
        border-radius: 0.25rem;
        box-shadow: 0 20px 40px -14px rgba(0, 0, 0, 0.25);
        display: flex;
        flex-direction: column;
        overflow: hidden;
        line-height: 1.5;
      }

      .card_content {
        padding: 1rem;
        font-weight: bold;
        background-color: #172a45;
      }

      .card_title {
        color: #ccd6f6; /* #ffffff; */
        font-size: 2rem;
        font-weight: 700;
        letter-spacing: 1px;
        text-transform: capitalize;
        margin: 0px;
      }

      .card_text {
        color: #8892b0; /*#ffffff; */
        font-size: 0.875rem;
        line-height: 1.5;
        margin-bottom: 1.25rem;
        font-size: 1.2rem;
        font-weight: 600;
      }
      .cards_item {
        color: white;
        padding: 1rem;
        height: 17rem;
      }

      .cards {
        max-width: 1200px;
        margin: 0 auto;
        display: grid;
        grid-gap: 1rem;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      }

      .modal {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        opacity: 0;
        visibility: hidden;
        transform: scale(1.1);
        transition: visibility 0s linear 0.25s, opacity 0.25s 0s,
          transform 0.25s;
      }
      .show-modal {
        opacity: 1;
        visibility: visible;
        transform: scale(1);
        transition: visibility 0s linear 0s, opacity 0.25s 0s, transform 0.25s;
      }
    `;
  }

  static get properties() {
    return {
      filteredResults: { type: Array },
      country_name: { type: String },
      cases: { type: String },
      deaths: { type: String },
      total_recovered: { type: String },
    };
  }

  toggleModal(countryName) {
    this.shadowRoot
      .querySelector(`#modal_${countryName.replace(/\s/g, '')}`)
      .classList.toggle('show-modal');
  }

  modalOnClick(event) {
    const modal = this.shadowRoot.querySelector('.modal');
    if (event.target === modal) {
      this.toggleModal();
    }
  }

  render() {
    return html`
      <div class="cards">
        ${this.filteredResults &&
        this.filteredResults.map((res, index) => {
          return html`
            <div class="cards_item">
              <div class="card">
                <div class="card_content">
                  <h2 class="card_title" title=${res.country_name}>
                    <img
                      src=${`https://www.countryflags.io/${getCode(
                        res.country_name
                      )}/shiny/64.png`}
                    />
                    ${limitCountryTitle(res.country_name)}
                  </h2>
                  <p class="card_text">Confirmed: ${res.cases}</p>
                  <p class="card_text">Recovered: ${res.total_recovered}</p>
                  <p class="card_text">Deaths: ${res.deaths}</p>
                  <button
                    class="btn card_btn"
                    key=${index}
                    @click=${() => this.toggleModal(res.country_name)}
                  >
                    More Info
                  </button>
                  <tracker-modal
                    class="modal"
                    id=${`modal_${res.country_name.replace(/\s/g, '')}`}
                    key=${index}
                    @toggle-modal=${() => this.toggleModal(res.country_name)}
                    .country_name=${res.country_name}
                    .new_cases=${res.new_cases}
                    .new_deaths=${res.new_deaths}
                    .active_cases=${res.active_cases}
                    .serious_critical=${res.serious_critical}
                  ></tracker-modal>
                </div>
              </div>
            </div>
          `;
        })}
      </div>
    `;
  }
}

customElements.define('tracker-card', TrackerCard);
