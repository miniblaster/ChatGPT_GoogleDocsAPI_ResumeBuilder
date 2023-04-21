const data = {
    name: "Benjamin A. Carney",
    email: "bencarney2@gmail.com",
    phoneNumber: "(630) 835-6421",
    address: "434 N Larch Ave Elmhurst,IL 60126",
    linkedIn: "https://linkedin.url",
    summary: "A summary statement is 2-3 sentences that provides a brief synopsis of your work experience and skills. You might use this if you have quite a few years of experience. An objective, on the other hand, is a focused 2-3-sentence statement that demonstrates your interest and candidacy for the position you hope to land. You might use an objective if you’re changing careers, a student or entry-level candidate, or if you’re going to take the time to write a compelling, custom objective.",
    workExperience: [
        {
            isCurrent: true,
            summary: [
                "Full-stack developer working with Angular and Java. Working for the iShares platform.",
            ],
            jobTitle: "Associate Software Developer",
            startDate: {
                month: 11,
                year: 2017,
            },
            company: "BlackRock",
            period: "Nov 2017 - present"
        },
        {
            summary: [
                "Full-stack developer working with Angular, Node and TypeScript. Working for the iShares platform. Emphasis on Dev-ops and developing the continous integration pipeline."
            ],
            jobTitle: "Software Developer",
            endDate: {
                month: 11,
                year: 2017,
            },
            startDate: {
                month: 10,
                year: 2016,
            },
            company: "Torch Markets",
            period: "Oct 2016 - Nov 2017"
        },
        {
            summary: [
                "Used ASP.NET MVC 5 to produce a diversity data collection tool for the future of British television.",
                "Used AngularJS and C# best practices. Technologies used include JavaScript, ASP.NET MVC 5, SQL, Oracle, SASS, Bootstrap, Grunt.",
            ],
            jobTitle: "Software Developer",
            endDate: {
                month: 10,
                year: 2016,
            },
            startDate: {
                month: 3,
                year: 2015,
            },
            company: "Soundmouse",
            period: "Mar 2015 - Oct 2016"
        },
        {
            summary: [
                "Develop web commerce platforms for constious high profile clients.",
                "Created a log analysis web application with the Play Framework in Java, incorporating Test Driven Development. It asynchronously uploads and processes large (2 GB) log files, and outputs meaningful results in context with the problem.", "Analysis  and  development  of  the payment system infrastructure and user accounts section to be used by several clients of the company such as Waitrose, Tally Weijl, DJ Sports, Debenhams, Ann Summers, John Lewis and others.",
                "Technologies used include WebSphere Commerce, Java, JavaScript and JSP.",
            ],
            jobTitle: "Java Developer",
            endDate: {
                month: 10,
                year: 2014,
            },
            startDate: {
                month: 3,
                year: 2013,
            },
            company: "Soundmouse",
            period: "Oct 2014 - May 2013"
        },
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
    ],
    certification: [
        "Certified for Machine Learning (Scikit-Learn)",
        "Certified for Software Design (MVC Architecture)",
        "Certificate in Cloud Computing (AWS)"
    ]
}

export default data;