import {
  AlignmentType,
  Document,
  ExternalHyperlink,
  HeadingLevel,
  // Packer,
  Paragraph,
  TabStopPosition,
  TabStopType,
  TextRun
} from "docx";
// const PHONE_NUMBER = "07534563401";
// const PROFILE_URL = "https://www.linkedin.com/in/dolan1";
// const EMAIL = "docx@docx.com";
// const NAME = "Dolan Miu";
// const ADDRESS = "58 Elm Avenue, Kent ME4 6ER, UK";

export class DocumentCreator {
  // tslint:disable-next-line: typedef
  create({ name, email, address, phoneNumber, summary, workExperience, education, skills, linkedIn, certification, objective, jobReference }) {
    console.log(workExperience);
    let children = [
      new Paragraph({
        text: name,
        heading: HeadingLevel.TITLE,
        alignment: AlignmentType.CENTER
      }),
      this.createContactInfo(phoneNumber, linkedIn, email, address)
    ];
    if (objective) {
      children.push(this.createHeading("Objective"),
        new Paragraph({
          text: objective + '\n',
          indent: {
            firstLine: '5mm'
          }
        }),
        new Paragraph({
          text: '\n',
        })
      )
    }
    if (summary) {
      children.push(
        this.createHeading("Summary"),
        new Paragraph({
          text: summary + '\n',
          indent: {
            firstLine: '5mm'
          }
        }),
        new Paragraph({
          text: '\n',
        })
      )
    }
    if (workExperience) {
      children.push(
        this.createHeading("Experience"),
        ...workExperience
          .map(position => {
            const arr = [];

            arr.push(
              this.createInstitutionHeader(
                position.company,
                this.createPositionDateText(
                  position.startDate,
                  position.endDate,
                  position.isCurrent
                )
              )
            );
            arr.push(this.createRoleText(position.jobTitle));

            const bulletPoints = position.summary

            bulletPoints.forEach(bulletPoint => {
              arr.push(this.createBullet(bulletPoint));
            });

            return arr;
          })
          .reduce((prev, curr) => prev.concat(curr), []),
        new Paragraph({
          text: '\n'
        })
      )
    }
    if (education) {
      children.push(
        this.createHeading("Education"),
        ...education
          .map(education => {
            const arr = [];
            arr.push(
              this.createInstitutionHeader(
                education.schoolName,
                `${education.startDate.year} - ${education.endDate.year}`
              )
            );
            arr.push(
              this.createRoleText(
                `${education.fieldOfStudy} - ${education.degree}`
              )
            );

            const bulletPoints = education.summary;
            bulletPoints.forEach(bulletPoint => {
              arr.push(this.createBullet(bulletPoint));
            });

            return arr;
          })
          .reduce((prev, curr) => prev.concat(curr), []),
        new Paragraph({
          text: '\n',
        })
      )
    }
    if (skills) {
      children.push(
        this.createHeading("Skills"),
        ...skills.map(skill => {
          return new Paragraph({
            children: [
              new TextRun({
                text: skill.skill,
                bold: true
              }),
              new TextRun({
                text: ` - ${skill.summary}`
              })
            ],
            bullet: {
              level: 0
            }
          })
        }),
        new Paragraph({
          text: '\n',
        })
      )
    }
    if (certification) {
      children.push(
        this.createHeading("Certifications/Licenses"),
        ...certification.map(cert => {
          return new Paragraph({
            text: cert,
            bullet: {
              level: 0
            }
          })
        }),
        new Paragraph({
          text: '\n',
        })
      )
    }
    if (jobReference) {
      children.push(
        this.createHeading("References"),
        ...jobReference.map(ref => {
          const arr = [];
          if (ref.name)
            arr.push(this.createReferenceNameText(ref.name));
          if (ref.title)
            arr.push(new Paragraph({
              text: ref.title
            }));
          if (ref.company)
            arr.push(new Paragraph({
              text: ref.company
            }));
          if (ref.phoneNumber)
            arr.push(new Paragraph({
              text: ref.phoneNumber
            }));
          if (ref.email)
            arr.push(new Paragraph({
              children: [
                new ExternalHyperlink({
                  children: [
                    new TextRun({
                      text: ref.email,
                      style: "Hyperlink"
                    })
                  ],
                  link: `mailto:${ref.email}`
                })
              ]
            }));
          if (ref.relation)
            arr.push(new Paragraph({
              text: ref.relation
            }));
          arr.push(new Paragraph({
            text: '\n'
          }));
          return arr;
        }).reduce((prev, curr) => prev.concat(curr), [])
      )
    }
    // console.log(children);
    const document = new Document({
      sections: [
        {
          children: children
        }
      ]
    });

    return document;
  }

