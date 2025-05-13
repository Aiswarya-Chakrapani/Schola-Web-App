const express = require('express')
const sql = require('mssql')
const cors = require('cors')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { request } = require('http')

const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { GoogleAIFileManager } = require("@google/generative-ai/server");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { time } = require('console')

const googleApiKey = "AIzaSyA8xtJBrSdJyBjqxl-c7UhGMoriJgBvm9M";
const generativeApiKey = "AIzaSyA8xtJBrSdJyBjqxl-c7UhGMoriJgBvm9M";
const fileManager = new GoogleAIFileManager(googleApiKey);
const genAI = new GoogleGenerativeAI(generativeApiKey);

let lastUploadedFileId = null;

const app = express()
app.use(cors())

app.use(express.json())

app.use(express.static('public'));
console.log("Serving static files from 'public' directory");

const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

const saveBufferToFile = (buffer, originalName) => {
    const tempDir = path.join(__dirname, 'temp');
  
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
      console.log("Created 'temp' directory");
    }
  
    const tempFilePath = path.join(tempDir, Date.now() + '-' + originalName);
    fs.writeFileSync(tempFilePath, buffer);
    return tempFilePath;
};

const port = 3333

app.listen(port, () => {
    console.log("Server is running!!!")
})

const config = {
    user: 'aditya_muppidi',
    password: '20051718@adi',
    server: 'schola-personalized-student-full-stack-web-application.database.windows.net',
    database: 'schola',
    options: {
        encrypt: true,
        enableArithAbort: true,
    }
};

async function connectToDatabase() {
    try {
        await sql.connect(config);
        console.log('Connected to Azure SQL Database successfully');

    } catch (err) {
        console.error('Database connection failed:', err);
    }
}

connectToDatabase();

//  API-1 : REGISTER USER
app.post('/register/', async (request,response) => {
    const {
        firstName,
        lastName,
        username,
        password,
        schoolName,
        grade,
        schoolCity,
        schoolState,
        dob,
        gender,
        age,
        bio,
    } = request.body
    const userCheckUserQuery = `SELECT * FROM users WHERE user_name = '${username}'`
    const user = await sql.query(userCheckUserQuery)
    if(user.recordset.length !== 0) {
        response.status(400)
        response.send('User already exists')
    } else {
        const hashPassword = await bcrypt.hash(password, 10)
        const registerUserQuery = `INSERT INTO users (first_name, last_name, user_name, password, school_name, grade, school_city, school_state, dob, gender, age, bio) 
                        VALUES ('${firstName}','${lastName}','${username}','${hashPassword}','${schoolName}','${grade}','${schoolCity}','${schoolState}','${dob}','${gender}', ${age},'${bio}' )`
        await sql.query(registerUserQuery)
        const payLoad = {username}
        const jwtToken = jwt.sign(payLoad, 'aditya')
        response.send({jwtToken})
    }
})

//  API-2 : LOGIN USER
app.post('/login/', async (request,response) => {
    const {
        username,
        password,
    } = request.body
    const payLoad = {username}
    const jwtToken = jwt.sign(payLoad, 'aditya')
    const userCheckUserQuery = `SELECT * FROM users WHERE user_name = '${username}'`
    const user = await sql.query(userCheckUserQuery)
    if(user.recordset.length === 0) {
        response.status(400)
        response.send('Invalid User')
    } else {
        let passwordin = user.recordset[0]
        let hashedPassword = passwordin.password
        const isPasswordMatches = await bcrypt.compare(password, hashedPassword)
        if(isPasswordMatches) {
            response.send({jwtToken})
        } else {
            response.status(400)
            response.send('Invalid Password')
        }
    }
})

//  AUTHENTICATE TOKEN CHECK
const authenticateToken = (request, response, next) => {
    let jwtToken
    const authHeader = request.headers['authorization']
    if (authHeader !== undefined) {
      jwtToken = authHeader.split(' ')[1]
    }
    if (jwtToken === undefined) {
      response.status(401)
      response.send('Invalid JWT Token')
    } else {
      jwt.verify(jwtToken, 'aditya', async (error, payLoad) => {
        if (error) {
          response.status(401)
          response.send('Invalid JWT Token')
        } else {
          request.headers.username = payLoad.username
          next()
        }
      })
    }
}

//  API-3 : ADD TASK
app.post('/todolist/addtask/', authenticateToken, async (request, response) => {
    const {
        id,
        taskHeading,
        taskDescription,
        check,
        dateTime,
        username,
    } = request.body;

    const addTaskSql = `
        INSERT INTO Tasks (taskId, taskTitle, taskDescription, deadline, username, isCompleted)
        VALUES ('${id}', '${taskHeading}', '${taskDescription}', '${dateTime}', '${username}', '${check}')
    `;

    try {
        const taskAddResponse = await sql.query(addTaskSql);

        if (taskAddResponse.rowsAffected[0] === 1) {
            response.status(200).send({ message: 'Task added successfully' });
        } else {
            response.status(400).send({ error: 'Failed to add task' });
        }
    } catch (error) {
        console.error('Error adding task:', error);
        response.status(400).send({ error: 'Failed to add task' });
    }
});


