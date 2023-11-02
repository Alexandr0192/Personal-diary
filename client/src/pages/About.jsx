import React from 'react';
import Editor2 from "../components/UI/Editor2/editor2";

const About = () => {
    return (
        <div>
            <h1>
                Тестовый редактор
            </h1>
            {/*style={{position: "relative"} стиль для редактора*/}
            <div style={{position: "relative"}}>
                <Editor2/>
            </div>
        </div>
    );
};

export default About;