const express = require('express');
const router = express.Router();
const HTMLtoDOCX = require('html-to-docx');
const { saveAs } = require('file-saver')
const fs = require('fs');
const puppeteer = require('puppeteer');
// const { exec } = require("child_process");
let fileBuffer;

router.post('/preview', (req, res) => {
    const data = req.body;
    res.json({
        html: createResumeFile(data),
        jobRef: createJoBReference(data)
    });
})

router.post('/pdf', async (req, res) => {
    const data = req.body;
    let browser;
    const input = "./template/html-template.html";
    const output = "./temp/example.pdf";
    const ResumeContent = createResumeFile(data);
    const JobRefContent = createJoBReference(data);
    console.log("fdsafsd", JobRefContent);
    fs.writeFileSync(input, "<!DOCTYPE html><html><body>" + ResumeContent + JobRefContent + "</body></html >", { flag: 'w', encoding: 'utf-8' });
    // return destPath;

    browser = await puppeteer.launch();

    const page = await browser.newPage();
    await page.goto('file:///' + fs.realpathSync(input), { waitUntil: 'networkidle0' });
    const result = await page.pdf({
        format: 'A4',
        // path: output,
        preferCSSPageSize: true,
    });
    await browser.close();
    // console.log(result, typeof result);
    res.set({ 'Content-Type': 'application/pdf', 'Content-Length': result.length })
    res.send(result)
})

router.post('/download', (req, res) => {
    if (fileBuffer) {
        const file = 'example.docx';
        const filePath = `./temp/example.docx`;

        fs.writeFile(filePath, fileBuffer, { flag: 'w' }, (error) => {
            if (error) {
                console.log('Docx file creation failed');
                res.json({ msg: "can 't download" });
                return;
            }
            console.log('Docx file created successfully');
            // const fileStream = fs.createWriteStream(filePath);
            // res.pipe(fileStream);
            // fileStream.on('finish', () => {
            //     fileStream.close();
            //     console.log('Download Completed');
            // })
            res.download(file);
        });
    }
    else
        return res.json({ msg: "can 't download" });
})

