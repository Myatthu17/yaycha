import { useRef, useContext } from "react";

import { AppContext } from "./ThemedApp.jsx";

export default function Form({ add }) {

    const { mode } = useContext(AppContext);
    const contentRef = useRef();
    const nameRef = useRef();

    return (
        <form
            style={{
                display: 'flex',
                gap: 3,
                padding: 10,
                flexDirection: 'column',
                borderRadius: 8,
                backgroundColor: mode === 'dark' ? '#555' : '#def',
                margicButtom: 20,
            }}
            onSubmit={e => {
                e.preventDefault();
                const content = contentRef.current.value;
                const name = nameRef.current.value;
                add(content, name);
                e.currentTarget.reset();
            }}
        >
            <input ref={contentRef} type="text" placeholder="Content" style={{ padding: 5}}/>
            <input ref={nameRef} type="text" placeholder="Name" style={{ padding: 5}}/>
            <button type="submit" style={{
                padding: 5,
                backgroundColor: '#0d6efd',
                color: 'white',
                border: '0 none',
            }}>
                Post
            </button>
        </form>
    );
}