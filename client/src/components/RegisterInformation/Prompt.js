import { useState } from "react";

const Prompt = ({ value, onClick, onChange, className, text, editable = true }) => {
    const [status, setStatus] = useState(false);

    let renderElement, style;
    if (status) {
        renderElement = <input type="text" className=" border-0 w-[90%] h-6 rounded-md focus-visible:outline-none" value={value} placeholder="Type here..." onChange={e => onChange(e)} />;
        style = "rotate-45"
    } else {
        renderElement = <button className="border-0 w-[90%]"
            onClick={() => onClick(value)}
        >{value || text}</button>;
        style = "";
    }
    return (
        <div className={className + " flex"}>
            {renderElement}
            {editable && <button className={" place-self-center  transition duration-200 ease-in border-0 " + style} onClick={() => {
                setStatus(!status);
            }}>
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.4" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#292D32" />
                    <path d="M16 11.25H12.75V8C12.75 7.59 12.41 7.25 12 7.25C11.59 7.25 11.25 7.59 11.25 8V11.25H8C7.59 11.25 7.25 11.59 7.25 12C7.25 12.41 7.59 12.75 8 12.75H11.25V16C11.25 16.41 11.59 16.75 12 16.75C12.41 16.75 12.75 16.41 12.75 16V12.75H16C16.41 12.75 16.75 12.41 16.75 12C16.75 11.59 16.41 11.25 16 11.25Z" fill="#292D32" />
                </svg>
            </button>}
        </div>
    );
}

export default Prompt;