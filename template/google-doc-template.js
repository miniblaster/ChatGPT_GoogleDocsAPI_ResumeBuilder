const { google } = require('googleapis');
const _docs = google.docs('v1');
const _service = google.drive('v3');

const Template = () => {
    let service = _service;
    let docs = _docs;
    let IndexData = {};
    let data = {
        name: "Name",
        jobTitle: "Job Title",
        phoneNumber: "Phone Number",
        email: "Email",
        address: "Address",
        linkedIn: "https://linkedin.url",
        summary: "A summary statement is 2-3 sentences that provides a brief synopsis of your work experience and skills. You might use this if you have quite a few years of experience. An objective, on the other hand, is a focused 2-3-sentence statement that demonstrates your interest and candidacy for the position you hope to land. You might use an objective if you’re changing careers, a student or entry-level candidate, or if you’re going to take the time to write a compelling, custom objective",
        workExperience: [
            {
                jobTitle: "Write your job title here",
                company: "Company",
                location: "Location",
                period: "20XX - Present",
                summary: [
                    "Grew digital marketing ROI by 14%",
                    "Designed and implemented work ticketing system",
                    "Uncovered $3.2M in potential savings",
                    "Created nutrition and personal training plans for 30+ clients, helping clients lose 26 pounds on average",
                    "Partnered with cross-functional teams to design multimedia campaigns that boosted subscriptions by 17%"
                ]
            }
        ],
        skills: [
            {
                skill: "Microsoft Excel",
                summary: "Proficient in analyzing large data sets, manipulating formatting, and creating pivot tables of efficient data extraction"
            },
            {
                skill: "Microsoft Word",
                summary: "Experienced in creating documents and presentations for internal and external use"
            },
            {
                skill: "Google Sheets",
                summary: "Skilled in utilizing Google Sheets for data visualization and presentation"
            }
        ],
        education: [
            {
                schoolName: "Saarland University",
                degree: "Bachelor's Degree in Computer Science",
                years: "3",
                location: "Saarbrücken, Germany",
                summary:["Courses in Machine Learning, Artificial Intelligence, and Software Design"]
            }
        ],
        certification: [
            "Certified for Machine Learning (Scikit-Learn)",
            "Certified for Software Design (MVC Architecture)",
            "Certificate in Cloud Computing (AWS)"
        ]
    }
    let requests = [];


    const createRequests = () => {

    }

    const config = ({ _docs, _data }) => {
        if (_docs)
            docs = _docs;
        if (_data)
            data = { ...data, ..._data };
    };

    async function createResume() {
        if (!docs)
            docs = _docs;

        let TEMPLATE_DOCUMENT_ID = "196NXS13pKYAZu07AVPD2hl9Rq1v3LLBxikgka1KkRGU";
        let RESUME_MANUAL_DOCUMENT_ID = "1gtbjKNg1AbejABM-1U__aoeqvFOGzTWqw2xCKhxTLdY";
        let TEST_DOCUMENT_ID = "1cOgCw1BN0xqBix0EXCOVj0bkc9R_8mEkVhOKeW8qaWs";
        const template = await service.files.copy({
            fileId: TEMPLATE_DOCUMENT_ID,
            requestBody: {
                name: `Resume_${data.name}`
            }
        });
        console.log("copied ID\t", template.data.id);

        let result = await docs.documents.batchUpdate({
            requestBody: {
                requests: [{
                    replaceAllText: {
                        replaceText: data.name,
                        containsText: {
                            text: '{{name}}',
                            matchCase: true
                        }
                    }
                },
                {
                    replaceAllText: {
                        replaceText: data.jobTitle,
                        containsText: {
                            text: '{{jobTitle}}',
                            matchCase: true
                        }
                    }
                },
                {
                    replaceAllText: {
                        replaceText: data.phoneNumber,
                        containsText: {
                            text: '{{phoneNumber}}',
                            matchCase: true
                        }
                    }
                },
                {
                    replaceAllText: {
                        replaceText: data.email,
                        containsText: {
                            text: '{{email}}',
                            matchCase: true
                        }
                    }
                },
                {
                    replaceAllText: {
                        replaceText: data.address,
                        containsText: {
                            text: '{{address}}',
                            matchCase: true
                        }
                    }
                },
                {
                    replaceAllText: {
                        replaceText: data.summary,
                        containsText: {
                            text: '{{summary}}',
                            matchCase: true
                        }
                    }
                },
                {
                    replaceAllText: {
                        replaceText: data.education[0].schoolName,
                        containsText: {
                            text: '{{university}}',
                            matchCase: true
                        }
                    }
                },
                {
                    replaceAllText: {
                        replaceText: data.education[0].degree,
                        containsText: {
                            text: '{{degree}}',
                            matchCase: true
                        }
                    }
                },
                {
                    replaceAllText: {
                        replaceText: data.education[0].years,
                        containsText: {
                            text: '{{years}}',
                            matchCase: true
                        }
                    }
                },
                {
                    replaceAllText: {
                        replaceText: data.education[0].location,
                        containsText: {
                            text: '{{location}}',
                            matchCase: true
                        }
                    }
                }
                ]
            },
            // The ID of the document to retrieve.
            documentId: template.data.id,
        });

        result = await docs.documents.get({
            documentId: template.data.id
        })

        findIndex(result.data.body.content);
        console.log(IndexData);
        // -------------  Certification  -------------
        let start = IndexData.certiIndex;
        result = await data.certification.map(el => {
            let res = [
                {
                    "insertText": {
                        "text": `${el}\n`,
                        "location": {
                            "index": start
                        }
                    },
                },
                {
                    "createParagraphBullets": {
                        "range": {
                            "startIndex": start,
                            "endIndex": start + 1
                        },
                        "bulletPreset": "BULLET_DISC_CIRCLE_SQUARE"
                    }
                },
                {
                    "updateParagraphStyle": {
                        "range": {
                            "startIndex": start,
                            "endIndex": start + el.length + 1
                        },
                        "paragraphStyle": {
                            "indentFirstLine": {
                                "unit": "PT"
                            },
                            "alignment": "JUSTIFIED",
                            "indentStart": {
                                "magnitude": 18,
                                "unit": "PT"
                            },
                            "lineSpacing": 100,
                            "spaceAbove": {
                                "magnitude": 3,
                                "unit": "PT"
                            },
                            "spacingMode": "NEVER_COLLAPSE",
                        },
                        "fields": "indentFirstLine, indentStart, lineSpacing, spaceAbove, alignment, spacingMode"
                    }
                },
                {
                    "updateTextStyle": {
                        "range": {
                            "startIndex": start,
                            "endIndex": start + 1
                        },
                        "textStyle": {},
                        "fields": "foregroundColor"
                    }
                },
                {
                    "updateTextStyle": {
                        "range": {
                            "startIndex": start + 1,
                            "endIndex": start + el.length + 1
                        },
                        "textStyle": {},
                        "fields": "foregroundColor"
                    }
                }
            ];
            start += el.length + 1;
            return res;
        })
        requests = requests.concat(await result.reduce((total, cur) => total.concat(cur), []));

        requests.push({
            "deleteContentRange": {
                "range": {
                    "startIndex": start - 1,
                    "endIndex": start
                }
            }
        })

        // --------------  Skills   -----------------
        start = IndexData.skillsIndex;
        result = await data.skills.map(el => {
            let res = [
                {
                    "insertText": {
                        "text": `${el.skill} - ${el.summary}\n`,
                        "location": {
                            "index": start
                        }
                    },
                },
                {
                    "createParagraphBullets": {
                        "range": {
                            "startIndex": start,
                            "endIndex": start + 1
                        },
                        "bulletPreset": "BULLET_DISC_CIRCLE_SQUARE"
                    }
                },
                {
                    "updateParagraphStyle": {
                        "range": {
                            "startIndex": start,
                            "endIndex": start + el.skill.length + el.summary.length + 3 + 1
                        },
                        "paragraphStyle": {
                            "indentFirstLine": {
                                "unit": "PT"
                            },
                            "alignment": "JUSTIFIED",
                            "indentStart": {
                                "magnitude": 18,
                                "unit": "PT"
                            },
                            "lineSpacing": 100,
                            "spaceAbove": {
                                "magnitude": 3,
                                "unit": "PT"
                            },
                            "spacingMode": "NEVER_COLLAPSE",
                        },
                        "fields": "indentFirstLine, indentStart, lineSpacing, spaceAbove, alignment, spacingMode"
                    }
                },
                {
                    "updateTextStyle": {
                        "range": {
                            "startIndex": start,
                            "endIndex": start + 1
                        },
                        "textStyle": {},
                        "fields": "foregroundColor"
                    }
                },
                {
                    "updateTextStyle": {
                        "range": {
                            "startIndex": start + 1,
                            "endIndex": start + el.skill.length + el.summary.length + 3 + 1
                        },
                        "textStyle": {},
                        "fields": "foregroundColor"
                    }
                }
            ];
            start += el.skill.length + el.summary.length + 3 + 1;
            return res;
        })
        requests = requests.concat(await result.reduce((total, cur) => total.concat(cur), []));
        requests.push({
            "deleteContentRange": {
                "range": {
                    "startIndex": start - 1,
                    "endIndex": start
                }
            }
        })
        // ------------- Work Experience ---------------
        result = await data.workExperience.map(async (ex) => {
            start = IndexData.workExpIndex
            let temp = [], res = [];
            temp = await ex.summary.map(el => {
                let res = [
                    {
                        "insertText": {
                            "location": {
                                "index": start,
                            },
                            "text": `${el}\n`
                        },
                    },
                    {
                        "createParagraphBullets": {
                            "range": {
                                "startIndex": start,
                                "endIndex": start + 1
                            },
                            "bulletPreset": "BULLET_DISC_CIRCLE_SQUARE"
                        },
                    },
                    {
                        "updateParagraphStyle": {
                            "range": {
                                "startIndex": start,
                                "endIndex": start + ex.jobTitle.length
                            },
                            "paragraphStyle": {
                                "indentFirstLine": {
                                    "unit": "PT"
                                },
                                "alignment": "JUSTIFIED",
                                "indentStart": {
                                    "magnitude": 18,
                                    "unit": "PT"
                                },
                                "lineSpacing": 100,
                                "spaceAbove": {
                                    "magnitude": 3,
                                    "unit": "PT"
                                },
                                "spacingMode": "NEVER_COLLAPSE",
                            },
                            "fields": "indentFirstLine, indentStart, lineSpacing, spaceAbove, alignment, spacingMode"
                        }
                    },
                    {
                        "updateTextStyle": {
                            "range": {
                                "startIndex": start,
                                "endIndex": start + 1
                            },
                            "textStyle": {},
                            "fields": "foregroundColor, bold"
                        }
                    },
                    {
                        "updateTextStyle": {
                            "range": {
                                "startIndex": start + 1,
                                "endIndex": start + el.length + 1
                            },
                            "textStyle": {},
                            "fields": "foregroundColor, bold"
                        }
                    }
                ];
                start += el.length + 1;
                return res;
            });
            res = await res.concat(await temp.reduce((total, cur) => total.concat(cur)), res);
            requests.push({
                "deleteContentRange": {
                    "range": {
                        "startIndex": start - 1,
                        "endIndex": start
                    }
                }
            })
            start = IndexData.workExpIndex;
            res.push(
                {
                    "insertText": {
                        "location": {
                            "index": start
                        },
                        "text": `${ex.company}`
                    }
                },
                {
                    "updateTextStyle": {
                        "range": {
                            "startIndex": start,
                            "endIndex": start + ex.company.length
                        },
                        "textStyle": {
                            "bold": true
                        },
                        "fields": "foregroundColor, bold"
                    }
                },
                {
                    "insertText": {
                        "location": {
                            "index": start + ex.company.length
                        },
                        "text": ` | `
                    }
                },
                {
                    "updateTextStyle": {
                        "range": {
                            "startIndex": start + ex.company.length,
                            "endIndex": start + ex.company.length + 3
                        },
                        "textStyle": {},
                        "fields": "bold"
                    }
                }
            )
            start += ex.company.length + 3;
            res.push(
                {
                    "insertText": {
                        "location": {
                            "index": start
                        },
                        "text": `${ex.location}`
                    }
                },
                {
                    "updateTextStyle": {
                        "range": {
                            "startIndex": start,
                            "endIndex": start + ex.location.length
                        },
                        "textStyle": {
                            "bold": true
                        },
                        "fields": "foregroundColor, bold"
                    }
                },
                {
                    "insertText": {
                        "location": {
                            "index": start + ex.location.length
                        },
                        "text": ` | `
                    }
                },
                {
                    "updateTextStyle": {
                        "range": {
                            "startIndex": start + ex.location.length,
                            "endIndex": start + ex.location.length + 3
                        },
                        "textStyle": {},
                        "fields": "bold"
                    }
                }
            )
            start += ex.location.length + 3;
            res.push(
                {
                    "insertText": {
                        "location": {
                            "index": start
                        },
                        "text": `${ex.period}\n`
                    }
                },
                {
                    "updateTextStyle": {
                        "range": {
                            "startIndex": start,
                            "endIndex": start + ex.period.length + 1
                        },
                        "textStyle": {
                            "bold": true
                        },
                        "fields": "foregroundColor, bold"
                    }
                },
                {
                    "updateParagraphStyle": {
                        "range": {
                            "startIndex": IndexData.workExpIndex,
                            "endIndex": start + ex.period.length + 1
                        },
                        "paragraphStyle": {
                            "lineSpacing": 100,
                            "spaceAbove": {
                                "magnitude": 3,
                                "unit": "PT"
                            },
                            "spacingMode": "NEVER_COLLAPSE",
                        },
                        "fields": "indentFirstLine, indentStart, lineSpacing, spaceAbove, alignment, spacingMode"
                    }
                },
                {
                    "deleteParagraphBullets": {
                        "range": {
                            "startIndex": IndexData.workExpIndex,
                            "endIndex": start + ex.period.length + 1
                        }
                    }
                }
            )
            start = IndexData.workExpIndex;
            res.push(
                {
                    "insertText": {
                        "location": {
                            "index": start
                        },
                        "text": `${ex.company.toUpperCase()}\n`
                    }
                },
                {
                    "updateTextStyle": {
                        "range": {
                            "startIndex": start,
                            "endIndex": start + ex.company.length + 1
                        },
                        "textStyle": {
                            "bold": true,
                            "foregroundColor": {
                                "color": {
                                    "rgbColor": {
                                        "green": 0.4392157,
                                        "blue": 0.7529412,
                                    }
                                }
                            }
                        },
                        "fields": "foregroundColor, bold"
                    }
                }
            )
            return res;
        })
        requests = requests.concat(await result.reduce((total, cur) => total.concat(cur)), []);

        // --------------  LinkedIn    ----------------
        start = IndexData.linkedInIndex
        requests.push({
            "updateTextStyle": {
                "range": {
                    "startIndex": start,
                    "endIndex": start + 8
                },
                "textStyle": {
                    "foregroundColor": {
                        "color": {
                            "rgbColor": {
                                "red": 0.06666667,
                                "green": 0.33333334,
                                "blue": 0.8
                            }
                        }
                    },
                    "underline": true,
                    "link": {
                        "url": `${data.linkedIn}`
                    }
                },
                "fields": "foregroundColor, underline, link"
            }
        })
        // console.log(requests);

        result = await docs.documents.batchUpdate({
            documentId: template.data.id,
            requestBody: {
                requests: requests
            }
        })
        // console.log(result.data);
        requests = [];
        return result;
    }

    const findIndex = (parent) => {
        if (parent.paragraph && parent.paragraph.elements[0].textRun) {
            if (parent.paragraph.elements[0].textRun.content.includes("LinkedIn"))
                IndexData = { ...IndexData, linkedInIndex: parent.paragraph.elements[0].startIndex };
            if (parent.paragraph.elements[0].textRun.content.includes("WORK EXPERIENCE"))
                IndexData = { ...IndexData, workExpIndex: parent.endIndex };
            if (parent.paragraph.elements[0].textRun.content.includes("SKILLS"))
                IndexData = { ...IndexData, skillsIndex: parent.endIndex };
            if (parent.paragraph.elements[0].textRun.content.includes("CERTIFICATIONS/LICENSES"))
                IndexData = { ...IndexData, certiIndex: parent.endIndex };
        }
        if (IndexData.linkedInIndex && IndexData.workExpIndex && IndexData.skillsIndex && IndexData.certiIndex)
            return true;
        if (typeof parent === "array")
            for (let i = 0; i < parent.length; i++) {
                if (findIndex(parent[i]))
                    return true;
            }
        if (typeof parent === 'object') {
            let keys = Object.keys(parent);

            for (let i = 0; i < keys.length; i++) {
                if (findIndex(parent[keys[i]]))
                    return true;
            }
        }
    }

    return { createResume };
}

// exports = module.exports = Template
exports.createResume = Template().createResume;