class AppBar extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
  }

  connectedCallback() {
    this.render();
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = '';
  }
  _updateStyle() {
    this._style.textContent = `
        :host{
            display:block;
            background-color:white;
            color:#31304D
        }
        div{
          padding-block: 10px;
        }
        .welcome{
            text-align:center;
            font-size: 1.5rem
        }
    `;
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
        <div>
            <h1 class="welcome">Welcome to your notes!</h1>
        </div>
    `;
  }
}

customElements.define('app-bar', AppBar);
