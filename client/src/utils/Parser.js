

const splitPhrase = (text, name) => {
  const terminate = /(: |:\n|\n| *\n)/;
  const keyword = /((S[uU][mM][mM][aA][rR][yY]( S[tT][aA][tT][eE][mM][eE][nN][tT])?(: |:\n|\n| *\n))|(O[bB][jJ][eE][cC][tT][iI][vV][eE]( S[tT][aA][tT][eE][mM][eE][nN][tT])?(: |:\n|\n| *\n))|(S[kK][iI][lL][lL][sS]?[^ed](: |:\n|\n| *\n))|(E[dD][uU][cC][aA][tT][iI][oO][nN](: |:\n|\n| *\n))|((C[eE][rR][Tt][iI][fF][iI][cC][aA][tT][iI][oO][nN][sS]?(( & )|( and )|\/|( or ))[lL][iI][cC][eE][nN][sS][eE][sS]?)|([^ ]L[iI][cC][eE][nN][sS][eE][sS]?[^ ]([^a]|[^&]))|([^ ]C[eE][rR][Tt][iI][fF][iI][cC][aA][tT][iI][oO][nN][sS]?[^ ][^a&o])(: |:\n|\n| *\n))|((W[oO][rR][kK] )?[eE][xX][pP][eE][rR][iI][eE][nN][cC][eE][sS]?(: |:\n|\n| *\n)))/;
  const regex = {
    summary: new RegExp(`S[uU][mM][mM][aA][rR][yY]( [sS][tT][aA][tT][eE][mM][eE][nN][tT])?(: |:\n|\n| *\n)`),
    objective: new RegExp(`O[bB][jJ][eE][cC][tT][iI][vV][eE]( S[tT][aA][tT][eE][mM][eE][nN][tT])?(: |:\n|\n| *\n)`),
    skills: new RegExp(`S[kK][iI][lL][lL][sS]?(: |:\n|\n| *\n)`),
    education: new RegExp(`E[dD][uU][cC][aA][tT][iI][oO][nN](: |:\n|\n| *\n)`),
    licenses: new RegExp(`(C[eE][rR][Tt][iI][fF][iI][cC][aA][tT][iI][oO][nN][sS]?(( & )|( and )|/|( or ))[lL][iI][cC][eE][nN][sS][eE][sS]?)|([^ ]L[iI][cC][eE][nN][sS][eE][sS]?[^ ]([^ao&]))|([^ ]C[eE][rR][Tt][iI][fF][iI][cC][aA][tT][iI][oO][nN][sS]?[ ]?[^a&o])(: |:\n|\n| *\n)`),
    experience: new RegExp(`(W[oO][rR][kK] )?[eE][xX][pP][eE][rR][iI][eE][nN][cC][eE][sS]?(: |:\n|\n| *\n)`)
  }
  // const keyword = new RegExp(`(${regex.summary})|(${regex.objective})|(${regex.skills})|(${regex.education})|(${regex.licenses})|(${regex.experience})`);
  let start = text.search(regex[name]);
  if (start === -1)
    return "";
  // start = start.index;
  let from = start + text.slice(start).search(terminate) + 1;
  let tmp = text.slice(from).search(keyword);
  let to = from + ((tmp === -1) ? text.length : (tmp - 1));
  let result = text.slice(from, to).trimStart().trimEnd();
  if(result.match(/([Nn][o][n][e].?)$/))
    return "";
  return result;
}

