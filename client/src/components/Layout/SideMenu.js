import { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { modelState, temperatureState, baseURLState } from '../../recoil_state';
import ReactGA from 'react-ga4';

import SvgLogo from '../../OpenAISVGLogo';

const SideMenu = () => {
  const [models, setModels] = useState([]);
  const [currentModel, setModelState] = useRecoilState(modelState);
  const [temperature, setTemperature] = useRecoilState(temperatureState);
  const baseURL = useRecoilValue(baseURLState);
  
  useEffect(() => {
    
    getEngines();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const getEngines = () => {
    fetch(`${baseURL}/openai/models`)
      .then(res => res.json())
      .then(data => {
        // console.log(data.models.data)
        // set models in order alpahbetically
        data.models.data.sort((a, b) => {
          if (a.id < b.id) { return -1; }
          if (a.id > b.id) { return 1; }
          return 0;
        })
        setModels(data.models.data)
      })
  }
  
  function handleTemp(temp) {
    temp = parseFloat(temp);
    if (temp > 1) {
      setTemperature(1)
    } else if (temp < 0) {
      setTemperature(0)
    } else {
      setTemperature(temp)
    }
    ReactGA.event({
      category: 'Adjust chatGPT parameter',
      action: 'Adjust temperature',
      label: `value is ${temp}`
    })
  }

  return (
    <aside className="text-white p-3 w-full md:w-[250px] p-5">
      <div className="flex justify-start md:justify-between space-x-4 md:space-x-0">
        <div className="w-10 inline-block ">
          <SvgLogo />
        </div>
        <p className="inline-block align-middle text-2xl italic">Resume Builder</p>
      </div>
      <div className="mt-10">
        <select
          // active if model is select is currentModel
          value={currentModel}
          className="w-full rounded-md default-color h-10"
          placeholder='Model'
          onChange={(e) => {
            setModelState(e.target.value)
            ReactGA.event({
              category: 'Adjust chatGPT parameter',
              action: 'Change model',
              label: `Model is ${e.target.value}`
            })
          }}>
          {models && models.length ? models.map((model, index) => (
            <option
              key={model.id}
              value={model.id}>{model.id}</option>
          )) : <option
            key={"text-davinci-003"}
            value={"text-davinci-003"}>{"text-davinci-003"}</option>}
        </select>

        <div className='mt-5 flex flex-wrap justify-around space-x-5'>
          <label className="side-label" >Temperature</label>
        </div>
        <div className='flex flex-wrap justify-between space-x-5'>
          <input
            className="default-color custom-slider grow  item-center self-center"
            onChange={(e) => handleTemp(e.target.value)}
            value={temperature}
            type="range"
            min="0"
            max="1"
            step="0.1" />
          <input
            className="default-color h-10 w-10 rounded-md"
            type="number"
            onChange={(e) => handleTemp(e.target.value)}
            min="0"
            max="1"
            step="0.1"
            value={temperature}
          />
        </div>
      </div>
    </aside>
  )
};

export default SideMenu