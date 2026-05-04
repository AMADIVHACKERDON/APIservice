import React from 'react';
import { createRoot } from 'react-dom/client';
import Homepage from "../components/HomePage";

const root = createRoot(document.getElementById('root')!);
root.render(
    <Homepage />
);