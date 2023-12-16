# commission.ME
<!-- update the netlify badge above with your own badge that you can find at netlify under settings/general#status-badges -->
AI generated art is becoming more commonplace everywhere, leaving the human artists whose work the AI imitates to worry about their future professional viability. commission.ME is an app designed to help increase visibility of working artists over AI, promote the work they create, and increase the likelihood of obtaining paid commissions. It does this by allowing the artist to create a profile page with info about the style they specialize in, typical rates, experience, then post examples of their artwork to that profile. Users interested in the artist's work can then simply click a button to open an email to the artist to have work commissioned for them or their business.


## Get Started
function Home() {
  const { user } = useAuth();

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <h1>Hello {user.displayName}! </h1>
      <Image src={logo} />
      <p>Click <Link href="/profile/new"><u>here</u></Link> if this is your first visit, or if you have not created a profile!</p>
      <p>Otherwise click a link above or <Button variant="dark" onClick={signOut}>Sign Out</Button> !</p>
    </div>
  );
}

## About the User <!-- This is a scaled down user persona -->
- The ideal users for this app are artists, and customers looking for artists to commission work from.
- The artist user has an interest in broadening the reach of his work, and generating interest in their work from potential customers.
- The customer user has interest in commissioning a piece, or multiple pieces, of art, either for personal enjoyment or for business purposes.
- The problem this app solves is that it creates a place for artists to promote their work, increasing the likelihood of commissioning paid work. It also gives potential customers a place to peruse different artists with different styles, allowing them to choose what is right for them or their business.

## Features <!-- List your app features using bullets! Do NOT use a paragraph. No one will read that! -->
- When a new user visits, they are invited to create a profile.
- The profile they create contains information about rates, styles, experienc, and the artist themself.
- The user can create posts on their profile that show off their artwork.
- Users can create private posts on their profiles that only they can view.
- The users can edit and delete their posts and profiles at any time.
- Customer users can click the 'Commission Me' button to email a chosen artist for commission work.
- Users can search artists by name, rate range, and specialty style to find exactly what they're seeking with minimal work.

## Instructions
To clone repo, visit https://github.com/B33blebroxx/commission.ME/, click the code dropdown, and copy the SSH link.
Then open the terminal in Visual Studio Code and type "git clone" and paste the link you copied.
Once it has cloned, type 'npm start' into the terminal, and once the packages install, type 'npm run dev' and press enter.
Then open your browser and type 'localhost:3000' into the address bar and hit enter.

## Video Walkthrough of commission.ME
https://www.loom.com/share/bab5b44a3bda484a98cb986865969f28

## Wireframes & ERD
<img alt="Wireframe" src="/images/MVP-Wireframe-FlowChart.png">
<img alt="Wireframe-Stretch" src="/images/Stretch-FlowChart-Wireframe.png">
<img alt="ERD" src="/images/ERD.png">

## Contributors
- [Brandon Schnurbusch](https://github.com/B33blebroxx)
