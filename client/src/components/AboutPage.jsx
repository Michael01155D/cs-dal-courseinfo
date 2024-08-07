import '../styles/AboutPage.css';

const AboutPage = () => {
    return(
        <div id='aboutPageContainer'>
            <header>
                <h2>About</h2>
            </header>
            <main>
                <p>The CS Dal Course Repository is a personal project, <strong><em>completely unaffiliated with Dalhousie University. </em></strong>
                My goal for creating this website, besides practicing web development, is to offer a resource for students by offering relevant course information, including peer comments, in one organized location.
                Please be aware that the content of this website can (and will) become outdated. The official Dal website should always be used to obtain the correct information.</p>
                <p id='finalDisclaimer'>This website should never be used as the basis upon which to make any academic decisions.</p>
            </main>
        </div>
    )
}

export default AboutPage;