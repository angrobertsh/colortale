## Seraphic Fate/Dreaded Radius

### Background

Seraphic Fate is a storytelling webpage where users will input short story fragments into a visual interface and from it will come a picture. Using an academically sourced lexicon, lines of different colors and lengths will be drawn between different fragments inside a canvas so that users will have a unique piece of art to show the emotional flow of their story.

The story content processing will be done by <a href="http://saifmohammad.com/WebPages/NRC-Emotion-Lexicon.htm">Mohammad Saif's crowdsourced lexicon</a>, and pictures will be drawn using <a href="https://github.com/evdel720/watercolor">Jangmi Jo's Water Colors API</a>.

### Functionality & MVP

In this page, users will be able to

- [ ] Input short story fragments,
- [ ] Submit them to be processed by the NLP lexicon,
- [ ] Watch them be placed on the canvas and a water color line be drawn between the points,
- [ ] Be able to read their story fragments if they click on the minified fragments,

### Wireframes

![wireframes](https://github.com/angrobertsh/seraph_dread/blob/master/docs/wireframes/radius_wf.png)

### Technologies & Technical Challenges

This is an entirely front-end JavaScript, HTML, and CSS project with no extended database storage for older story fragments. Putting together the lexicon and the water colors API, there will be two components -- the lexicon processing logic, and the canvas and display logic. There will be a single HTML display page, with minor CSS to maintain a stable layout compatible with the movement of the story fragments and the fixed size canvas.

The primary technical challenges will be:

- Reading and understanding the water colors API and seeing what extendable parts of it are most relevant
- Generating gradient colors and figuring out if and how compatible they would be in this framework
- Finding algorithms to prevent unsightly edge cases (moving a fragment only a tiny bit away, or having the canvas become too populated)
- Creating usable transitions that take sizing, positioning, and visibility into account

### Implementation Timeline

**Day 1**: Read read read read and experiment. By the end of the day, I will have the following:

- The ability to create and save paths on the watercolor canvas

**Day 2**: Experiment on the experimenting, especially in regards to extending the colors made available through jscolor and how I can incorporate and extend that. By the end of the day, I will have the following:

- The ability to have a gradient brush

**Day 3**: Create the front-end with text area inputs with the lexicon logic applied to them.  By the end of the day I will have the following:

- HTML elements that take user input and generate data from them.

**Day 4**: Positioning, transitioning, polishing. By the end of the day I will have:

- Fully implemented the placing a the text areas and divs and the processing, and I will fine-tune their placement and the page layout.

**Day 5**: Catching unintended interactions and bugs. By the end of the day I will have:

- Fixed edge cases with unsightly text placement, polished transitions and worked on the UI.
