import Navbar from '../../components/Navbar';
import AddButton from '../../components/AddButton';
import SideNavbar from '../../components/SideNavbar';
import ContentNavbar from '../../components/ContentNavbar';
import Task from '../../components/Task';

interface SectionsProps {}

export default function Sections({}: SectionsProps) {
    return (
        <>
            <Navbar background="True">
                <li>
                <a href="/">Home</a>
                </li>
            </Navbar>

            <SideNavbar />

            <ContentNavbar
            header= {
            <h1 color="#000">Sections</h1>
            }>
                <div>
                    <AddButton svg={<img src="https://img.icons8.com/ios-glyphs/30/null/plus-math.png"/>}>
                        Add Section
                    </AddButton>
                    <Task 
                        name= "Section 1"
                        description= "This is a section"
                    />
                </div>
            </ContentNavbar>
        </>
    );
};