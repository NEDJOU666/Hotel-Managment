interface Message {
    sender: string;
    recipient: string;
    content: string;
    isSending: boolean;
  }
  
const messages: Message[] = [
    { sender: 'Alice', recipient: 'Bob', content: 'Hi Bob!', isSending: false },
    { sender: 'Bob', recipient: 'Alice', content: 'Hello Alice!', isSending: true },
    { sender: 'Charlie', recipient: 'David', content: 'How are you?', isSending: false },
    { sender: 'David', recipient: 'Charlie', content: 'I am good, thanks!', isSending: true },
    { sender: 'Eve', recipient: 'Frank', content: 'Meeting at 10?', isSending: false },
  ];

export default messages