  createContactInfo(
    phoneNumber,
    profileUrl,
    email,
    address
  ) {
    return new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun(
          `Mobile: ${phoneNumber} | LinkedIn: ${profileUrl} | Email: ${email}`
        ),
        new TextRun({
          text: `${address}`,
          break: 1
        })
      ]
    });
  }

  createHeading(text) {
    return new Paragraph({
      text: text,
      heading: HeadingLevel.HEADING_1,
      thematicBreak: true
    });
  }

  createReferenceText(text) {
    return new Paragraph({
      children: [
        new TextRun({
          text: text,
        })
      ]
    })
  }

  createSubHeading(text) {
    return new Paragraph({
      text: text,
      heading: HeadingLevel.HEADING_2
    });
  }

  createInstitutionHeader(
    institutionName,
    dateText
  ) {
    return new Paragraph({
      tabStops: [
        {
          type: TabStopType.RIGHT,
          position: TabStopPosition.MAX
        }
      ],
      children: [
        new TextRun({
          text: institutionName,
          bold: true
        }),
        new TextRun({
          text: `\t${dateText}`,
          bold: true
        })
      ]
    });
  }

  createRoleText(roleText) {
    return new Paragraph({
      children: [
        new TextRun({
          text: roleText,
          italics: true
        })
      ]
    });
  }

  createReferenceNameText(referenceName) {
    return new Paragraph({
      children: [
        new TextRun({
          text: referenceName,
          bold: true
        })
      ]
    });
  }

  createBullet(text) {
    return new Paragraph({
      text: text,
      bullet: {
        level: 0
      }
    });
  }

  // tslint:disable-next-line:no-any
  createSkillList(skills) {
    return new Paragraph({
      children: [new TextRun(skills.map(skill => skill.name).join(", ") + ".")]
    });
  }

  // tslint:disable-next-line:no-any
  createAchivementsList(achivements) {
    return achivements.map(
      achievement =>
        new Paragraph({
          text: achievement.name,
          bullet: {
            level: 0
          }
        })
    );
  }

  createInterests(interests) {
    return new Paragraph({
      children: [new TextRun(interests)]
    });
  }

  splitParagraphIntoBullets(text) {
    return text.split("\n\n");
  }

  // tslint:disable-next-line:no-any
  createPositionDateText(
    startDate,
    endDate,
    isCurrent
  ) {
    const startDateText =
      this.getMonthFromInt(startDate.month) + " " + startDate.year;
    const endDateText = isCurrent
      ? "Present"
      : `${this.getMonthFromInt(endDate.month)} ${endDate.year}`;

    return `${startDateText} - ${endDateText}`;
  }

  getMonthFromInt(value) {
    switch (value) {
      case 1:
        return "January";
      case 2:
        return "February";
      case 3:
        return "March";
      case 4:
        return "April";
      case 5:
        return "May";
      case 6:
        return "June";
      case 7:
        return "July";
      case 8:
        return "August";
      case 9:
        return "September";
      case 10:
        return "October";
      case 11:
        return "November";
      case 12:
        return "December";
      default:
        return "";
    }
  }
}