//  API-4 : GET ALL THE TASKS OF AN USER
app.get('/todolist/tasks/:username/', authenticateToken, async (request, response) => {
    const {username} = request.params
    const getTasksQuery = `SELECT * FROM Tasks WHERE username = '${username}' ORDER BY created_at ASC`
    const tasks = await sql.query(getTasksQuery)
    const formatDate = (isoDateString) => {
        const date = new Date(isoDateString);
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const year = date.getUTCFullYear();
        return `${day}-${month}-${year}`;
    };
    const updatedTasks = tasks.recordset.map(task => ({
        ...task,
        isCompleted: task.isCompleted === 'true',
        deadline: formatDate(task.deadline),
    }));
    response.send(updatedTasks)
})

//  API-5 : UPDATE CHECK VALUE
app.put('/todolist/updatetaskcheck/:taskId', authenticateToken, async (request, response) => {
    const {taskId} = request.params
    const {check} = request.body
    const updateCheckSqlQuery = `UPDATE Tasks SET isCompleted = '${check}' WHERE taskId = '${taskId}'`
    try {
        const res = await sql.query(updateCheckSqlQuery)
        if (res.rowsAffected[0] === 1) {
            response.status(200).send({ message: 'Task Updated' });
        } else {
            response.status(400).send({ error: 'Failed to update task' });
        }
    } catch (error) {
        console.error('Error changing task:', error);
        response.status(400).send({ error: 'Failed to update task' });
    }
})

//  API-6 : DELETE TASK
app.delete('/todolist/:taskId', authenticateToken, async (request, response) => {
    const {taskId} = request.params
    const deleteTaskSqlQuery = `DELETE FROM tasks WHERE taskId='${taskId}'`
    try {
        const res = await sql.query(deleteTaskSqlQuery)
        if (res.rowsAffected[0] === 1) {
            response.status(200).send({ message: 'Task Deleted' });
        } else {
            response.status(400).send({ error: 'Failed to delete task' });
        }
    } catch (error) {
        console.error('Error deleting task:', error);
        response.status(400).send({ error: 'Failed to delete task' });
    }
})

//  API-7 : UPLOAD PDF , GET QUESTIONS
app.post('/upload/questions', upload.single('pdfFile'), async (req, res) => {
    console.log("Received file upload request...");
  
    if (!req.file) {
      console.error('No file uploaded.');
      return res.status(400).send('No file uploaded.');
    }
  
    try {
      
      const tempFilePath = saveBufferToFile(req.file.buffer, req.file.originalname);
      console.log(`Saved uploaded file as temporary file: ${tempFilePath}`);
  
      const uploadResponse = await fileManager.uploadFile(tempFilePath, {
        mimeType: req.file.mimetype,
        displayName: req.file.originalname,
      });
  
      console.log(`File uploaded to GoogleAI File Manager. File name: ${uploadResponse.file.displayName}`);
  
      const getResponse = await fileManager.getFile(uploadResponse.file.name);
      console.log(`Retrieved file metadata from GoogleAI. File URI: ${getResponse.uri}`);

      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
      });
      console.log("Initialized Gemini generative model: gemini-1.5-flash");
  
      console.log("Generating content (questions and answers) from the uploaded PDF...");
      const result = await model.generateContent([
        {
          fileData: {
            mimeType: uploadResponse.file.mimeType,
            fileUri: uploadResponse.file.uri,
          }
        },
        { text: "give some questions with answers for the above pdf in an array of objects with every object containing question and answer" },
      ]);
  
      let generatedContent = result.response.text();
      generatedContent = generatedContent.slice(7, -3)
      generatedContent = JSON.parse(generatedContent)
      console.log(typeof generatedContent);
  
      res.json({ questionsAndAnswers: generatedContent });
      console.log("Response sent to frontend with generated questions and answers");
  
      fs.unlinkSync(tempFilePath);
      console.log(`Deleted temporary file: ${tempFilePath}`);
  
    } catch (error) {
      console.error("Error during file processing:", error.message);
      res.status(500).send('Error generating content from PDF');
    }
});

