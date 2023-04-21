import { useRef } from "react"; 
import TextareaAutosize from 'react-textarea-autosize';
import { useRecoilState, useRecoilValue } from "recoil";
import ReactGA from 'react-ga4';
import Prompt from './Prompt';

import { temperatureState, adjustDataState, baseURLState, modelState, inputDataState } from "../../recoil_state";

export default function AdjustField({ name, value, title, addable, className, prompt, adjustable = true, promptEditable = true }) {
    const _name = useRef(name ?? Date.now().toString(36));
    const [adjustData, setAdjustData] = useRecoilState(adjustDataState);
    const temperature = useRecoilValue(temperatureState);
    const baseURL = useRecoilValue(baseURLState);
    const currentModel = useRecoilValue(modelState);
    const inputData = useRecoilValue(inputDataState);

    const handleChange = (val) => {
        setAdjustData({ ...adjustData, [_name.current]: val });
    }

    const handleAdjust = async ({ prompt, messages }) => {
        console.log(prompt, messages);
        return fetch(`${baseURL}/openai/adjust`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: messages,
                ...inputData,
                currentModel,
                temperature,
            })
        })
            .then(async (response) => {
                let res = await response.json();
                // handle exception

                res = res.message.replace(/R[eE][sS][uU][mM][eE] [mM][aA][kK][eE][rR]:? ?/, "").replace(/\t/g, "").trimStart();
                console.log(res);
                
                return res;
            })
            .catch(err => {
                console.log(err);

                alert(err);
                return null;
            })
    }

    return (
        <div className={"w-full my-4 grid grid-cols-6 gap-x-4 gap-y-2 " + className}>
            {title && <p className="col-start-3 col-span-4 text-2xl font-bold text-slate-400 text-center ">{title}</p>}
            {Array.isArray(adjustData[_name.current]) && adjustData[_name.current].map((el, id) =>
                <>
                    {el.hasOwnProperty("title") &&
                        <div className="col-span-2" key={_name.current + 'wrapTitle' + id}>
                            <button className='w-6 h-6 float-right self-end border-none leading-none text-red-700'
                                key={_name.current + 'rTitle' + id}
                                onClick={() => {
                                    let temp = JSON.parse(JSON.stringify(adjustData[_name.current]));
                                    temp[id].title = "";
                                    handleChange([...temp]);
                                }}
                            >
                                <svg fill="#ff0505" viewBox="0 0 64 64" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlSpace="preserve" xmlnsserif="http://www.serif.com/" style={{ fillRule: "evenodd", clipRule: "evenodd", strokeLinejoin: "round", strokeMiterlimit: 2 }} stroke="#ff0505" transform="matrix(1, 0, 0, 1, 0, 0)">

                                    <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="5.12" />

                                    <g id="SVGRepo_iconCarrier"> <rect id="Icons" x="-64" y="-64" width="1280" height="800" style={{ fill: "none" }} /> <g id="Icons1" serif-id="Icons"> <g id="Strike"> </g> <g id="H1"> </g> <g id="H2"> </g> <g id="H3"> </g> <g id="list-ul"> </g> <g id="hamburger-1"> </g> <g id="hamburger-2"> </g> <g id="list-ol"> </g> <g id="list-task"> </g> <g id="trash"> <path d="M19.186,16.493l0,-1.992c0.043,-3.346 2.865,-6.296 6.277,-6.427c3.072,-0.04 10.144,-0.04 13.216,0c3.346,0.129 6.233,3.012 6.277,6.427l0,1.992l9.106,0l0,4l-4.442,0l0,29.11c-0.043,3.348 -2.865,6.296 -6.278,6.428c-7.462,0.095 -14.926,0.002 -22.39,0.002c-3.396,-0.044 -6.385,-2.96 -6.429,-6.43l0,-29.11l-4.443,0l0,-4l9.106,0Zm26.434,4l-27.099,0c-0.014,9.72 -0.122,19.441 0.002,29.16c0.049,1.25 1.125,2.33 2.379,2.379c7.446,0.095 14.893,0.095 22.338,0c1.273,-0.049 2.363,-1.163 2.38,-2.455l0,-29.084Zm-4.701,-4c-0.014,-0.83 0,-1.973 0,-1.973c0,0 -0.059,-2.418 -2.343,-2.447c-3.003,-0.039 -10.007,-0.039 -13.01,0c-1.273,0.049 -2.363,1.162 -2.38,2.454l0,1.966l17.733,0Z" style={{ fillRule: "nonzero" }} /> <rect x="22.58" y="28.099" width="3" height="16.327" style={{ fillRule: "nonzero" }} /> <rect x="30.571" y="28.099" width="3" height="16.327" style={{ fillRule: "nonzero" }} /> <rect x="38.58" y="28.099" width="3" height="16.327" style={{ fillRule: "nonzero" }} /> </g> <g id="vertical-menu"> </g> <g id="horizontal-menu"> </g> <g id="sidebar-2"> </g> <g id="Pen"> </g> <g id="Pen1" serif-id="Pen"> </g> <g id="clock"> </g> <g id="external-link"> </g> <g id="hr"> </g> <g id="info"> </g> <g id="warning"> </g> <g id="plus-circle"> </g> <g id="minus-circle"> </g> <g id="vue"> </g> <g id="cog"> </g> <g id="logo"> </g> <g id="radio-check"> </g> <g id="eye-slash"> </g> <g id="eye"> </g> <g id="toggle-off"> </g> <g id="shredder"> </g> <g id="spinner--loading--dots-" serif-id="spinner [loading, dots]"> </g> <g id="react"> </g> <g id="check-selected"> </g> <g id="turn-off"> </g> <g id="code-block"> </g> <g id="user"> </g> <g id="coffee-bean"> </g> <g id="coffee-beans"> <g id="coffee-bean1" serif-id="coffee-bean"> </g> </g> <g id="coffee-bean-filled"> </g> <g id="coffee-beans-filled"> <g id="coffee-bean2" serif-id="coffee-bean"> </g> </g> <g id="clipboard"> </g> <g id="clipboard-paste"> </g> <g id="clipboard-copy"> </g> <g id="Layer1"> </g> </g> </g>

                                </svg>
                            </button>
                        </div>
                    }
                    {el.hasOwnProperty("title") && <input className="custom-validation col-start-3 col-span-4 border border-slate-400 rounded-lg"
                        key={_name.current + 'title' + id}
                        value={el.title}
                        onChange={(e) => {
                            let temp = JSON.parse(JSON.stringify(adjustData[_name.current]));
                            temp[id].title = e.target.value;
                            handleChange([...temp]);
                        }}
                    />}

                    {
                        el.content.map((con, idx, arr) =>
                            <>
                                <div key={_name.current + 'wvalue' + id + '_' + idx} className="md:col-span-2 col-span-6 flex space-x-1 ">
                                    {arr.length > 1 && <button className='w-6 h-6 shrink-0 self-center border-none leading-none text-red-700'
                                        key={_name.current + 'rvalue' + id + '_' + idx}
                                        onClick={() => {
                                            let temp = JSON.parse(JSON.stringify(adjustData[_name.current]));
                                            temp[id].content.splice(idx, 1);
                                            handleChange([...temp]);
                                            ReactGA.event({
                                                category: 'Build Resume',
                                                action: 'Remove bullet'
                                            })
                                        }}
                                    >
                                        <svg fill="#ff0505" viewBox="0 0 64 64" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlSpace="preserve" xmlnsserif="http://www.serif.com/" style={{ fillRule: "evenodd", clipRule: "evenodd", strokeLinejoin: "round", strokeMiterlimit: 2 }} stroke="#ff0505" transform="matrix(1, 0, 0, 1, 0, 0)">

                                            <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="5.12" />

                                            <g id="SVGRepo_iconCarrier"> <rect id="Icons" x="-64" y="-64" width="1280" height="800" style={{ fill: "none" }} /> <g id="Icons1" serif-id="Icons"> <g id="Strike"> </g> <g id="H1"> </g> <g id="H2"> </g> <g id="H3"> </g> <g id="list-ul"> </g> <g id="hamburger-1"> </g> <g id="hamburger-2"> </g> <g id="list-ol"> </g> <g id="list-task"> </g> <g id="trash"> <path d="M19.186,16.493l0,-1.992c0.043,-3.346 2.865,-6.296 6.277,-6.427c3.072,-0.04 10.144,-0.04 13.216,0c3.346,0.129 6.233,3.012 6.277,6.427l0,1.992l9.106,0l0,4l-4.442,0l0,29.11c-0.043,3.348 -2.865,6.296 -6.278,6.428c-7.462,0.095 -14.926,0.002 -22.39,0.002c-3.396,-0.044 -6.385,-2.96 -6.429,-6.43l0,-29.11l-4.443,0l0,-4l9.106,0Zm26.434,4l-27.099,0c-0.014,9.72 -0.122,19.441 0.002,29.16c0.049,1.25 1.125,2.33 2.379,2.379c7.446,0.095 14.893,0.095 22.338,0c1.273,-0.049 2.363,-1.163 2.38,-2.455l0,-29.084Zm-4.701,-4c-0.014,-0.83 0,-1.973 0,-1.973c0,0 -0.059,-2.418 -2.343,-2.447c-3.003,-0.039 -10.007,-0.039 -13.01,0c-1.273,0.049 -2.363,1.162 -2.38,2.454l0,1.966l17.733,0Z" style={{ fillRule: "nonzero" }} /> <rect x="22.58" y="28.099" width="3" height="16.327" style={{ fillRule: "nonzero" }} /> <rect x="30.571" y="28.099" width="3" height="16.327" style={{ fillRule: "nonzero" }} /> <rect x="38.58" y="28.099" width="3" height="16.327" style={{ fillRule: "nonzero" }} /> </g> <g id="vertical-menu"> </g> <g id="horizontal-menu"> </g> <g id="sidebar-2"> </g> <g id="Pen"> </g> <g id="Pen1" serif-id="Pen"> </g> <g id="clock"> </g> <g id="external-link"> </g> <g id="hr"> </g> <g id="info"> </g> <g id="warning"> </g> <g id="plus-circle"> </g> <g id="minus-circle"> </g> <g id="vue"> </g> <g id="cog"> </g> <g id="logo"> </g> <g id="radio-check"> </g> <g id="eye-slash"> </g> <g id="eye"> </g> <g id="toggle-off"> </g> <g id="shredder"> </g> <g id="spinner--loading--dots-" serif-id="spinner [loading, dots]"> </g> <g id="react"> </g> <g id="check-selected"> </g> <g id="turn-off"> </g> <g id="code-block"> </g> <g id="user"> </g> <g id="coffee-bean"> </g> <g id="coffee-beans"> <g id="coffee-bean1" serif-id="coffee-bean"> </g> </g> <g id="coffee-bean-filled"> </g> <g id="coffee-beans-filled"> <g id="coffee-bean2" serif-id="coffee-bean"> </g> </g> <g id="clipboard"> </g> <g id="clipboard-paste"> </g> <g id="clipboard-copy"> </g> <g id="Layer1"> </g> </g> </g>

                                        </svg>
                                    </button>}
                                    {adjustable && <Prompt className="min-w-[50%] grow  border self-center border-slate-400 rounded-md"
                                        key={_name.current + 'pvalue' + id + '_' + idx}
                                        value={con.prompt}
                                        text="Regenerate"
                                        editable={promptEditable}
                                        onChange={e => {

                                            let temp = JSON.parse(JSON.stringify(adjustData[_name.current]));
                                            temp[id].content[idx]["prompt"] = e.target.value;
                                            handleChange([...temp]);
                                        }}
                                        onClick={async () => {
                                            let temp = JSON.parse(JSON.stringify(adjustData[_name.current]));
                                            let prompt = temp[id].content[idx]["prompt"];
                                            let value = temp[id].content[idx]["value"];
                                            // console.log(prompt, !prompt);

                                            if (!prompt) {
                                                switch (_name.current) {
                                                    case "summary":
                                                    case "objective":
                                                        prompt = `Regenerate my ${_name.current} to sound similar with '${value}' but be worded differently.`;
                                                        break;
                                                    case "skills":
                                                    case "experience":
                                                        prompt = `Regenerate my bullet point to make it sound similar  with '${value}', but worded differently.`;
                                                        break;
                                                    default:
                                                }
                                            }
                                            else {
                                                prompt = `Regenerate my bullet point for my ${_name.current} but be worded differently as '${value}' and ${prompt}.`;
                                            }

                                            if (_name.current === "skills")
                                                prompt += ` it should be formated as 'skill name: summary about the skill'.`;

                                            value = await handleAdjust({ messages: prompt });
                                            if (!value)
                                                value = temp[id].content[idx]["value"];
                                            temp[id].content[idx].value = value;
                                            handleChange([...temp]);
                                            ReactGA.event({
                                                category: 'Build Resume',
                                                action: 'Regenerate bullet'
                                            })
                                        }}
                                    />}
                                    {adjustable && <input
                                        key={_name.current + 'tvalue' + id + '_' + idx}
                                        className="w-10 h-6 border self-center border-slate-400 rounded-md"
                                        // defaultValue={temperature}
                                        value={con.temperature}
                                        type="number"
                                        min="0"
                                        max="1"
                                        step="0.1"
                                        onChange={(e) => {
                                            let temp = JSON.parse(JSON.stringify(adjustData[_name.current]));
                                            temp[id].content[idx].temperature = e.target.value;
                                            handleChange([...temp]);
                                        }}
                                    />}
                                </div>
                                <TextareaAutosize key={_name.current + 'aValue' + id + '_' + idx} role="textbox"
                                    className="custom-validation textarea md:col-start-3 md:col-span-4 col-span-6 border border-red-400 focus-visible:outline-none rounded-md"
                                    value={con.value}
                                    onChange={(e) => {
                                        let temp = JSON.parse(JSON.stringify(adjustData[_name.current]));
                                        temp[id].content[idx].value = e.target.value;
                                        handleChange([...temp]);
                                    }}
                                    contentEditable
                                    suppressContentEditableWarning={true}
                                    required
                                />
                            </>
                        )
                    }
                    {(addable ?? false) && <Prompt className='col-start-3 col-span-3 inline-block min-w-[20%] text-center h-7 rounded-lg border border-green-700 leading-none text-green-700'
                        key={_name.current + 'add'}
                        text="Create new bullet"
                        value={el.prompt}
                        onChange={e => {
                            let temp = JSON.parse(JSON.stringify(adjustData[_name.current]));
                            temp[id].prompt = e.target.value;
                            handleChange([...temp]);
                        }}
                        onClick={async (prompt) => {
                            let message;
                            let temp = JSON.parse(JSON.stringify(adjustData[_name.current]));
                            switch (_name.current) {
                                case 'experience':
                                    message = `Provide another bullet point about my ${_name.current}, make sure it is different from fllow about me; ${temp[id].content.map(el => el.value + "\n")} it should start with a verb`;
                                    if (prompt)
                                        message += ` and make this bullet be about ${prompt}.`;
                                    else
                                        message += `.`;
                                    break;
                                case 'skills':
                                    message = `Provide another bullet point about my ${_name.current},`;
                                    if (prompt)
                                        message += ` make this bullet be about ${prompt}.`;
                                    else
                                        message += `make sure it is different from mt current skills and it should be similar to my skill area such as ${temp[id].content.map(el => el.value + "\n")}`;
                                    message += `it should be formated as 'skill name: summary about the skill'.`
                                    break;
                                default:
                                    prompt = `Create another bullet point  about my ${_name.current} for resume`;
                            }

                            const value = await handleAdjust({ messages: message });
                            if (!value)
                                return;
                            temp[id].content = [...temp[id].content, { temperature: temperature, prompt: "", value: value }];
                            handleChange([...temp]);
                            ReactGA.event({
                                category: 'Build Resume',
                                action: 'Create new bullet'
                            })
                        }} />}
                </>
            )
            }

        </div >
    );
}