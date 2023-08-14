import Info from '../Info';
import CampParticipantTable from '../CampParticipantTable';
import PreFileReport from '../PreFileReport';
import PostFileReport from '../PostFileReport';
import PostReport from '../PostReport';

const Participants = () => {
    return <CampParticipantTable />;
};
export const CampTab = {
    Info,
    Participants,
    PreFileReport,
    PostFileReport,
    PostReport,
};

export default CampTab;
