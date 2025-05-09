export const scrollToSection = () => {
  const assistantScreen = document.querySelector('#assistant');
  const chatScreen = document.querySelector('#chat');
  if (assistantScreen) {
    assistantScreen.scrollIntoView({ behavior: 'smooth' });
  } else if (chatScreen) {
    chatScreen.scrollIntoView({ behavior: 'smooth' });
  }
  return;
};
