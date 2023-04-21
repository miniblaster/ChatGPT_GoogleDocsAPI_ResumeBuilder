import { atom, selector } from 'recoil';

import { convertObject } from './utils/Parser';

// this is environment variable, for developement
const baseURLState = atom({
    key: 'baseURLState',
    default: "http://localhost:3080"
});

const temperatureState = atom({
    key: 'temperatureState',
    default: 0.5
});

const modelState = atom({
    key: 'modelState',
    default: 'text-davinci-003'
});

const inputDataState = atom({
    key: 'inputDataState',
    default: {
        address: "NewYork, NY",
        education: [
            "Bachelor's degree in Computer Science, XYZ University, 2018-2022",
        ],
        email: "jonas@gmail.com",
        experience: [
            "Freelancer, Upwork , 2018 - 2022"
        ],
        name: "Jonas Weber",
        objective: "get an office administrator job.",
        phone: "1234567890",
        skills: [
            "Microsoft Excel",
            "Word",
            "Google sheets"
        ]
    }
});

const resumeDataState = atom({
    key: 'resumeDataState',
    default: {}
})

const adjustDataState = atom({
    key: 'adjustDataState',
    default: {}
})

const templateDataState = selector({
    key: 'templateDataState',
    get: ({ get }) => {
        let templateData = {
            education: [
                {
                    degree: "Master of Science (MSc)",
                    fieldOfStudy: "Computer Science",
                    summary: [
                        "Exam Results: 1st Class with Distinction, Dissertation: 1st Class with Distinction.",
                        "Relevant Courses: Java and C# Programming, Software Engineering, Artificial Intelligence, \nComputational Photography, Algorithmics, Architecture and Hardware.",
                        "Created a Windows 8 game in JavaScript for the dissertation.",
                        "Created an award-winning 3D stereoscopic game in C# using XNA.",
                    ],
                    schoolName: "University College London",
                    startDate: {
                        year: 2012,
                    },
                    endDate: {
                        year: 2013,
                    },
                    years: "2",
                    period: "2012 - 2013"
                },
                {
                    degree: "Bachelor of Engineering (BEng)",
                    fieldOfStudy: "Material Science and Engineering",
                    summary: [
                        "Exam Results: 2:1, Dissertation: 1st Class with Distinction.",
                        "Relevant courses: C Programming, Mathematics and Business for Engineers."
                    ],
                    schoolName: "Imperial College London",
                    startDate: {
                        year: 2009,
                    },
                    endDate: {
                        year: 2012,
                    },
                    years: "4",
                    period: "2009 - 2012"
                },
            ]
        };
        let adjustData = get(adjustDataState);
        let inputData = get(inputDataState);
        templateData = { ...templateData, ...convertObject(adjustData, inputData) };
        console.log(templateData);
        return templateData;
    }
})

const jobReferenceState = atom({
    key: 'jobReferenceState',
    default: []
})

export {
    temperatureState,
    modelState,
    baseURLState,
    inputDataState,
    resumeDataState,
    templateDataState,
    adjustDataState,
    jobReferenceState
};