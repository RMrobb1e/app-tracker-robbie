import { LitElement, html, css } from 'lit-element';

export default class TrackerInput extends LitElement {
  static get properties() {
    return {
      name: { type: String },
      placeholder: { type: String },
      id: { type: String },
    };
  }

  static get styles() {
    return css`
      .form__group {
        position: relative;
        padding: 15px 0 0;
        margin: 10px 0;
        width: 100%;
      }
      .form__field {
        font-family: inherit;
        width: 100%;
        border: 0;
        border-bottom: 2px solid #9b9b9b;
        outline: 0;
        font-size: 1.3rem;
        color: #ccd6f6;
        padding: 7px 0;
        background: transparent;
        transition: border-color 0.2s;
      }
      .form__field::placeholder {
        color: transparent;
      }
      .form__field:placeholder-shown ~ .form__label {
        font-size: 1.3rem;
        cursor: text;
        top: 20px;
      }
      .form__label {
        position: absolute;
        top: 0;
        display: block;
        transition: 0.2s;
        font-size: 1rem;
        color: #8892b0;
      }
      .form__field:focus {
        padding-bottom: 6px;
        font-weight: 700;
        border-width: 3px;
        border-image: linear-gradient(to right, #11998e, #38ef7d);
        border-image-slice: 1;
      }
      .form__field:focus ~ .form__label {
        position: absolute;
        top: 0;
        display: block;
        transition: 0.2s;
        font-size: 1rem;
        color: #11998e;
        font-weight: 700;
      }
      /* reset input */
      .form__field:required,
      .form__field:invalid {
        box-shadow: none;
      }
    `;
  }

  handleChange() {
    const inputValue = this.shadowRoot.querySelector(`#${this.id}`).value;
    this.dispatchEvent(
      new CustomEvent('handle-change', {
        detail: {
          value: inputValue,
        },
      })
    );
  }

  render() {
    return html`
      <div class="form__group field">
        <input
          type="search"
          class="form__field"
          placeholder=${this.placeholder}
          name=${this.name}
          id=${this.id}
          autocomplete="off"
          @keyup=${this.handleChange}
        />
        <label for="name" class="form__label">${this.placeholder}</label>
      </div>
    `;
  }
}

customElements.define('tracker-input', TrackerInput);
