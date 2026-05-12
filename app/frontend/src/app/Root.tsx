import React from 'react';
import AuthPanel from "../components/AuthPanel";
import HomePage from "../components/HomePage";

export default function Root() {
    return (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 24 }}>
            <section>
                <AuthPanel />
            </section>

            <section>
                <HomePage />
            </section>
        </div>
    );
}