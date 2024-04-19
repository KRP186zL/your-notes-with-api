import { Notes, home, showErrorMessage } from '../../vendor.js';

class TambahNotes extends HTMLElement {
  _style = null;

  constructor() {
    super();

    this._style = document.createElement('style');
    this.render();
  }

  connectedCallback() {
    this.querySelector('.button-close-tambah').addEventListener('click', () => {
      document.querySelector('.block').setAttribute('hidden', true);
    });

    this.querySelector('.close').addEventListener('click', () => {
      document.querySelector('.block').setAttribute('hidden', true);
    });

    this.querySelector('#formTambahNotes').addEventListener('submit', event => {
      let titleNotes = this.querySelector('#formTambahNotes').titleNotes.value;
      let bodyNotes = this.querySelector('#formTambahNotes').bodyNotes.value;

      document.querySelector('.block').setAttribute('hidden', true);

      const data = {
        title: titleNotes,
        body: bodyNotes,
      };
      const tambahNotes = async value => {
        try {
          await Notes.createNotes(value);
        } catch (err) {
          showErrorMessage(err);
        }
        home();
      };
      tambahNotes(data);
      event.preventDefault();
    });
  }

  _emptyContent() {
    this.innerHTML = '';
  }

  _updateStyle() {
    this._style.textContent = ` 
      .form-tambah-notes {
        padding: 1.3em;
        position: fixed;
        top: 80px;
        right: 20%;
        bottom: 80px;
        left: 20%;
        background-color: rgba(200, 192, 177, 1);
        transition: 500ms linear;
        border-radius: 5px;
        z-index: 9999;
      }
      .form-tambah-notes h2 {
        font-size: 1.3rem;
        text-align: center;
      }
      
      .form-tambah-notes .close {
        position: absolute;
        top: 3px;
        right: 2px;
        border-radius: 50%;
        cursor: pointer;
      }
      
      .form-group {
        padding: 1em;
      }
      .form-group label {
        display: block;
        margin-block-end: 0.5em;
        font-size: 1.2rem;
      }
      .form-group input,
      .form-group textarea {
        font-size: 1rem;
        padding: 0.5rem;
        width: 100%;
        transition : 100ms;

      }
      .form-group textarea {
        resize: none;
        height: 150px;
      }
      
      .form-group.button-wrapper {
        display: flex;
        justify-content: space-around;
        gap: 1em;
      }
      
      .form-group button {
        outline: none;
        padding: 0.5rem;
        cursor: pointer;
        border-radius: 5px;
        border: 1px solid #b6bbc4;
        transition: 300ms;
        width: 10em;
      }
      
      .form-group button:hover {
        font-weight: bold;
        background-color: #c9c5c0;
      }

      .validation-message{
        color: red;
      }
      
      @media (max-width: 570px) {
        .form-tambah-notes {
          position: fixed;
          top: 60px;
          right: 10%;
          bottom: 50px;
          left: 10%;
        }
        .form-group textarea {
          height: 250px;
        }
      }

      @media screen and (max-height:500px){
        .form-group textarea {
          height: 18vh;
        }
      }

    `;
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this.appendChild(this._style);
    this.innerHTML += `
     <form id="formTambahNotes" class="form-tambah-notes">
      <span class="close"
        ><i
          class="fa-solid fa-circle-xmark fa-lg"
          style="color: #f8f6f2"
        ></i>
      </span>
      <h2>Add new notes</h2>
      <div class="form-group">
        <label for="titleNotes">Title</label>
        <input
          type="text"
          id="titleNotes"
          name="titleNotes"
          required
          minlength="5"
          pattern= "^.{1,25}$"
          aria-describedby="titleNotesValidation"
        />
        <p
          id="titleNotesValidation"
          class="validation-message"
          aria-live="polite"
        ></p>
      </div>
      <div class="form-group">
        <label for="bodyNotes">Body</label>
        <textarea name="bodyNotes" id="bodyNotes" required minlength="15" maxlength="100" aria-describedby="bodyNotesValidation"></textarea>
        <p
          id="bodyNotesValidation"
          class="validation-message"
          aria-live="polite"
        ></p>
      </div>
      <div class="form-group button-wrapper">
        <button
          class="button button-tambah-notes"
          id="button-tambah-notes"
          type="submit"
        >
          Tambah notes
        </button>
        <button
          class="button button-close-tambah"
          id="button-close-notes"
          type="button"
        >
          Batal
        </button>
      </div>
    </form>
    `;
  }
}

customElements.define('tambah-notes', TambahNotes);
