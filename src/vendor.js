import Notes from '../src/script/data/remote/notes-api.js';
import home from '../src/script/view/home.js';
import Swal from 'sweetalert2';

const showErrorMessage = err => {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: `${err}`,
  });
};

const showSuccessMessage = message => {
  Swal.fire({
    icon: 'success',
    title: 'Good...',
    text: `${message}`,
  });
};

export { Notes, home, showErrorMessage, showSuccessMessage };
