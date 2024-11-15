import React from 'react';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>Sidebar</div>
      <div className={styles.body}>
        <div className={styles.header}>Header</div>
        <div className={styles.content}>Content</div>
      </div>
    </div>
  );
}
export default App;