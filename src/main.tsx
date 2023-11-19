import React, { HTMLAttributes } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { Capacitor } from '@capacitor/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { defineCustomElements as jeepSqlite, applyPolyfills, JSX as LocalJSX  } from "jeep-sqlite/loader";

applyPolyfills().then(() => {
  jeepSqlite(window);
});
window.addEventListener('DOMContentLoaded', async () => {
  const platform = Capacitor.getPlatform();
  const sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite)
  try {
    if(platform === "web") {
      const jeepEl = document.createElement("jeep-sqlite");
      document.body.appendChild(jeepEl);
      await customElements.whenDefined('jeep-sqlite');
      await sqlite.initWebStore();
    }

    const container = document.getElementById('root');
    const root = createRoot(container!);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (err) {
    console.log(`Error: ${err}`);
    throw new Error(`Error: ${err}`)
  }
});