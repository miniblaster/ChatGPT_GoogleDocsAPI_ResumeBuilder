

# How to install
To install for backed: npm install
To install for frontend: cd client && npm install

# How to run

To run server : node index.js
To run client : cd client && npm start

# How to use
1. Input information such as personal information, previous work experience, objective, educatioin, skills.
    Follow are require fields: name, email, address, phone number, objective, work experience, skills
2. Click "Generate" button and wait until result will be shown.
    You can select fit model and temperature befor click.
    The larger the temperature, the more creatively it works and the smaller the temperature, the more logically it works.
    Gegerating might take a little long.
    If you see alert, It means that error occured in server because current model was overloaded.
3. Adjust generated sentences using "Regenerate" and "Create new bullet" Button.
    "+" button in "Regenerate" button is toggle button.
    Exception handling is the same as in step 2.
4. Press "Preview" Button so that you can confirm resume that will be created.
5. If you can jump step 2 to regenerate.
6. If All is ok, click "create" button.

The server may crash due to an internal error and you have to run again in that case.