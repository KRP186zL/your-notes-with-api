import { Notes, showErrorMessage } from '../../vendor';
class SearchBar extends HTMLElement {
  _shadowRoot = null;
  _style = null;
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
  }

  connectedCallback() {
    this.render();

    const getResultSearch = (result, keyword) => {
      const notelist = document.querySelector('note-list');
      notelist.innerHTML = '';
      notelist.innerHTML += `<span slot="icon-add"><i class="fa-solid fa-plus"></i></span>`;
      notelist.innerHTML += `<span class="icon-arsip" slot="icon-archive"><i class="fa-solid fa-folder" style="color: #31304d;"></i></span>`;
      notelist.innerHTML += `<span class="icon-unArchive" slot="icon-unArchive"><i class="fa-solid fa-folder-open" style="color: #31304d;"></i></span>`;

      if (result.length <= 0) {
        const newElementKosong = document.createElement('span');
        newElementKosong.setAttribute('slot', 'callbackTeks');
        newElementKosong.innerText = `\`${keyword}\` tidak ditemukan...`;
        notelist.appendChild(newElementKosong);
      }

      result.forEach(element => {
        const noteItems = document.createElement('note-items');
        noteItems.notes = element;
        notelist.appendChild(noteItems);
        noteItems.classList.add('animate__animated');
        noteItems.classList.add('animate__tada');

        if (element.archived) {
          noteItems.shadowRoot
            .querySelector('.card__button-unArchive')
            .removeAttribute('hidden');

          noteItems.shadowRoot
            .querySelector('.card__button-arsip')
            .setAttribute('hidden', true);
          noteItems.shadowRoot
            .querySelector('.card__button-hapus')
            .setAttribute('hidden', true);
        }

        const iconHapus = document.createElement('span');
        iconHapus.setAttribute('slot', 'icon-hapus');
        iconHapus.innerHTML = `<i class="fa-solid fa-trash" style="color: #31304d;"></i>`;

        const iconArsip = document.createElement('span');
        iconArsip.setAttribute('slot', 'icon-arsip');
        iconArsip.innerHTML = `<i class="fa-solid fa-box-archive style="color: #31304d;"></i>`;

        const iconUnArchive = document.createElement('span');
        iconUnArchive.setAttribute('slot', 'icon-unArchive');
        iconUnArchive.innerHTML += `<span class="icon-unArchive" slot="icon-unArchive"><i class="fa-solid fa-trash" style="color: #31304d;"></i></span>`;

        const iconEdit = document.createElement('span');
        iconEdit.setAttribute('slot', 'icon-edit');
        iconEdit.innerHTML = `<i class="fa-solid fa-pen-to-square style="color: #31304d;"></i>`;

        noteItems.append(iconHapus, iconArsip, iconEdit, iconUnArchive);
      });
    };

    this._shadowRoot
      .querySelector('#formSearch')
      .addEventListener('submit', (event) => {
        const loading = document.querySelector('note-list');
        loading.innerHTML = '<loading-bar></loading-bar>';
        loading.innerHTML += `<span slot="icon-add"><i class="fa-solid fa-plus"></i></span>`;
        loading.innerHTML += `<span class="icon-arsip" slot="icon-archive"><i class="fa-solid fa-folder" style="color: #31304d;"></i></span>`;
        loading.innerHTML += `<span class="icon-unArchive" slot="icon-unArchive"><i class="fa-solid fa-folder-open" style="color: #31304d;"></i></span>`;

        const isArchive = loading.shadowRoot.querySelector('.archive');
        console.log(isArchive);

        let keyword =
          this._shadowRoot.querySelector('#formSearch').search.value.toLowerCase();

        const cariNotes = async query => {
          try {
            let result = null;

            if (isArchive.hidden) {
              result = await Notes.searchNotesArchive(query);
            } else {
              result = await Notes.searchNotes(query);
            }
            getResultSearch(result, keyword);
          } catch (err) {
            showErrorMessage(err.message);
          }
        };
        cariNotes(keyword);
        event.preventDefault();
      });
  }

  _updateStyle() {
    this._style.textContent = `
    .formSearch__group{
      display: flex;
      gap: 1em;
    }
   input{
    font-size: 1rem;
    padding: .2em .8em;
    width: 100%;
   }

   button{
    outline:none;
    padding : .8em 1em;
    cursor: pointer; 
    border-radius: 5px;
    border: 1px solid #B6BBC4;
    transition : 300ms;
    
  }
  button:hover{
    background-color : #c9c5c0;
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
    <form id="formSearch">
    <div class="formSearch__group">
      <input type="text" name="search" id="search" placeholder="Search">
      <button type="submit" class="search">Cari</button>
    </div>
  </form>

  
    `;
  }
}

customElements.define('search-bar', SearchBar);
