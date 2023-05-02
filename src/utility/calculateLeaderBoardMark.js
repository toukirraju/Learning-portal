/// calculate all student's marks
export const calculateLeaderBoardMarks = (quiz, assignmnet) => {
  const studentMarks = {};

  // Calculate quiz marks
  for (const q of quiz) {
    const { student_id, student_name, mark } = q;
    if (!(student_id in studentMarks)) {
      studentMarks[student_id] = {
        student_id,
        student_name,
        assignmentMark: 0,
        quizMark: 0,
      };
    }
    studentMarks[student_id].quizMark += mark ? mark : 0;
  }

  // Calculate assignment marks
  for (const a of assignmnet) {
    const { student_id, student_name, mark } = a;
    if (!(student_id in studentMarks)) {
      studentMarks[student_id] = {
        student_id,
        student_name,
        assignmentMark: 0,
        quizMark: 0,
      };
    }
    studentMarks[student_id].assignmentMark += mark ? parseInt(mark) : 0;
  }

  // Calculate total marks and rank
  const sortedMarks = Object.values(studentMarks).sort(
    (a, b) => b.quizMark + b.assignmentMark - (a.quizMark + a.assignmentMark)
  );
  let rank = 1;
  for (let i = 0; i < sortedMarks.length; i++) {
    const current = sortedMarks[i];
    const prev = sortedMarks[i - 1];
    if (
      i > 0 &&
      current.quizMark + current.assignmentMark <
        prev.quizMark + prev.assignmentMark
    ) {
      rank++;
    }
    current.total = current.quizMark + current.assignmentMark;
    current.rank = rank;
  }

  return sortedMarks;
};
