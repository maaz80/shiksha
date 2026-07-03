let toastCallback = null;

export const setToastCallback = (callback) => {
     toastCallback = callback;
};

export const showToast = (message, type = 'success') => {
     if (toastCallback) {
          toastCallback({ message, type });
     } else {
          console.log(`[${type.toUpperCase()}] ${message}`);
     }
};

export const showSuccessToast = (message) => showToast(message, 'success');
export const showErrorToast = (message) => showToast(message, 'error');
export const showInfoToast = (message) => showToast(message, 'info');
