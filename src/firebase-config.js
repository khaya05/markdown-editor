import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBVJTqKvqDq5Kagx1QCR6IQX68q_TbgcnM',
  authDomain: 'markdown-editor-25439.firebaseapp.com',
  projectId: 'markdown-editor-25439',
  storageBucket: 'markdown-editor-25439.appspot.com',
  messagingSenderId: '342480549126',
  appId: '1:342480549126:web:99280c86ce0450e6c89a87',
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
