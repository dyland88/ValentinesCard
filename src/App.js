import { useState } from 'react';
import confetti from 'canvas-confetti';
import heartBackground from './images/hearts.jpg';
import vineBoom from './audio/vine_boom.mp3';
import yippee from './audio/yippee.mp3';
import ahh from './audio/ahh.mp3';


const noPhrases = ['no', 'pleaseee', 'I hate puppies', 'I am picking the wrong choice', 'whyyyyyyy', 'This is your LAST CHANCE', 'FR FR you better not do it this time']
const yesPhrases = ['yes', 'YES', 'YES!!!', 'PICK THIS ONE!!!', 'why u no click me :(', 'yes 🥺', "OF COURSE!!!"]

function App() {


  // Called when the "No" button is clicked
  const onNoClick = () => {
    const audioFiles = [vineBoom, ahh];
    const randomAudioIndex = Math.floor(Math.random() * audioFiles.length);
    new Audio(audioFiles[randomAudioIndex]).play();
    
    handleMouseOver();
    setPhraseIndex(phraseIndex + 1);
    setNoButtonStyle({
      ...noButtonStyle,
      fontSize: `${20 - 2 * phraseIndex}px`
    });
  }

  const [phraseIndex, setPhraseIndex] = useState(0);
  const [noButtonStyle, setNoButtonStyle] = useState({fontSize: `${20 - 2 * phraseIndex}px`});
  const [yesButtonPressed, setYesButtonPressed] = useState(false);

  const [showNo, setShowNo] = useState(true);
  const [imageSrc, setImageSrc] = useState('https://media1.tenor.com/m/HzAhXPf2YOEAAAAC/milk-and-mocha.gif');


  // Moves the button when when mouseover
    const handleMouseOver = (e) => {

      //if (phraseIndex <= 1 || phraseIndex === noPhrases.length - 1) return;
      if (phraseIndex <= 1) return;

      // generates a random value between min and max, ensuring that the value is at least minAbs
      const generateRandom = (min, max, minAbs) => {
        let num = Math.random() * (max - min) + min;

        // Ensure that the abs value is at least minAbs
        if (Math.abs(num) < minAbs) {
          num = num < 0 ? minAbs : minAbs;
        }
        return num;
      }

    // Generate random positions within a range for the button to move to
    const moveX = generateRandom(-100, 100, (phraseIndex * 10) + 20);
    const moveY = generateRandom(-100, 100, (phraseIndex * 10) + 20);
    // Set the button to move to the new position
    setNoButtonStyle({
      ...noButtonStyle,
      transform: `translate(${moveX}px, ${moveY}px)`,
      transition: 'transform 0.3s ease-in-out',

    });
  }

  const onYesClick = () => {
    new Audio(yippee).play();
    setYesButtonPressed(true);
    launchConfetti();
    setShowNo(false);
    setImageSrc('https://media1.tenor.com/m/wbntPv9hoXoAAAAC/cuddle-panda.gif')
  }
  const launchConfetti = () => {
    
    confetti({
      particleCount: 200,
      spread: 90,
      origin: { y: 0.6 }
    });
    
  }

  return (
    <main className="w-screen h-screen overflow-hidden flex justify-center items-center bg-white-100"
    style={{ backgroundImage: `${yesButtonPressed ? `url(${heartBackground})` : 'none'}` }}>
      {/* This div centers the content horizontally */}
     
      <div>
        <div className="flex justify-center pb-10">
          <img 
            src={imageSrc}
            alt="PLEASEEE"
            style={{ width: 'auto', height: '300px'}}/>
        </div>
        
        <div className="text-center">
            <div className="rounded-full bg-white">
            <h1 className="text-3xl font-bold rounded-xl bg-red-300 px-5 py-4">
              <div>
                {yesButtonPressed ? "I love you!!💖💖💖" : "Will you be my valentine?"}
              </div>
            </h1>
          </div>

          <div class="flex justify-center space-x-4 mt-8">
            {/*Yes button*/}
            {/*Sets the button size to increase over time or be 100 if yesButton is pressed*/}
            <button
            
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700 transition duration 300"
            style={{ fontSize: `${( yesButtonPressed ? 150 : (phraseIndex + 1.5) * 15)}px`}}
            onClick={onYesClick}>
              {yesButtonPressed ? "YIPPEE" : yesPhrases[phraseIndex % (yesPhrases.length)]}
            </button>

            {/*No button*/}
            {showNo && <div className="flex justify-center items-center text-center">
              <button
              onClick={onNoClick}
              style={noButtonStyle}
              onMouseOver={handleMouseOver}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition duration 300"
              >
                {/*Sets the no button text to the according entry in noPhrases*/}
                {noPhrases[phraseIndex % (noPhrases.length)]}
                </button>
              
              </div>}
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