//  API-8 : UPLOAD PDF , GET MAIN POINTS
app.post('/upload/mainpoints', upload.single('pdfFile'), async (req, res) => {
    console.log('HELLO')
    console.log("Received file upload request...");
  
    if (!req.file) {
      console.error('No file uploaded.');
      return res.status(400).send('No file uploaded.');
    }
  
    try {
      
      const tempFilePath = saveBufferToFile(req.file.buffer, req.file.originalname);
      console.log(`Saved uploaded file as temporary file: ${tempFilePath}`);
  
      const uploadResponse = await fileManager.uploadFile(tempFilePath, {
        mimeType: req.file.mimetype,
        displayName: req.file.originalname,
      });
  
      console.log(`File uploaded to GoogleAI File Manager. File name: ${uploadResponse.file.displayName}`);
  
      const getResponse = await fileManager.getFile(uploadResponse.file.name);
      console.log(`Retrieved file metadata from GoogleAI. File URI: ${getResponse.uri}`);

      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
      });
      console.log("Initialized Gemini generative model: gemini-1.5-flash");
  
      console.log("Generating content (questions and answers) from the uploaded PDF...");
      const result = await model.generateContent([
        {
          fileData: {
            mimeType: uploadResponse.file.mimeType,
            fileUri: uploadResponse.file.uri,
          }
        },
        { text: "give some main points of the pdf, output should be in form array where the elements should be in the string form of the mainpoints, strictly i am saying i need it only in array!!!!" },
      ]);
  
      let generatedContent = result.response.text();
      console.log(generatedContent)
      if(generatedContent[0] !== '[') {
        generatedContent = generatedContent.slice(7, -3)
        generatedContent = JSON.parse(generatedContent)
        res.json({ questionsAndAnswers: generatedContent });
        return
      }
      
      generatedContent = JSON.parse(generatedContent)
      res.json({ questionsAndAnswers: generatedContent });
      console.log("Response sent to frontend with generated questions and answers");
  
      fs.unlinkSync(tempFilePath);
      console.log(`Deleted temporary file: ${tempFilePath}`);
  
    } catch (error) {
      console.error("Error during file processing:", error.message);
      res.status(500).send('Error generating content from PDF');
    }
});

//  API-9 : CHATBOT

