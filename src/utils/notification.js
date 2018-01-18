const checkPermission = () => {
  switch (Notification.permission.toLowerCase()) {
    case 'granted':
      break;
    case 'denied':
      alert('Please unlock pushApi notification on your browser!'); // eslint-disable-line no-alert
      throw new Error('Please unlock pushApi notification on your browser!');
    default:
      Notification.requestPermission();
  }
};

const notification = (title, message) => {
  try {
    checkPermission();
    new Notification(title, { body: message }); // eslint-disable-line no-new
  } catch (error) {
    alert(`${title}: ${message}`); // eslint-disable-line no-alert
    console.error(error);
  }
};

export default notification;
