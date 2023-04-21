import { useRecoilState } from "recoil";
import classnames from 'classnames';

import { jobReferenceState } from "../../recoil_state";

export default function JobReference({ className, }) {
    const [jobReference, setJobReference] = useRecoilState(jobReferenceState);

    const handleChange = (val, idx, name) => {
        let value = JSON.parse(JSON.stringify(jobReference));
        value[idx][name] = val;
        console.log(value);
        setJobReference(value);
    }

    return (
        <div className="border rounded-md border-slate-400 p-2">
            {jobReference.map((ref, idx) => (<div key={ref.key||"refKey"} className={classnames("p-2", { "border border-t-slate-400": idx !== 0 })}>
                <label className=' inline-block w-3/12 text-right pr-3 pb-2'>Name</label>
                <input
                    value={ref.name||""}
                    placeholder=" "
                    className="custom-validation border focus-visible:outline-none rounded-md inline-block w-8/12"
                    onChange={(e) => handleChange(e.target.value,idx,"name")}
                />
                <label className='inline-block w-3/12 text-right pr-3 pb-2'>Title</label>
                <input
                    className="custom-validation border focus-visible:outline-none rounded-md inline-block w-8/12"
                    onChange={(e) => handleChange(e.target.value,idx,"title")}
                    value={ref.title||""}
                    placeholder=" "
                />
                <label className='inline-block w-3/12 text-right pr-3 mb-2'>Company</label>
                <input
                    className="custom-validation border focus-visible:outline-none rounded-md inline-block w-8/12"
                    onChange={(e) => handleChange(e.target.value,idx,"company")}
                    value={ref.company||""}
                    placeholder=" "
                />
                <label className='inline-block w-3/12 text-right pr-3 pb-2'>Phone Number</label>
                <input
                    className="custom-validation border focus-visible:outline-none rounded-md inline-block w-8/12"
                    onChange={(e) => handleChange(e.target.value,idx,"phoneNumber")}
                    value={ref.phoneNumber||""}
                    placeholder=" "
                />
                <label className='inline-block w-3/12 text-right pr-3 pb-2'>Email</label>
                <input
                    type="email"
                    className="custom-validation border focus-visible:outline-none rounded-md inline-block w-8/12"
                    onChange={(e) => handleChange(e.target.value,idx,"email")}
                    value={ref.email||""}
                    placeholder=" "
                />
                <label className='inline-block w-3/12 text-right pr-3 pb-2'>Relation</label>
                <input
                    type="email"
                    className="custom-validation border focus-visible:outline-none rounded-md inline-block w-8/12"
                    onChange={(e) => handleChange(e.target.value,idx,"relation")}
                    value={ref.relation||""}
                    placeholder=" "
                />
                <button
                    className='shrink-0 inline-block w-6 h-6 rounded-full border-none leading-none text-red-400 float-right'
                    onClick={() => {
                        let value = jobReference;
                        value = value.filter((val, id) => idx !== id)
                        setJobReference([...value]);
                    }}>
                    <svg fill="#ff0505" viewBox="0 0 64 64" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlSpace="preserve" xmlnsserif="http://www.serif.com/" style={{ fillRule: "evenodd", clipRule: "evenodd", strokeLinejoin: "round", strokeMiterlimit: 2 }} stroke="#ff0505" transform="matrix(1, 0, 0, 1, 0, 0)">

                        <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="5.12" />

                        <g id="SVGRepo_iconCarrier"> <rect id="Icons" x="-64" y="-64" width="1280" height="800" style={{ fill: "none" }} /> <g id="Icons1" serif-id="Icons"> <g id="Strike"> </g> <g id="H1"> </g> <g id="H2"> </g> <g id="H3"> </g> <g id="list-ul"> </g> <g id="hamburger-1"> </g> <g id="hamburger-2"> </g> <g id="list-ol"> </g> <g id="list-task"> </g> <g id="trash"> <path d="M19.186,16.493l0,-1.992c0.043,-3.346 2.865,-6.296 6.277,-6.427c3.072,-0.04 10.144,-0.04 13.216,0c3.346,0.129 6.233,3.012 6.277,6.427l0,1.992l9.106,0l0,4l-4.442,0l0,29.11c-0.043,3.348 -2.865,6.296 -6.278,6.428c-7.462,0.095 -14.926,0.002 -22.39,0.002c-3.396,-0.044 -6.385,-2.96 -6.429,-6.43l0,-29.11l-4.443,0l0,-4l9.106,0Zm26.434,4l-27.099,0c-0.014,9.72 -0.122,19.441 0.002,29.16c0.049,1.25 1.125,2.33 2.379,2.379c7.446,0.095 14.893,0.095 22.338,0c1.273,-0.049 2.363,-1.163 2.38,-2.455l0,-29.084Zm-4.701,-4c-0.014,-0.83 0,-1.973 0,-1.973c0,0 -0.059,-2.418 -2.343,-2.447c-3.003,-0.039 -10.007,-0.039 -13.01,0c-1.273,0.049 -2.363,1.162 -2.38,2.454l0,1.966l17.733,0Z" style={{ fillRule: "nonzero" }} /> <rect x="22.58" y="28.099" width="3" height="16.327" style={{ fillRule: "nonzero" }} /> <rect x="30.571" y="28.099" width="3" height="16.327" style={{ fillRule: "nonzero" }} /> <rect x="38.58" y="28.099" width="3" height="16.327" style={{ fillRule: "nonzero" }} /> </g> <g id="vertical-menu"> </g> <g id="horizontal-menu"> </g> <g id="sidebar-2"> </g> <g id="Pen"> </g> <g id="Pen1" serif-id="Pen"> </g> <g id="clock"> </g> <g id="external-link"> </g> <g id="hr"> </g> <g id="info"> </g> <g id="warning"> </g> <g id="plus-circle"> </g> <g id="minus-circle"> </g> <g id="vue"> </g> <g id="cog"> </g> <g id="logo"> </g> <g id="radio-check"> </g> <g id="eye-slash"> </g> <g id="eye"> </g> <g id="toggle-off"> </g> <g id="shredder"> </g> <g id="spinner--loading--dots-" serif-id="spinner [loading, dots]"> </g> <g id="react"> </g> <g id="check-selected"> </g> <g id="turn-off"> </g> <g id="code-block"> </g> <g id="user"> </g> <g id="coffee-bean"> </g> <g id="coffee-beans"> <g id="coffee-bean1" serif-id="coffee-bean"> </g> </g> <g id="coffee-bean-filled"> </g> <g id="coffee-beans-filled"> <g id="coffee-bean2" serif-id="coffee-bean"> </g> </g> <g id="clipboard"> </g> <g id="clipboard-paste"> </g> <g id="clipboard-copy"> </g> <g id="Layer1"> </g> </g> </g>
                    </svg>
                </button>
            </div>))}
            <label className='inline-block w-3/12 text-right pr-3 '></label>
            <button className='inline-block min-w-[20%] text-center h-6 rounded-lg border border-green-700 leading-none text-green-700'
                onClick={() => {
                    setJobReference([...jobReference, {key: Date.now()}]);
                }}>+</button>
        </div>
    );
}