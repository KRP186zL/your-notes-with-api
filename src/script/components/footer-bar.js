class FooterBar extends HTMLElement {
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
      padding-block: 20px;
    }
    .text-copy{
        text-align:center;
        font-size: 1rem
    }
    .text-copy a{
      outline:none;
        text-decoration:none;
        color:black;
      }
      .text-copy a:hover{
        text-decoration:underline;
      }
      .text-copy a:focus{
        text-decoration:underline;
    }
    `;
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
        <div>
            <p class="text-copy">
                Made with <slot name="icon-love"></slot> 
                by <a href="https://instagram.com/krisnaaa_prtm27">Krisna Rizki Pratama</a>
            </p>
        </div>
    `;
  }
}

customElements.define('footer-bar', FooterBar);