const convertObject = (adjustData, inputData) => {
  let templateData = {}, start = 0, end;
  // From inputData
  templateData['name'] = inputData.name;
  templateData['email'] = inputData.email;
  templateData['phoneNumber'] = inputData.phone;
  templateData['address'] = inputData.address;
  templateData['linkedIn'] = inputData.linkedIn;
  console.log(adjustData);
  // From resumeData
  templateData['summary'] = Array.isArray(adjustData.summary) && adjustData.summary.length > 0 && adjustData.summary[0].content[0].value;
  templateData['objective'] = Array.isArray(adjustData.objective) && adjustData.objective.length > 0 && adjustData.objective[0].content[0].value;
  templateData['workExperience'] = Array.isArray(adjustData.experience) && adjustData.experience.map(exp => {
    let newExperience = {};
    start = 0;
    let title = exp.title.trim();
    newExperience['summary'] = exp.content.map(el =>
      el.value.replace(/[-•]/, "").trim()
    );
    end = title.search(/(,|-|at )/);
    newExperience['jobTitle'] = title.slice(start, end).trim();
    title = title.slice(end+2).trim();
    start = 0;
    end = title.search(/(\(|-|–|,)/);
    newExperience['company'] = title.slice(start, end).trim();
    newExperience['period'] = title.slice(end + 1).replace(/(\)|\()/g, "");
    title = newExperience.period;
    let startDate, endDate;
    end = title.search(/(-|–)/);
    startDate = title.slice(0, end);
    endDate = title.slice(end+1);
    console.log(newExperience, startDate, endDate);
    if (endDate.search(/(Present|present)/) !== -1)
      newExperience['isCurrent'] = true;
    newExperience['startDate'] = startDate = {
      month: getMonthFromString(startDate.match(/[\S]+/)[0].trim()),
      year: parseInt(startDate.match(/\d+/)[0])
    };
    newExperience['endDate'] = endDate = {
      month: getMonthFromString(endDate.match(/[\S]+/)[0].trim()),
      year: parseInt(endDate.match(/\d+/)[0])
    };
    let now = new Date(Date.now());
    if (now.getFullYear() === endDate.year && now.getMonth() + 1 === endDate.month)
      newExperience['isCurrent'] = true;
    return newExperience;
  });
  templateData['skills'] = Array.isArray(adjustData.skills) && adjustData.skills.length > 0 && adjustData.skills[0].content.map(skill => {
    let newSkill = {};
    skill = skill.value.replace(/[-•]/, "").trim();
    end = skill.search(/[:-]/);
    newSkill['skill'] = skill.slice(0, end).trim();
    newSkill['summary'] = skill.slice(end + 1).trim()
    return newSkill;
  })
  templateData['education'] = Array.isArray(adjustData.education) && adjustData.education.length > 0 && adjustData.education[0].content.map(cert => {
    let newEdu = {};
    cert = cert.value.trim();
    start = 0;
    end = cert.search(/(,|at )/);
    newEdu['degree'] = cert.slice(start, end).trim();
    newEdu['schoolName'] = cert.slice(end+1).trim();
    start = newEdu['degree'].search(/(in )/);
    newEdu['fieldOfStudy'] = newEdu['degree'].slice(start + 2).trim();
    start = 0;
    end = newEdu['schoolName'].search(/(\(|-|–|,)/);
    newEdu['period'] = newEdu['schoolName'].slice(end + 1).replace(/(\(|\))/g, "");
    newEdu['schoolName'] = newEdu['schoolName'].slice(start, end);
    // console.log(newEdu.period);
    // let [startDate, endDate] = newEdu['period'].split(/-/);
    let startDate, endDate;
    end = newEdu['period'].search(/(-|–)/);
    startDate = newEdu['period'].slice(0, end);
    endDate = newEdu['period'].slice(end+1);
    console.log(newEdu.period,":", startDate,":", endDate);
    newEdu['startDate'] = {
      month: getMonthFromString(startDate.match(/[\S]+/)[0].trim()),
      year: parseInt(startDate.match(/\d+/)[0])
    };
    newEdu['endDate'] = {
      month: getMonthFromString(endDate.match(/[\S]+/)[0].trim()),
      year: parseInt(endDate.match(/\d+/)[0])
    };
    newEdu['summary'] = [];
    return newEdu;
  })
  templateData['certification'] = Array.isArray(adjustData.certification) && adjustData.certification.length > 0 && adjustData.certification[0].content.map(cert => cert.value.replace(/[-•]/, "").trim())
  return templateData;
}

const convertToAdjust = ({ objective, summary, experience, education, skills, certification, temperature }) => {

  let adjustData = {};

  adjustData.objective = (objective!=="") && [{ content: [{ value: objective, temperature: temperature, prompt: '' }] }];
  adjustData.summary = (summary!=="") && [{ content: [{ value: summary, temperature: temperature, prompt: '' }] }];
  adjustData.experience = ( summary!=="" ) && experience.split(/\n *\n/g).map(exp => {
    let newExp = {}, start, end;
    exp = exp.trim();
    start = 0;
    end = exp.search(/\n/);
    newExp.title = exp.slice(start, end);
    newExp.content = exp.slice(end + 1).split(/\n/).map(el => ({
      value: el.replace(/[^a-zA-Z ]/, "").trim(),
      temperature: temperature,
      prompt: ''
    })
    );
    return newExp;
  });
  adjustData.education = (education!=="" ) && education && [{ content: education.split(/\n/).map(ed => ({ value: ed.trim(), temperature: temperature, prompt: '' })) }];
  adjustData.skills = (skills!=="" ) && [{ content: skills.split(/\n/).filter(el => el).map(skill => ({ value: skill.trim(), temperature: temperature, prompt: '' })) }];
  adjustData.certification = (certification!=="" ) && certification && [{ content: certification.split(/\n/).map(cert => ({ value: cert.trim(), temperature: temperature, prompt: '' })) }];

  return adjustData;
}

const getMonthFromString = (value) => {
  switch (value) {
    case "January":
    case "Jan.":
      return 1;
    case "February":
    case "Feb.":
      return 2;
    case "March":
    case "Mar.":
      return 3;
    case "April":
    case "Apr.":
      return 4;
    case "May":
    case "May.":
      return 5;
    case "June":
    case "Jun.":
      return 6;
    case "July":
    case "Jul.":
      return 7;
    case "August":
    case "Aug.":
      return 8;
    case "September":
    case "Sep.":
      return 9;
    case "October":
    case "Oct.":
      return 10;
    case "November":
    case "Nov.":
      return 11;
    case "December":
    case "Dec.":
      return 12;
    default:
      return 0;
  }
}

export {
  splitPhrase,
  convertObject,
  convertToAdjust,
}