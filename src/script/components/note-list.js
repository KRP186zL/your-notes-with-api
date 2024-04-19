import { Notes, home, showErrorMessage } from '../../vendor';
class NoteList extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');

    this.render();
  }

  connectedCallback() {
    this._shadowRoot
      .querySelector('.add-button')
      .addEventListener('click', () => {
        document.querySelector('.block').removeAttribute('hidden');
        document.querySelector('#formTambahNotes').titleNotes.focus();
      });

    const getDaftarArchiveNotes = async () => {
      this.innerHTML = '<loading-bar></loading-bar>';
      try {
        const data = await Notes.getArchivedNotes();
        this.innerHTML = '';
        this.innerHTML += `<span slot="icon-add"><i class="fa-solid fa-plus"></i></span>`;
        this.innerHTML += `<span class="icon-unArchive" slot="icon-unArchive"><i class="fa-solid fa-folder-open" style="color: #31304d;"></i></span>`;

        if (data.length <= 0) {
          const newElementKosong = document.createElement('h2');
          newElementKosong.innerText = 'Archive Kosong...';
          this.appendChild(newElementKosong);
        }

        data.forEach((element, index) => {
          const noteItems = document.createElement('note-items');
          noteItems.notes = element;
          this.appendChild(noteItems);

          if (index === 0 || index === 5 || index === 8) {
            noteItems.classList.add('animate__animated');
            noteItems.classList.add('animate__backInRight');
          }
          if (index >= 6 || index <= 8) {
            noteItems.classList.add('animate__animated');
            noteItems.classList.add('animate__backInLeft');
          }

          const iconUnArchive = document.createElement('span');
          iconUnArchive.setAttribute('slot', 'icon-unArchive');
          iconUnArchive.innerHTML = `<i class="fa-solid fa-trash" style="color: #31304d;"></i>`;

          noteItems.append(iconUnArchive);

          noteItems.shadowRoot
            .querySelector('.card__button-unArchive')
            .removeAttribute('hidden');

          noteItems.shadowRoot
            .querySelector('.card__button-arsip')
            .setAttribute('hidden', true);
          noteItems.shadowRoot
            .querySelector('.card__button-hapus')
            .setAttribute('hidden', true);
        });
      } catch (err) {
        if (err.message.toLowerCase() === 'failed to fetch') {
          err.message = 'Tidak ada koneksi internet';
        }
        showErrorMessage(err.message);
      }
    };

    const getArchive = this._shadowRoot.querySelector('.archive');
    getArchive.addEventListener('click', () => {
      getArchive.setAttribute('hidden', true);
      getUnArchive.removeAttribute('hidden');
      getDaftarArchiveNotes();
    });

    const getUnArchive = this._shadowRoot.querySelector('.unArchive');
    getUnArchive.addEventListener('click', () => {
      getUnArchive.setAttribute('hidden', true);
      getArchive.removeAttribute('hidden');
      home();
    });
  }

  _updateStyle() {
    this._style.textContent = `
        :host{
            display:block;
        }
        .notes-container {
            max-width: 900px;
            margin: auto;
            padding: 11px 20px 30px;
            background-color: rgba(255, 255, 255, 0.5);
            backdrop-filter: blur(6px);
          }

          .header{
            display:flex;
            justify-content:space-between;
            align-items:center;
          }
          
          .notes-wrapper {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 2em;
          }
          .button-wrapper{
            display:flex;
            align-items:center;
            padding-inline:25px;
            height:50px;
            gap:1rem;
            margin-inline-end: -25px;
          }
          .button-wrapper button{
            outline:none;
            padding : .5rem;
            cursor: pointer; 
            border-radius: 5px;
            border: 1px solid #B6BBC4;
            transition : 300ms;
          }
          
          .button-wrapper button:hover{
            font-weight: bold;
            background-color: #c9c5c0;
          }

        
    `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = '';
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
        <div class="notes-container">
          <div class="header">
            <h2 class="animate__animated animate__backInLeft">Your notes</h2>
            <div class="button-wrapper">
              <button type="button" class="add-button"><slot name="icon-add"></slot> Add</button>
              <button type="button" class = "archive"><slot name="icon-archive"></slot> Archived</button>
              <button type="button" class = "unArchive" hidden><slot name="icon-unArchive"></slot> Unarchived</button>
            </div>
          </div>
          <search-bar></search-bar>
          <h2 class="callbackTeks"><slot name="callbackTeks"></slot></h2>
          <div class="notes-wrapper">
            <slot></slot>
          </div>
        </div>
    `;
  }
}

customElements.define('note-list', NoteList);
