import {
    ProgramForm,
    ManagerForm,
    TargetForm,
    LearningTimeForm,
} from './TeacherApplyForm';
import { StudentProgramForm, ApplyForm } from './StudentApplyForm';

export const TeacherTypeCamp = {
    title: '방문형(선생님) 프로그램 신청하기',
    contents: ({ program, userData }) => (
        <>
            <ProgramForm />
            <ManagerForm userId={userData.id} />
            <TargetForm programTargetGroup={program.targetGroup} />
            <LearningTimeForm educationDate={program.educationDate} />
        </>
    ),
};

export const StudentTypeCamp = {
    title: '집합형(학생) 프로그램 신청하기',
    contents: ({ program, userData }) => (
        <>
            <StudentProgramForm />
            <ApplyForm
                programTargetGroup={program.targetGroup}
                userId={userData.id}
            />
        </>
    ),
};
