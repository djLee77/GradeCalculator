import React, { useState } from "react";
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

function isPassSubject(grade) {
  if (grade === "1") {
    return (
      <Select
        onChange={(e) => {
          /* 값을 변경하는 로직 */
        }}
      >
        <MenuItem value="Pass">P</MenuItem>
        <MenuItem value="NonPass">N</MenuItem>
      </Select>
    );
  } else {
    return <TextField></TextField>;
  }
}

function GradeCalculator2() {
  const [courses, setCourses] = useState([]);
  const style30 = {
    width: "30px",
    borderLeft: "1px solid rgba(224, 224, 224, 1)",
    borderRight: "1px solid rgba(224, 224, 224, 1)",
  };

  const style58 = {
    width: "58px",
    borderLeft: "1px solid rgba(224, 224, 224, 1)",
    borderRight: "1px solid rgba(224, 224, 224, 1)",
    //backgroundColor: "#F6F8FA #D9F1FC",
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
        isu: "교양",
        pil: "선택",
        name: "",
        grade: 0,
        attendance: 0,
        assignment: 0,
        midterm: 0,
        finalExam: 0,
      },
    ]);
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const newCourses = [...courses];
    newCourses[index][name] = value;
    setCourses(newCourses);
    console.log(courses);
  };

  const handleDelete = (index) => {
    const newCourses = [...courses];
    newCourses.splice(index, 1);
    setCourses(newCourses);
  };

  return (
    <div style={{ margin: "50px 50px 0px 50px" }}>
      <div style={{ float: "left" }}>
        <Typography variant="h4" gutterBottom>
          2학년
        </Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "space-around",marginLeft: "75%", marginRight: "4%" }}>
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
        <Button variant="contained" color="default">
          저장
        </Button>
      </div>
      <div style={{ width: "90%", margin: "0% 5% 0% 5%" }}>
        <Table>
          <TableHead>
            <TableRow>
              {/* 테이블 헤더 작성 */}
              <TableCell style={styleHeader}>이수</TableCell>
              <TableCell style={styleHeader}>필수</TableCell>
              <TableCell style={styleHeader}>과목명</TableCell>
              <TableCell style={styleHeader}>학점</TableCell>
              <TableCell style={styleHeader}>출석점수</TableCell>
              <TableCell style={styleHeader}>과제점수</TableCell>
              <TableCell style={styleHeader}>중간고사</TableCell>
              <TableCell style={styleHeader}>기말고사</TableCell>
              <TableCell style={styleHeader}>총점</TableCell>
              <TableCell style={styleHeader}>평균</TableCell>
              <TableCell style={styleHeader}>성적</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course, index) => (
              <TableRow
                key={index}
                style={index%2 === 0 ?{
                  backgroundColor: "#F6F8FA",
                }: {backgroundColor: "#EBEDF0",}}
              >
                <TableCell style={style30}>
                  <FormControl>
                    <InputLabel>이수</InputLabel>
                    <Select
                      name="isu"
                      value={course.isu}
                      onChange={(e) => handleInputChange(e, index)}
                    >
                      <MenuItem value="교양">교양</MenuItem>
                      <MenuItem value="전공">전공</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell style={style30}>
                  <FormControl>
                    <InputLabel>필수</InputLabel>
                    <Select
                      name="pil"
                      value={course.pil}
                      onChange={(e) => handleInputChange(e, index)}
                    >
                      <MenuItem value="필수">필수</MenuItem>
                      <MenuItem value="선택">선택</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell style={stylelong}>
                  <TextField
                    name="name"
                    value={course.name}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                </TableCell>
                <TableCell style={style30}>
                  <TextField
                    name="grade"
                    value={course.grade}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                </TableCell>
                <TableCell
                  style={course.grade === "1" ? { width: "58px" } : style58}
                >
                  {course.grade === "1" ? (
                    <div></div>
                  ) : (
                    <TextField
                      name="attendance"
                      value={course.attendance}
                      onChange={(e) => handleInputChange(e, index)}
                    />
                  )}
                </TableCell>
                <TableCell
                  style={course.grade === "1" ? { width: "58px" } : style58}
                >
                  {course.grade === "1" ? (
                    <div></div>
                  ) : (
                    <div>
                      <TextField
                        name="assignment"
                        value={course.assignment}
                        onChange={(e) => handleInputChange(e, index)}
                      />
                    </div>
                  )}
                </TableCell>
                <TableCell
                  style={course.grade === "1" ? { width: "58px" } : style58}
                >
                  {course.grade === "1" ? (
                    <div></div>
                  ) : (
                    <div>
                      <TextField
                        name="midterm"
                        value={course.midterm}
                        onChange={(e) => handleInputChange(e, index)}
                      />
                    </div>
                  )}
                </TableCell>
                <TableCell
                  style={course.grade === "1" ? { width: "58px" } : style58}
                >
                  {course.grade === "1" ? (
                    <div></div>
                  ) : (
                    <div>
                      <TextField
                        name="finalExam"
                        value={course.finalExam}
                        onChange={(e) => handleInputChange(e, index)}
                      />
                    </div>
                  )}
                </TableCell>
                <TableCell style={style30}>총점</TableCell>
                <TableCell style={{ width: "58px" }}></TableCell>
                <TableCell style={{ width: "58px" }}>
                  {isPassSubject(course.grade)}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={3}>합계</TableCell>
              <TableCell>학점 총합</TableCell>
              <TableCell>출석 총합</TableCell>
              <TableCell>과제 총합</TableCell>
              <TableCell>중간 총합</TableCell>
              <TableCell>기말 총합</TableCell>
              <TableCell>총점 총합</TableCell>
              <TableCell>평균</TableCell>
              <TableCell>평균 성적</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default GradeCalculator2;
