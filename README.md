
# Learning Portal Application




[![version](https://img.shields.io/badge/version-1.0-green)]()
## Table of contents
* [Description](#description)
* [Features](#features)
* [Demo](#demo)
* [Screenshots](#screenshots)
* [Technologies](#technologies)
* [Links](#links)

## Description 
Welcome to our learning portal! Our platform is designed to provide a comprehensive learning experience for both Students and Admins. With our easy-to-use interface, Admins can add educational content such as videos, quizzes, and assignments. Students can then access this content and submit their work for assessment. Our platform allows for dynamic calculation of quiz results, while the Admins can mark the assignments and provide feedback. Students can view their progress on the Leaderboard, where they can see their own and other Students' marks. We strive to provide a collaborative and engaging learning environment that encourages growth and development.

This learning portal has two types of users: Students and Admins. The Admin can add videos, create quizzes, and create assignments. Students can view the videos, submit quizzes, and assignments. The quizzes are dynamically calculated as correct or incorrect, while the Admin marks the assignments and the marks are displayed on the Dashboard. The Students can see their own and other Students' marks for the assignments on the Leaderboard.

## Features


* Student can Login and Registration on learning portal. There is no registration for Admin because admin already created by super admin. Admin have only login page.

* There is separate pages on the admin Dashboard for Videos, Assignments, Quizzes, and Assignment marks. 

#### Video page on the Dashboard:
    -Previously added videos will be displayed in a list format.
    -Each video will have a delete and edit button.
    -Clicking on the "Add Video" button will take you to a pop-up or another page where you will need to collect the video's information. Please note that we do not provide an interface for "Add Video". You will need to create it yourself.

#### Assignment page on the Dashboard:
    -If there are created assignments, it will be displayed in the list; otherwise, it will show as empty.
    -Clicking on "Add Assignment" will create assignment. And there is  an additional field where the option to select which video the assignment will be based on. 

* On the Quizzes page, it shows list of quizzes and can add new quizzes. When adding a quiz,  need to select which video the quiz belongs to.

* On the AssignmentMark page, admin can view the data of the assignments student submitted in a table. In the first column of the table, there will be a Mark Input field. Clicking the green checkmark next to it will update the mark and show how many marks were earned.

* At the top of the table, there are three badges. The first badge shows the total number of assignments, the second shows how many are pending for marking, and the third shows how many have been marked as sent.

* After student logging in, they will be taken to the Course Player page.

* The videos added from the Admin dashboard should be displayed on the right side playlist. Clicking on a video in the list should play that particular video.

* If there is an assignment in the selected video, then the assignment button will be shown.
    * Clicking on the assignment button will open a modal.
    * Once a student submits an assignment, they will not be able to do it again later.

* A "Take Quiz" button will be provided similar to Assignment, which will take the student to the quiz page where they can see the quizzes related to that video.
    * Once a student submits a quiz, it will be calculated and shown on the leaderboard. The student's score will also be shown on the leaderboard.
    * A student can only submit a quiz once and won't be able to submit it again in the future.

* When click on the Leaderboard, the logged-in user will be able to see their own results and the results of the top 20 performers. 
## Demo


[![Live Preview](https://img.shields.io/badge/Live%20Preview-g?style=for-the-badge&logoColor=white)](https://final-quiz-app-tar.netlify.app/)



## Screenshots
#### Admin Dashboard
![Dashboard](https://res.cloudinary.com/dzia9ksjr/image/upload/v1683017515/learning-portal/admin_dashboard_ynynyy.png)
#### Videos page
![Videos](https://res.cloudinary.com/dzia9ksjr/image/upload/v1683017515/learning-portal/videos_alwm3u.png)
#### Assignment page
![Assignment](https://res.cloudinary.com/dzia9ksjr/image/upload/v1683017515/learning-portal/assignments_zqalgr.png)
#### Quiz page
![Quiz](https://res.cloudinary.com/dzia9ksjr/image/upload/v1683017514/learning-portal/quizes_nshflk.png)
#### Assignment Mark page
![AssignmentMark](https://res.cloudinary.com/dzia9ksjr/image/upload/v1683017515/learning-portal/assingnmentMarks_ctht6u.png)
#### Student home page
![home](https://res.cloudinary.com/dzia9ksjr/image/upload/v1683017516/learning-portal/student_home_urrt1h.png)
#### Assignment submission
![Assignmentsubmission](https://res.cloudinary.com/dzia9ksjr/image/upload/v1683017514/learning-portal/assignmentsubmission_o2luml.png)
#### Quiz submission
![quizsubmission](https://res.cloudinary.com/dzia9ksjr/image/upload/v1683017514/learning-portal/quizeSubmission_xlwthp.png)
#### Leaderboard
![Leaderboard](https://res.cloudinary.com/dzia9ksjr/image/upload/v1683017514/learning-portal/leaderboard_cxy3zr.png)
## Technologies

**Client:** HTML, CSS, React, Redux, React-redux, RTK Query

**Server:** Nodejs, Expressjs, JSON Server, json-auth



## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://toukirraju.github.io/portfolio/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/toukir-raju)
[![facebook](https://img.shields.io/badge/facebook-1DA1F2?style=for-the-badge&logo=facebook&logoColor=white)](https://www.facebook.com/toukirraju007/)


![Logo](https://res.cloudinary.com/dzia9ksjr/image/upload/v1679146813/Scoreboard%20app/Logos/TR_aozmc6.png)


## Feedback

If you have any feedback, please reach out to us at toukirraju@gmail.com

