import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Select,
  MenuItem,
  TextField,
  InputLabel,
  FormControl,
  Typography,
} from "@material-ui/core";

function GradeCalculator() {
  const [courses, setCourses] = useState([]);

  const [totalCredit, setTotalCredit] = useState();
  const [totalAttend, setTotalAttend] = useState();
  const [totalAssign, setTotalAssign] = useState();
  const [totalMidterm, setTotalMideterm] = useState();
  const [totalFinal, setTotalFinal] = useState();
  const [totalOfTotal, setTotalofTotal] = useState();
  const [average, setAverage] = useState();
  const [averageGrade, setAverageGrade] = useState();

  const [visible, setVisible] = useState(false);
  const style30 = {
    width: "30px",
    borderLeft: "1px solid rgba(224, 224, 224, 1)",
    borderRight: "1px solid rgba(224, 224, 224, 1)",
  };

  const style58 = {
    width: "58px",
    borderLeft: "1px solid rgba(224, 224, 224, 1)",
    borderRight: "1px solid rgba(224, 224, 224, 1)",
  };

  const styleHeader = {
    backgroundColor: "#1F2328",
    color: "#FFFFFF",
  };

  const stylelong = {
    borderLeft: "1px solid rgba(224, 224, 224, 1)",
    borderRight: "1px solid rgba(224, 224, 224, 1)",
  };
  const addCourse = () => {
    setCourses([
      ...courses,
      {
        type: "교양",
        essential: "선택",
        name: "",
        credit: 0,
        attendance: 0,
        assignment: 0,
        midterm: 0,
        finalExam: 0,
        totalScore: 0,
        grade: "",
      },
    ]);
  };

  const handleInputChange = (e, index) => {
    var { name, value } = e.target;
    if (value === "Pass" || value === "NonePass") {
      name = "grade";
    }
    const newCourses = [...courses];
    newCourses[index][name] = value;
    newCourses[index].totalScore = CalculateTotal(index);

    if (name !== "grade") {
      newCourses[index].grade = CalculateGrade(newCourses[index].totalScore);
    }
    setCourses(newCourses);
  }; //한 행에서 이뤄지는 값의 변화들을 다루는 함수

  function CalculateTotal(index) {
    var Total =
      Number(courses[index].assignment) +
      Number(courses[index].attendance) +
      Number(courses[index].midterm) +
      Number(courses[index].finalExam);
    return Total;
  } //한 행의 총점을 계산하는 함수

  function CalculateGrade(score) {
    if (score >= 95) {
      return "A+";
    } else if (score >= 90) {
      return "A0";
    } else if (score >= 85) {
      return "B+";
    } else if (score >= 80) {
      return "B0";
    } else if (score >= 75) {
      return "C+";
    } else if (score >= 70) {
      return "C0";
    } else if (score >= 65) {
      return "D+";
    } else if (score >= 60) {
      return "D0";
    } else {
      return "F";
    }
  } //A+ , A, B+ ... 계산하는 함수

  const handleDelete = (index) => {
    const newCourses = [...courses];
    newCourses.splice(index, 1);
    setCourses(newCourses);
  };

  const OnClickSave = () => {
    setVisible(true);
    CheckError(courses);
    sortCourses();
  };

  const sortCourses = () => {
    const sortedArray = [...courses].sort((a, b) => {
      if (a.type < b.type) return -1;
      if (a.type > b.type) return 1;
      if (a.essential < b.essential) return -1;
      if (a.essential > b.essential) return 1;
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
    setCourses(sortedArray);
  };
  useEffect(() => {
    var credit = 0;
    var attend = 0;
    var assign = 0;
    var midterm = 0;
    var final = 0;
    var total = 0;
    var cnt = 0;
    for (let i = 0; i < courses.length; i++) {
      if (courses[i].grade === "Pass") {
        credit++;
      }
      if (Number(courses[i].totalScore) > 59) {
        cnt++;
        credit += Number(courses[i].credit);
        attend += Number(courses[i].attendance);
        assign += Number(courses[i].assignment);
        midterm += Number(courses[i].midterm);
        final += Number(courses[i].finalExam);
        total += Number(courses[i].totalScore);
      }
    }
    setTotalCredit(credit);
    setTotalAttend(attend);
    setTotalAssign(assign);
    setTotalMideterm(midterm);
    setTotalFinal(final);
    setTotalofTotal(total);
    setAverage(total / cnt);
    setAverageGrade(CalculateGrade(total / cnt));
  }, [courses]); // 저장 버튼을 누를시 보여질 항목들

  return (
    <div style={{ margin: "50px 50px 0px 50px" }}>
      <div style={{ float: "left" }}>
        <Typography variant="h4" gutterBottom>
          1학년
        </Typography>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginLeft: "75%",
          marginRight: "4%",
        }}
      >
        <Button variant="contained" color="default" onClick={addCourse}>
          추가
        </Button>
        <Button
          variant="contained"
          color="default"
          onClick={() => handleDelete(courses.length - 1)}
        >
          삭제
        </Button>
        <Button variant="contained" color="default" onClick={OnClickSave}>
          저장
        </Button>
      </div>
      <div style={{ width: "90%", margin: "0% 5% 0% 5%" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" style={styleHeader}>
                이수
              </TableCell>
              <TableCell align="center" style={styleHeader}>
                필수
              </TableCell>
              <TableCell align="center" style={styleHeader}>
                과목명
              </TableCell>
              <TableCell align="center" style={styleHeader}>
                학점
              </TableCell>
              <TableCell align="center" style={styleHeader}>
                출석점수
              </TableCell>
              <TableCell align="center" style={styleHeader}>
                과제점수
              </TableCell>
              <TableCell align="center" style={styleHeader}>
                중간고사
              </TableCell>
              <TableCell align="center" style={styleHeader}>
                기말고사
              </TableCell>
              <TableCell align="center" style={styleHeader}>
                총점
              </TableCell>
              <TableCell align="center" style={styleHeader}>
                평균
              </TableCell>
              <TableCell align="center" style={styleHeader}>
                성적
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course, index) => (
              <TableRow
                key={index}
                style={
                  index % 2 === 0
                    ? {
                        backgroundColor: "#F6F8FA",
                      }
                    : { backgroundColor: "#EBEDF0" }
                }
              >
                <TableCell align="center" style={style30}>
                  <FormControl>
                    <InputLabel>이수</InputLabel>
                    <Select
                      name="type"
                      value={course.type}
                      onChange={(e) => handleInputChange(e, index)}
                    >
                      <MenuItem value="교양">교양</MenuItem>
                      <MenuItem value="전공">전공</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell align="center" style={style30}>
                  <FormControl>
                    <InputLabel>필수</InputLabel>
                    <Select
                      name="essential"
                      value={course.essential}
                      onChange={(e) => handleInputChange(e, index)}
                    >
                      <MenuItem value="필수">필수</MenuItem>
                      <MenuItem value="선택">선택</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell align="center" style={stylelong}>
                  <TextField
                    inputProps={{ style: { textAlign: "center" } }}
                    name="name"
                    value={course.name}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                </TableCell>
                <TableCell align="center" style={style30}>
                  <TextField
                    inputProps={{ style: { textAlign: "center" } }}
                    name="credit"
                    value={course.credit}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                </TableCell>
                <TableCell
                  align="center"
                  style={course.credit === "1" ? { width: "58px" } : style58}
                >
                  {course.credit === "1" ? (
                    <div></div>
                  ) : (
                    <TextField
                      inputProps={{ style: { textAlign: "center" } }}
                      name="attendance"
                      value={course.attendance}
                      onChange={(e) => handleInputChange(e, index)}
                    />
                  )}
                </TableCell>
                <TableCell
                  style={course.credit === "1" ? { width: "58px" } : style58}
                >
                  {course.credit === "1" ? (
                    <div></div>
                  ) : (
                    <div>
                      <TextField
                        inputProps={{ style: { textAlign: "center" } }}
                        name="assignment"
                        value={course.assignment}
                        onChange={(e) => handleInputChange(e, index)}
                      />
                    </div>
                  )}
                </TableCell>
                <TableCell
                  align="center"
                  style={course.credit === "1" ? { width: "58px" } : style58}
                >
                  {course.credit === "1" ? (
                    <div></div>
                  ) : (
                    <div>
                      <TextField
                        inputProps={{ style: { textAlign: "center" } }}
                        name="midterm"
                        value={course.midterm}
                        onChange={(e) => handleInputChange(e, index)}
                      />
                    </div>
                  )}
                </TableCell>
                <TableCell
                  align="center"
                  style={course.credit === "1" ? { width: "58px" } : style58}
                >
                  {course.credit === "1" ? (
                    <div></div>
                  ) : (
                    <div>
                      <TextField
                        inputProps={{ style: { textAlign: "center" } }}
                        name="finalExam"
                        value={course.finalExam}
                        onChange={(e) => handleInputChange(e, index)}
                      />
                    </div>
                  )}
                </TableCell>
                <TableCell align="center" style={style30}>
                  {course.credit === "1" ? (
                    <div></div>
                  ) : (
                    <div>{visible ? course.totalScore : ""}</div>
                  )}
                </TableCell>
                <TableCell align="center" style={{ width: "58px" }}></TableCell>
                <TableCell align="center" style={{ width: "58px" }}>
                  {course.credit === "1" ? (
                    <Select
                      onChange={(e) => {
                        handleInputChange(e, index);
                      }}
                    >
                      <MenuItem value="Pass">Pass</MenuItem>
                      <MenuItem value="NonePass">None Pass</MenuItem>
                    </Select>
                  ) : visible ? (
                    course.grade
                  ) : (
                    ""
                  )}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell align="center" colSpan={3}>
                합계
              </TableCell>
              <TableCell align="center">{visible ? totalCredit : ""}</TableCell>
              <TableCell align="center">{visible ? totalAttend : ""}</TableCell>
              <TableCell align="center">{visible ? totalAssign : ""}</TableCell>
              <TableCell align="center">
                {visible ? totalMidterm : ""}
              </TableCell>
              <TableCell align="center">{visible ? totalFinal : ""}</TableCell>
              <TableCell align="center">
                {visible ? totalOfTotal : ""}
              </TableCell>
              <TableCell align="center">{visible ? average : ""}</TableCell>
              <TableCell align="center">
                {visible ? averageGrade : ""}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

const CheckError = (target) => {
  /*checklist
    1. 과목명(name)이 겹치는지
    2. 입력 항목이 비어있는 곳이 있는지
    3. 출석점수, 과제점수가 0보다 작거나 20점을 넘기는지
    4. 학점이 0보다 작은지
    5. 과목별 총점이 0보다 작거나 100보다 큰지.
  */
  console.log(target);
}

export default GradeCalculator;