app.post('/chatbot', async (req, res) => {
  console.log('Received chatbot request...');
  
  const { userPrompt } = req.body;

  if (!userPrompt) {
      console.error('No user prompt provided.');
      return res.status(400).send('No user prompt provided.');
  }

  try {
      // Initialize the Gemini generative model
      const model = genAI.getGenerativeModel({
          model: "gemini-1.5-flash",
      });
      console.log("Initialized Gemini generative model: gemini-1.5-flash");

      // Generate content (response) from the user prompt
      console.log("Generating content from the user prompt...");
      const result = await mo
      del.generateContent([
          {
              text: userPrompt,
          }
      ]);

      let generatedContent = result.response.text();
      console.log("Generated content:", generatedContent);
      
      function removeSpecialChars(str) {
        return str.replace(/[#\*]/g, '');
      }

      // Send the generated response to the client
      res.json({ chatbotResponse: removeSpecialChars(generatedContent) });
      console.log("Response sent to frontend with chatbot response");

  } catch (error) {
      console.error("Error during chatbot processing:", error.message);
      res.status(500).send('Error generating chatbot response');
  }
});


app.get('/teachers', authenticateToken, async (request, response) => {
  const getSqlQuery = `SELECT * FROM TeachersDetails`
  const teachers = await sql.query(getSqlQuery)
  response.send(teachers)
})

app.post('/yttimestamps/', authenticateToken, async (req, res) => {
  const timeStampsArr = req.body;
  const userDetails = timeStampsArr[0]
  const username = userDetails.username
  const videoUrl = userDetails.videoUrl
  const timestamps = timeStampsArr[1]
  for(let ele of timestamps) {
    const time = ele.time
    const note = ele.note
    const sqlQuery = `INSERT INTO YTtimestamps(username,YT_link,YT_timestamps,YT_notes) VALUES('${username}','${videoUrl}','${time}','${note}')`
    const response = await sql.query(sqlQuery)
  }
});

//  API - 10 - TEACHER REGISTRATION API
// app.post('/register/teacher', async (request,response) => {
//   const {
//     registerName,
//     registerUsername,
//     registerPassword,
//     registerPhoneNumber,
//     registerEmail,
//     registerQualifications,
//     registerDepartment,
//     registerCourse,
//     registerLanguages,
//     registerFees,
//     registerExperience,
//     registerDob,
//     registerGender,
//     registerAge,
//     teacherProfileUrl,
//   } = request.body
//   const userCheckUserQuery = `SELECT * FROM users WHERE user_name = '${registerUsername}'`
//   const user = await sql.query(userCheckUserQuery)
//   if(user.recordset.length !== 0) {
//       response.status(400)
//       response.send('User already exists')
//   } else {
//       // const hashPassword = await bcrypt.hash(registerPassword, 10)
//       const registerUserQuery = `
//       INSERT INTO TeachersDetails (
//         teacher_name,
//         Teacher_username,
//         Teacher_password,
//         teacher_number,
//         teacher_email,
//         qualifications,
//         teacher_department,
//         Course,
//         LanguagesKnown,
//         teacher_experience,
//         Teacher_DOB,
//         teacher_gender,
//         teacher_age,
//         teacher_fees,
//         TeacherProfile
//       ) 
//       VALUES (
//         '${registerName}',
//         '${registerUsername}',
//         '${registerPassword}',
//         '${registerPhoneNumber}',
//         '${registerEmail}',
//         '${registerQualifications}',
//         '${registerDepartment}',
//         '${registerCourse}',
//         '${registerLanguages}',
//         '${registerExperience}',
//         '${registerDob}',
//         '${registerGender}',
//         ${registerAge},
//         '${registerFees}',
//         '${teacherProfileUrl}'
//       )
//     `;
//       await sql.query(registerUserQuery)
//       const payLoad = {username}
//       const jwtToken = jwt.sign(payLoad, 'aditya')
//       response.send({jwtToken})
//   }
// })


// API - 10 - DOUBT ADD

app.post('/doubts/add/', authenticateToken, async (request,response) => {
  const doubt = request.body
  const {id,doubtText,doubtImg,username} = doubt
  const sqlQuery = `INSERT INTO Doubts_Board(doubt_id,doubt_img_url,doubt_description,isSolved,doubt_solution_url,doubt_solution_description,doubt_solved_by) VALUES('${id}','${doubtImg}','${doubtText}','false','nil','nil','nil')`
  const doubtResponse = await sql.query(sqlQuery)
  console.log(doubtResponse)
})

app.get('/doubts', async (request,response) => {
  const sqlQuery = `SELECT * FROM Doubts_Board`
  const dbResponse = await sql.query(sqlQuery)
  console.log(dbResponse.recordset)
  response.send(dbResponse.recordset)
})

app.post('/doubts/solve', async (request,response) => {
  const doubtSol = request.body
  const {doubtText,doubtImg,username,id} = doubtSol
  const sqlQuery = `UPDATE Doubts_Board SET isSolved = 'true',doubt_solution_url = '${doubtImg}',doubt_solution_description = '${doubtText}', doubt_solved_by = '${username}' WHERE doubt_id = '${id}'`
  const dbResponse = await sql.query(sqlQuery)
  console.log(dbResponse)
})

app.post('/doubts/admin/solve', async (request,response) => {
  const doubtSol = request.body
  const {doubtText,doubtImg,username,id} = doubtSol
  const sqlQuery = `INSERT INTO doubts_solution_check (d_id, doubt_solution, doubt_solved_person, doubt_solution_img_url)
    VALUES ('${id}', '${doubtText}', '${username}', '${doubtImg}');`
  const dbResponse = await sql.query(sqlQuery)
  console.log(dbResponse)
})

app.get('/admin/doubts/solution', async (request, response) => {
  const sqlQuery = `SELECT * FROM [dbo].[Doubts_Board] INNER JOIN [dbo].[doubts_solution_check] ON [dbo].[Doubts_Board].doubt_id = [dbo].[doubts_solution_check].d_id;`
  const dbResponse = await sql.query(sqlQuery)
  response.send(dbResponse.recordset)
})

app.get('/leaderboard', async (request,response) => {
  const sqlQuery = `SELECT u.user_name, COUNT(d.doubt_solved_by) AS solved_count FROM users u LEFT JOIN doubts_board d ON u.user_name = d.doubt_solved_by GROUP BY u.user_name;`
  const dbResponse = await sql.query(sqlQuery)
  response.send(dbResponse.recordset)
})

app.get('/timestamps/:username', authenticateToken, async (request, response) => {
  const {username} = request.params
  console.log(username)
  const sqlQuery = `SELECT * FROM YTtimestamps WHERE username = '${username}'`
  const dbResponse = await sql.query(sqlQuery)
  console.log(dbResponse)
  response.send(dbResponse.recordset)
})

app.get('/admin/users/', async (request,response) => {
  const sqlQuery = `SELECT * FROM users`
  const dbResponse = await sql.query(sqlQuery)
  response.send(dbResponse.recordset)
})

app.get('/admin/teachers', async (request, response) => {
  const sqlQuery = `SELECT * FROM TeachersDetails`
  const dbResponse = await sql.query(sqlQuery)
  response.send(dbResponse.recordset)
})

app.delete('/admin/deleteUser/:user_id', async (request, response) => {
  const {user_id} = request.params
  const sqlQuery = `DELETE FROM users WHERE user_id = '${user_id}'`
  const dbResponse = await sql.query(sqlQuery)
  response.send(dbResponse)
})