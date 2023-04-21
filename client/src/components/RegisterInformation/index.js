import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';
import { Packer } from 'docx';
import ReactGA from 'react-ga4';

import InputField from './InputField';
import AdjustField from './AdjustField';
import JobReference from './JobReference';


import { DocumentCreator } from '../cv/cv-generator';
import { temperatureState, baseURLState, inputDataState, modelState, templateDataState, adjustDataState, jobReferenceState } from '../../recoil_state';
import { splitPhrase, convertObject, convertToAdjust } from '../../utils/Parser';

// import './ResumeBox.css';

function RegisterForm() {

  const [inputData, setInputData] = useRecoilState(inputDataState);
  const temperature = useRecoilValue(temperatureState);
  const currentModel = useRecoilValue(modelState);
  // const [resumeData, setResumeData] = useRecoilState(resumeDataState);
  const templateData = useRecoilValue(templateDataState);
  const [status, setStatus] = useState(false);
  const baseURL = useRecoilValue(baseURLState);
  const [preview, setPreview] = useState('');
  const [adjustData, setAdjustData] = useRecoilState(adjustDataState);
  const [isJobReference, setIsJobReference] = useState(false);
  const jobReference = useRecoilValue(jobReferenceState);
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({hitType: 'pageview', page:location.pathname })
    // console.log(location);
  }, []) // eslint-disable-line react-hooks/exhaustive-deps


  function handleSubmit(e) {
    e.preventDefault();
    // fetch response to the api combining the chat log array of messages and seinding it as a message to localhost:3000 as a post
    let messages = "Just tell me my full resume."
    setStatus(true);
    setPreview("")
    fetch(`${baseURL}/openai/`, {
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
        console.log(res);
        if (res.status !== 200)
          throw Error(`Request failed with status code ${res.status}`)

        res = res.message.replace(/R[eE][sS][uU][mM][eE] [mM][aA][kK][eE][rR]:? ?/, "").replace(/\t/g, "").trimStart();
        console.log(res);
        let newData = convertToAdjust({ temperature: temperature, summary: splitPhrase(res, 'summary'), experience: splitPhrase(res, 'experience'), education: splitPhrase(res, 'education'), skills: splitPhrase(res, 'skills'), certification: splitPhrase(res, 'licenses'), objective: splitPhrase(res, 'objective') }); //.slice(0,res.search(/\n\n/))
        console.log(newData);
        setAdjustData(newData);
        ReactGA.event({
          category: 'Build Resume',
          action: 'Generate from chatGPT',
          label: 'success'
        })
      })
      .catch(err => {
        console.log(err);
        ReactGA.event({
          category: 'Build Resume',
          action: 'Generate from chatGPT',
          label: 'failed'
        })
        alert(err);
      })
      .finally(() => {
        setStatus(false);
      })
  }

  async function generateGoogleDocs() {
    fetch(`${baseURL}/googledocs/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...templateData
      })
    });
    ReactGA.event({
      category: 'Build Resume',
      action: 'Create into Google docs',
    })
  }

  function changeValue(val) {
    // console.log(inputData);
    setInputData({ ...inputData, ...val });
  }

  const generateDoc = () => {
    console.log(templateData);
    const documentCreator = new DocumentCreator();
    const doc = documentCreator.create({...templateData,jobReference});
    Packer.toBlob(doc).then(async (blob) => {

      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = `resume_${templateData.name}.docx`
      link.click()
      ReactGA.event({
        category: 'Build Resume',
        action: 'Create into docx'
      })
    });
  }

  const generatePDF = () => {
    fetch(`${baseURL}/createfile/pdf`, {
      method: "POST",
      headers: {
        'Accept': 'application/pdf',
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...templateData, jobReference
      })
    })
      .then(async (res) => {
        var buff = await res.arrayBuffer();
        const blob = new Blob([buff], { type: "application/pdf" });

        const link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = `resume_${templateData.name}.pdf`
        link.click()
        ReactGA.event({
          category: 'Build Resume',
          action: 'Create into pdf'
        })
      })
  }

  const handlePreview = () => {
    let tmplData = convertObject(adjustData, inputData);

    console.log(tmplData);
    fetch(`${baseURL}/createfile/preview`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...templateData, jobReference
      })
    })
      .then(async (res) => {
        res = await res.json();
        setPreview(res.html);
        ReactGA.event({
          category: 'Build Resume',
          action: 'Preview resume',
        })
      })
  }



  return (
    <div className="">
      <div className="">
        <div className='flex my-2'>
          <label className='inline-block w-1/6 text-right pr-3'>Full Name</label>
          <InputField
            className="inline-block w-5/6"
            name="name"
            defaultValue={[inputData.name]}
            onChange={changeValue}
          />
        </div>
        <div className='flex my-2'>
          <label className='inline-block w-1/6 text-right pr-3'>Email</label>
          <InputField
            className="inline-block w-5/6"
            name="email"
            defaultValue={[inputData.email]}
            onChange={changeValue}
          />
        </div>
        <div className='flex my-2'>
          <label className='inline-block w-1/6 text-right pr-3'>Phone Number</label>
          <InputField
            className="inline-block w-5/6"
            defaultValue={[inputData.phone]}
            name="phone"
            onChange={changeValue}
          />
        </div>
        <div className='flex my-2'>
          <label className='inline-block w-1/6 text-right pr-3'>Address</label>
          <InputField
            className="inline-block w-5/6"
            name="address"
            defaultValue={[inputData.address]}
            onChange={changeValue}
          />
        </div>
        <div className='flex my-2'>
          <label className='inline-block w-1/6 text-right pr-3'>Optional Info</label>
          <InputField
            className="inline-block w-5/6"
            name="Opt"
            addable
            onChange={changeValue}
          />
        </div>
        <div className='flex my-2'>
          <label className='inline-block w-1/6 text-right pr-3'>Objective</label>
          <InputField
            className="inline-block w-5/6"
            name="objective"
            defaultValue={[inputData.objective]}
            onChange={changeValue}
          />
        </div>
        <div className='flex my-2'>
          <label className='inline-block w-1/6 text-right pr-3'>Previous Job Experience</label>
          <InputField
            className="inline-block w-5/6"
            name="experience"
            defaultValue={inputData.experience}
            addable
            onChange={changeValue}
            showJobTitleField
            showPeriodField
            includeMonth
          />
        </div>
        <div className='flex my-2'>
          <label className='inline-block w-1/6 text-right pr-3'>Education</label>
          <InputField
            className="inline-block w-5/6"
            name="education"
            defaultValue={inputData.education}
            addable
            onChange={changeValue}
            showEducationField
            showPeriodField
          />
        </div>
        <div className='flex my-2'>
          <label className='inline-block w-1/6 text-right pr-3'>Skills</label>
          <InputField
            className="inline-block w-5/6"
            defaultValue={inputData.skills}
            name="skills"
            addable
            onChange={changeValue}
          />
        </div>
        <div className='block my-8'>
          <button className='block mx-auto w-1/5 border border-slate-400' onClick={handleSubmit} hidden={status}>Genarate</button>
        </div>
        {adjustData?.objective && <AdjustField
          className="w-5/6 float-right"
          name="objective"
          title="Objective"
          prompt="Regenerate my objective to sound similar, but be worded differently as {{value}}"
        />}
        {adjustData?.summary && <AdjustField
          className="w-5/6 float-right"
          name="summary"
          title="Summary"
          prompt="Regenerate my summary to sound similar, but be worded differently as {{value}}"
        />}
        {adjustData?.experience && <AdjustField
          className="w-5/6 float-right"
          name="experience"
          addable
          title="Previous Job Experience"
          prompt="Regenerate my bullet point to make it sound similar, but worded differently as {{}}"
        />}
        {adjustData?.education && <AdjustField
          className="w-5/6 float-right"
          name="education"
          title="Education"
          adjustable={false}
        />}
        {adjustData?.skills && <AdjustField
          className="w-5/6 float-right"
          name="skills"
          addable
          title="Skills"
        />}
        {adjustData?.certification && <AdjustField
          className="w-5/6 float-right"
          name="certification"
          title="Certifications"
        />}
        <div className='my-5 w-5/6 float-right'>
          <label>
            <input type="checkbox" name='job' onChange={(e) => {
              setIsJobReference(e.target.checked);
            }} /> Add Job Reference
          </label>
          {isJobReference && <JobReference />}
        </div>
        <div className='block my-8'>
          <button className='block mx-auto w-1/5 border border-slate-400' onClick={handlePreview} hidden={status}>Preview</button>
        </div>
        <div className='block flex justify-evenly space-x-10 w-5/6 float-right'>
          <button className='grow border border-slate-400' onClick={generateGoogleDocs} hidden={status}>Create into Google Docs</button>
          <button className='grow border border-slate-400' onClick={generatePDF} hidden={status}>Create into PDF</button>
          <button className='grow border border-slate-400' onClick={generateDoc} hidden={status}>Create into Doc</button>
        </div>

        <div className='p-6 mx-auto w-full' dangerouslySetInnerHTML={{ __html:preview }}>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