const createResumeFile = ({ name, email, address, phoneNumber, summary, workExperience, education, skills, objective, jobReference, certification }) => {
    let htmlContent = `
        <div style="width:21cm;height: 27.9cm;font-family: 'Times New Roman';font-size: 14px; box-sizing: border-box; padding: 2.54cm">
        <div style="">
            <p style="font-size: 38px;text-align: center;margin: 0px;">${name}</p>
            <p style="text-align: center; font-size: 13px;margin: 0px;">
                <a href="mailto:${email}" style="color: rgb(46,116,181);">${email}</a> • ${phoneNumber}
            </p>
            <p style="text-align: center; font-size: 13px;margin: 0px;">
                ${address}
            </p>
        </div>`;
    if (objective) {
        htmlContent += `<div style="margin-bottom:10px;">
            <p style="color: rgb(46, 116, 181);font-size: 21px;margin: 0px;">Objective</p>
            <hr style="border: solid 1px black;margin: 0px;" />
            <p style="margin: 0px;text-indent: 5mm;">${objective}</p>
        </div>`;
    }

    if (summary) {
        htmlContent += `<div style="margin-bottom:10px;">
            <p style="color: rgb(46, 116, 181);font-size: 21px;margin: 0px;">Summary</p>
            <hr style="border: solid 1px black;margin: 0px;" />
            <p style="margin: 0px;text-indent: 5mm;">${summary}</p>
        </div>`;
    }

    if (workExperience) {
        htmlContent += `<div style="margin-bottom:10px;">
			<p style="color: rgb(46, 116, 181);font-size: 21px;margin: 0px;">Experience</p>
			<hr style="border: solid 1px black;margin: 0px;" />`;
        for (let position of workExperience) {
            // console.log(position);
            htmlContent += `
            <p style="font-weight: bold;margin: 0px;display: inline-block;">${position.company}</p>
            <p style="margin: 0px; float: right; font-weight: bold;display: inline-block;">${position.period}</p>
            <p style="font-style: italic;margin: 0px;">${position.jobTitle}</p>
            <ul style="margin: 0px 0px 0px 0px;list-style: disc; padding-left: 40px;">
            `;
            for (let sum of position.summary) {
                htmlContent += `<li>${sum}</li>`;
            }
            htmlContent += `</ul >`;
        }
        htmlContent += `
        </div>`;
    }
    if (education) {
        htmlContent += `<div style="margin-bottom:10px;">
        <p style="color: rgb(46, 116, 181);font-size: 21px;margin: 0px;">Education</p>
        <hr style="border: solid 1px black;margin: 0px;" />`
        for (let position of education) {
            htmlContent += `   
            <p style="font-weight: bold;margin: 0px;display: inline-block;">${position.schoolName}</p>
            <p style="margin: 0px; float: right; font-weight: bold;display: inline-block;">${position.startDate.year} - ${position.endDate.year}</p>
            <p style="font-style: italic;margin: 0px;">${position.fieldOfStudy} - ${position.degree}</p>`;
            if (position?.summary) {
                htmlContent += `<ul style="margin: 0px 0px 0px 0px;list-style: disc; padding-left: 40px;">`;
                for (let sum of position.summary) {
                    htmlContent += `<li>${sum}</li>`
                }
                htmlContent += `</ul>`
            }
        }
        htmlContent += `</div >`;
    }
    if (skills) {
        htmlContent += `<div style="margin-bottom:10px;">
			<p style="color: rgb(46, 116, 181);font-size: 21px;margin: 0px;">Skills</p>
			<hr style="border: solid 1px black;margin: 0px;" />
            <ul style="margin: 0px 0px 0px 0px;list-style: disc; padding-left: 40px;">`
        for (let skill of skills) {
            htmlContent += `<li>${skill.skill}${skill.summary ? ` - ${skill.summary}` : ``}</li>`
        }
        htmlContent += `
            </ul >
        </div >`;
    }
    if (certification) {
        htmlContent += `<div style="margin-bottom:10px;">
            <p style="color: rgb(46, 116, 181);font-size: 21px;margin: 0px;">Certifications/Licenses</p>
            <hr style="border: solid 1px black;margin: 0px;" />
            <ul style="margin: 0px 0px 0px 0px;list-style: disc; padding-left: 40px;">`
        for (let cert of certification) {
            htmlContent += `<li>${cert}</li>`
        }
        htmlContent += `
            </ul >
        </div>`;
    }
    if (jobReference) {
        htmlContent += `<div style="margin-bottom:10px;">
        <p style="color: rgb(46, 116, 181);font-size: 21px;margin: 0px;">Reference</p>
        <hr style="border: solid 1px black;margin: 0px;" />`
        for (let ref of jobReference) {
            htmlContent += `<div style="margin-bottom: 10px;">`
            if (ref.name)
                htmlContent += `<p style="margin: 0px;font-weight: bold" >${ref.name}</p>`;
            if (ref.title)
                htmlContent += `<p style="margin: 0px;">${ref.title}</p>`;
            if (ref.company)
                htmlContent += `<p style="margin: 0px;">${ref.company}</p>`;
            if (ref.phoneNumber)
                htmlContent += `<p style="margin: 0px;">${ref.phoneNumber}</p>`;
            if (ref.email)
                htmlContent += `<p style="margin: 0px; color: rgb(46, 116, 181);"><a href="mailto:${ref.email}">${ref.email}</a></p>`;
            if (ref.relation)
                htmlContent += `<p style="margin: 0px">${ref.relation}</p>`;
            htmlContent += '</div>';
        }
        htmlContent += '</div>'
    }
    htmlContent += `</div >`;
    return htmlContent;
}

const createJoBReference = ({ name, email, address, phoneNumber, jobReference }) => {
    console.log(!(jobReference?.length));
    if (!(jobReference?.length))
        return "";
    let html = `<div style="width:21cm;height: 27.9cm;font-family: 'Times New Roman';font-size: 14px; box-sizing: border-box; padding: 2.54cm">
        <div style="">
            <p style="font-size: 38px;text-align: center;margin: 0px;">${name}</p>
            <p style="text-align: center; font-size: 13px;margin: 0px;background-color: rgb(39, 34, 26);color:white; padding: 10px 0px;">
                ${address} • <a href="mailto:${email}" style="color: white;">${email}</a> • ${phoneNumber}
            </p>
        </div>
        <div style="margin-top: 10px; display: flex;">
            <p style="display: inline-block; width:25%; font-weight: bold;font-size: 15px; align-self: self-start">
                PROFESSIONAL REFERENCES
            </p>
        <div style="display: inline-block; width: 75%;">`;
    jobReference.map(ref => {
        html += `<div style="margin-bottom: 20px;">
        <p style="font-weight: bold; margin: 0px;">${ref.name}</p>
        <p style="margin: 0px;">${ref.title}</p>
        <p style="margin: 0px;">${ref.company}</p>
        <p style="margin: 0px;">${ref.phoneNumber}</p>
        <p style="margin: 0px;"><a href="mailto:${ref.email}" style="color: rgb(46,116,181);">${ref.email}</a></p>
        <p style="margin: 0px;">${ref.relation}</p>
    </div>`
    })
    html += `</div></div></div>`;
    return html;
}

module.exports = router;