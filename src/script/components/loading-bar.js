class LoadingBar extends HTMLElement {
  _style = null;
  constructor() {
    super();

    this._style = document.createElement('style');
  }

  connectedCallback() {
    this.render();
  }

  _emptyContent() {
    this.innerHTML = '';
  }

  _updateStyle() {
    this._style.textContent = `
    .loading{
        display : flex;
        align-items: center;
        gap: 1rem;
    }
    .loading__animasi {
        border: 2px solid #f3f3f3; 
        border-top: 2px solid #31304d;
        border-bottom: 2px solid #31304d;
        border-radius: 50%; 
        width: 20px;
        height: 20px;
        animation: spin 1s linear infinite; 
        margin-top: 5px;
}

@keyframes spin {
  0% { transform: rotate(0deg); } 
  100% { transform: rotate(360deg); }
}
    `;
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this.appendChild(this._style);
    this.innerHTML += `
    <div class="loading">
        <h2 class="loading__text">Loading</h2>
        <div class="loading__animasi"></div>
    </div>
    `;
  }
}

customElements.define('loading-bar', LoadingBar);
