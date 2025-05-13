import {
    TeacherListItem,
    TeacherName,
    TeacherCardHeader,
    TeacherProfileImg,
    TeachersDetailsSubCard,
    TeachersSubDetailsP,
    TeachersDetailsHalf,
    TeacherHrLine,
    TeacherDetailsFooter,
    TeacherGetBtn,
} from './styledComponents.js'

const TeacherCard = props => {
    const {teacherObj} = props
    console.log(teacherObj)
    const {teacher_name,teacher_age, teacher_gender, TeacherProfile,qualifications, teacher_email, teacher_department, teacher_experience, LanguagesKnown,teacher_fees, Course} = teacherObj
    return (
        <TeacherListItem>
            <TeacherCardHeader>
                <TeacherName> {teacher_name} </TeacherName>
                <TeacherProfileImg src={TeacherProfile} alt="Teacher Profile" />
            </TeacherCardHeader>
            <TeachersDetailsSubCard>
                <TeachersDetailsHalf>
                    <TeachersSubDetailsP> Age : {teacher_age} </TeachersSubDetailsP>
                    <TeachersSubDetailsP> Gender : {teacher_gender} </TeachersSubDetailsP>
                    <TeachersSubDetailsP> Email : {teacher_email} </TeachersSubDetailsP>
                    <TeachersSubDetailsP> Languages Known : {LanguagesKnown} </TeachersSubDetailsP>
                </TeachersDetailsHalf>
                <TeachersDetailsHalf>
                    <TeachersSubDetailsP> Department : {teacher_department} </TeachersSubDetailsP>
                    <TeachersSubDetailsP> Qualification : {qualifications} </TeachersSubDetailsP>
                    <TeachersSubDetailsP> Experience : {teacher_experience} Years</TeachersSubDetailsP>
                    <TeachersSubDetailsP> Course : {Course} </TeachersSubDetailsP>
                </TeachersDetailsHalf>
            </TeachersDetailsSubCard>
            <TeacherHrLine />
            <TeacherDetailsFooter>
                <TeachersSubDetailsP> Price : {teacher_fees}/- </TeachersSubDetailsP>
                <TeacherGetBtn> Get Course </TeacherGetBtn>
            </TeacherDetailsFooter>
        </TeacherListItem>
    )
}

export default TeacherCard