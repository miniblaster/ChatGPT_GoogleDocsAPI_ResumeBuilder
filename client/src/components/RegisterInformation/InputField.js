import { useState, useRef } from 'react';
import classnames from 'classnames';

import Datepicker from "react-tailwindcss-datepicker";

import getMonthFromInt from '../../utils/getMonthFromInt';

const InputField = ({ name, value, defaultValue, onChange, placeholder, addable, className, showJobTitleField, showPeriodField, includeMonth, showEducationField }) => {
    const [_value, setValue] = useState(value ?? (defaultValue ?? ['']));
    const _name = useRef(name ?? Date.now().toString(36));
    const [date, setDate] = useState([{
        startDate: null,
        endDate: null
    }]);

    const handleDateChange = (newValue, idx) => {
        let _date = date;
        _date[idx] = newValue;
        setDate(_date);
    }

    const handleChange = (val, idx, pos) => {
        let value = JSON.parse(JSON.stringify(_value));
        // value = _value;
        if (pos !== undefined) {
            let temp = _value[idx].split(",");
            temp[pos] = val;
            value[idx] = temp.toString();
        } else {
            value[idx] = val;
        }
        setValue(value);
        // console.log(value);
        if (onChange) {

            if (value.length === 1)
                value = value[0];
            onChange({ [_name.current]: value });
        }

    }

    const isParent = ((addable ?? false) === false) && (value ?? true);
    // console.log(isParent)
    return (
        <div className={classnames(className, { 'p-2 border rounded-lg border-slate-400': !isParent })}>

            {_value.map((val, idx, arr) => (
                <div key={idx} className='flex mb-2 gap-2'>
                    {!showJobTitleField && !showEducationField && <input
                        placeholder={placeholder || " "}
                        type="text"
                        key={_name.current + idx}
                        name={_name.current}
                        className={classnames('w-auto custom-validation grow inline-block border focus-visible:outline-none', { 'w-full rounded-lg': isParent }, { 'rounded-md': !isParent })}
                        value={val}
                        onChange={(e) => handleChange(e.target.value, idx)}
                        required
                    />}
                    {showJobTitleField && <input
                        placeholder='Job Title'
                        type="text"
                        key={_name.current + '_jobTitle' + idx}
                        name={_name.current}
                        className="custom-validation grow inline-block border focus-visible:outline-none rounded-md"
                        onChange={(e) => handleChange(e.target.value, idx, 0)}
                        value={val.split(',')[0] || ""}
                        required
                    />}
                    {showJobTitleField && <input
                        placeholder='Name of Workplace'
                        type="text"
                        key={_name.current + '_company' + idx}
                        name={_name.current}
                        className="custom-validation grow inline-block border focus-visible:outline-none rounded-md"
                        onChange={(e) => handleChange(e.target.value, idx, 1)}
                        value={val.split(',')[1] || ""}
                        required
                    />}
                    {showEducationField && <input
                        placeholder='Degree'
                        type="text"
                        key={_name.current + '_nameofschool' + idx}
                        name={_name.current}
                        className="custom-validation grow shrink inline-block border focus-visible:outline-none rounded-md"
                        onChange={(e) => handleChange(e.target.value, idx, 0)}
                        value={val.split(',')[0] || ""}
                        required
                    />}
                    {showEducationField && <input
                        placeholder='Name of school/university'
                        type="text"
                        key={_name.current + '_degree' + idx}
                        name={_name.current}
                        className="custom-validation grow-0 shrink inline-block border focus-visible:outline-none rounded-md"
                        onChange={(e) => handleChange(e.target.value, idx, 1)}
                        value={val.split(',')[1] || ""}
                        required
                    />}
                    {/* {showEducationField && <input
                        placeholder='Field of study'
                        type="text"
                        key={_name.current + '_fieldofstudy' + idx}
                        name={_name.current}
                        className="custom-validation grow-0 inline-block border focus-visible:outline-none rounded-md"
                        onChange={(e) => handleChange(e.target.value, idx, 2)}
                        value={val.split(',')[2] || ""}
                        required
                    />} */}
                    {showPeriodField && <Datepicker
                        readOnly={true}
                        value={date[idx]}
                        separator="-"
                        placeholder='Date'
                        containerClassName="border-none grow inline-block w-auto shrink"
                        inputClassName="disable border focus-visible:outline-none rounded-md required text-base py-0 pl-0 pr-0 tracking-normal font-normal border-red-400 !custom-validation"
                        toggleClassName="hidden transparent rounded-r-lg bg-opacity-40 bg-gray-400 hover:bg-blue-800 hover:bg-opacity-60 transition-all duration-150 ease-in-out"
                        useRange={false}
                        displayFormat={includeMonth?"MMM. YYYY":"YYYY"}
                        onChange={(v) => {
                            let start = v.startDate.split("-"), end = v.endDate.split("-"),pos = 2;
                            let value;
                            if (includeMonth)
                                value = `${getMonthFromInt(parseInt(start[1]))} ${start[0]} - ${getMonthFromInt(parseInt(end[1]))} ${end[0]}`;
                            else
                                value = `${start[0]} - ${end[0]}`;
                            // if(!showJobTitleField)
                            //     pos = 3;
                            handleChange(value, idx, pos);
                            handleDateChange(v,idx);
                        }}
                    />}
                    {!isParent && arr.length > 1 && <button key={idx + _name.current}
                        className='shrink-0 inline-block w-6 h-6 rounded-full border-none leading-none text-red-400'
                        onClick={() => {
                            let value = _value;
                            value = value.filter((val, id) => idx !== id)
                            setValue([...value]);

                        }}>
                        <svg fill="#ff0505" viewBox="0 0 64 64" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlSpace="preserve" xmlnsserif="http://www.serif.com/" style={{ fillRule: "evenodd", clipRule: "evenodd", strokeLinejoin: "round", strokeMiterlimit: 2 }} stroke="#ff0505" transform="matrix(1, 0, 0, 1, 0, 0)">

                            <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="5.12" />

                            <g id="SVGRepo_iconCarrier"> <rect id="Icons" x="-64" y="-64" width="1280" height="800" style={{ fill: "none" }} /> <g id="Icons1" serif-id="Icons"> <g id="Strike"> </g> <g id="H1"> </g> <g id="H2"> </g> <g id="H3"> </g> <g id="list-ul"> </g> <g id="hamburger-1"> </g> <g id="hamburger-2"> </g> <g id="list-ol"> </g> <g id="list-task"> </g> <g id="trash"> <path d="M19.186,16.493l0,-1.992c0.043,-3.346 2.865,-6.296 6.277,-6.427c3.072,-0.04 10.144,-0.04 13.216,0c3.346,0.129 6.233,3.012 6.277,6.427l0,1.992l9.106,0l0,4l-4.442,0l0,29.11c-0.043,3.348 -2.865,6.296 -6.278,6.428c-7.462,0.095 -14.926,0.002 -22.39,0.002c-3.396,-0.044 -6.385,-2.96 -6.429,-6.43l0,-29.11l-4.443,0l0,-4l9.106,0Zm26.434,4l-27.099,0c-0.014,9.72 -0.122,19.441 0.002,29.16c0.049,1.25 1.125,2.33 2.379,2.379c7.446,0.095 14.893,0.095 22.338,0c1.273,-0.049 2.363,-1.163 2.38,-2.455l0,-29.084Zm-4.701,-4c-0.014,-0.83 0,-1.973 0,-1.973c0,0 -0.059,-2.418 -2.343,-2.447c-3.003,-0.039 -10.007,-0.039 -13.01,0c-1.273,0.049 -2.363,1.162 -2.38,2.454l0,1.966l17.733,0Z" style={{ fillRule: "nonzero" }} /> <rect x="22.58" y="28.099" width="3" height="16.327" style={{ fillRule: "nonzero" }} /> <rect x="30.571" y="28.099" width="3" height="16.327" style={{ fillRule: "nonzero" }} /> <rect x="38.58" y="28.099" width="3" height="16.327" style={{ fillRule: "nonzero" }} /> </g> <g id="vertical-menu"> </g> <g id="horizontal-menu"> </g> <g id="sidebar-2"> </g> <g id="Pen"> </g> <g id="Pen1" serif-id="Pen"> </g> <g id="clock"> </g> <g id="external-link"> </g> <g id="hr"> </g> <g id="info"> </g> <g id="warning"> </g> <g id="plus-circle"> </g> <g id="minus-circle"> </g> <g id="vue"> </g> <g id="cog"> </g> <g id="logo"> </g> <g id="radio-check"> </g> <g id="eye-slash"> </g> <g id="eye"> </g> <g id="toggle-off"> </g> <g id="shredder"> </g> <g id="spinner--loading--dots-" serif-id="spinner [loading, dots]"> </g> <g id="react"> </g> <g id="check-selected"> </g> <g id="turn-off"> </g> <g id="code-block"> </g> <g id="user"> </g> <g id="coffee-bean"> </g> <g id="coffee-beans"> <g id="coffee-bean1" serif-id="coffee-bean"> </g> </g> <g id="coffee-bean-filled"> </g> <g id="coffee-beans-filled"> <g id="coffee-bean2" serif-id="coffee-bean"> </g> </g> <g id="clipboard"> </g> <g id="clipboard-paste"> </g> <g id="clipboard-copy"> </g> <g id="Layer1"> </g> </g> </g>
                        </svg>
                    </button>
                    }
                </div>
            ))}
            {(addable ?? false) && <button className='inline-block min-w-[20%] text-center h-6 rounded-lg border border-green-700 leading-none text-green-700'
                onClick={() => {
                    setValue([..._value, ""]);
                    setDate([...date,{startDate: null, endDate: null}])
                }}>+</button>}

        </div>
    )
}

export default InputField;