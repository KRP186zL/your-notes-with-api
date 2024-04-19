const BASE_URL = 'https://notes-api.dicoding.dev/v2';
import { showErrorMessage, showSuccessMessage } from '../../../vendor.js';
class NotesApi {
  static async getNotes() {
    const response = await fetch(`${BASE_URL}/notes`);
    if (!(response.status >= 200 && response.status <= 300)) {
      throw new Error('Terjadi kesalahan!');
    }

    const responseJson = await response.json();
    const { data } = responseJson;
    return data;
  }

  static async createNotes(value) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(value),
    };

    const response = await fetch(`${BASE_URL}/notes`, options);
    if (!(response.status >= 200 && response.status <= 300)) {
      throw new Error('Gagal menambahkan buku');
    }

    const responseJson = await response.json();
    showSuccessMessage(responseJson.message);
  }

  static async getArchivedNotes() {
    const response = await fetch(`${BASE_URL}/notes/archived`);
    if (!(response.status >= 200 && response.status <= 300)) {
      throw new Error('Terjadi Kesalahan');
    }

    const responseJson = await response.json();
    const { data } = responseJson;

    return data;
  }

  static async searchNotesArchive(query) {
    try {
      const data = await NotesApi.getArchivedNotes();
      const result = Array.from(data).filter(notes =>
        notes.title.toLowerCase().includes(query),
      );
      return result;
    } catch (err) {
      showErrorMessage(err.message);
    }
  }

  static async searchNotes(query) {
    try {
      const data = await NotesApi.getNotes();
      const result = Array.from(data).filter(notes =>
        notes.title.toLowerCase().includes(query),
      );
      return result;
    } catch (err) {
      showErrorMessage(err.message);
    }
  }

  static async deleteNotes(id) {
    const options = {
      method: 'DELETE',
    };

    const response = await fetch(`${BASE_URL}/notes/${id}`, options);
    if (!(response.status >= 200 && response.status <= 300)) {
      throw new Error('Gagal menambahkan buku');
    }

    const responseJson = await response.json();
    showSuccessMessage(responseJson.message);
  }

  static async unArchiveNotes(notesId) {
    const options = {
      method: 'POST',
    };

    const response = await fetch(
      `${BASE_URL}/notes/${notesId}/unarchive`,
      options,
    );
    if (!(response.status >= 200 && response.status <= 300)) {
      throw new Error('Terjadi Kesalahan');
    }

    const responseJson = await response.json();
    showSuccessMessage(responseJson.message);
  }

  static async archiveNotes(notesId) {
    const options = {
      method: 'POST',
    };

    const response = await fetch(
      `${BASE_URL}/notes/${notesId}/archive`,
      options,
    );
    if (!(response.status >= 200 && response.status <= 300)) {
      throw new Error('Terjadi Kesalahan');
    }

    const responseJson = await response.json();
    showSuccessMessage(responseJson.message);
  }
}
export default NotesApi;
