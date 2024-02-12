import { useState } from 'react';
import confetti from 'canvas-confetti';

import heartBackground from './images/hearts.jpg';
import raccoonHeart from './images/raccoon_heart.jpg';
import toothlessDancing from './images/toothless_dancing.gif';

import vineBoom from './audio/vine_boom.mp3';
import yippee from './audio/yippee.mp3';
import ahh from './audio/ahh.mp3';
import chipichipi from './audio/chipichipi.mp3';
import toothlessAudio from './audio/toothlessAudio.mp3';
import bruh from './audio/bruh.mp3';



const noPhrases = ['no', 'pleaseee', 'I hate puppies', 'I am picking the wrong choice', 'whyyyyyyy', 'This is your LAST CHANCE', 'FR FR you better not do it this time']
const yesPhrases = ['yes', 'YES', 'YES!!!', 'PICK THIS ONE!!!', 'why u no click me :(', 'yes 🥺', "OF COURSE!!!"]

function App() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [noButtonStyle, setNoButtonStyle] = useState({fontSize: `${20 - 2 * phraseIndex}px`});
  const [yesButtonPressed, setYesButtonPressed] = useState(false);

  const [showNo, setShowNo] = useState(true);
  const [imageSrc, setImageSrc] = useState(raccoonHeart);


  // Called when the "No" button is clicked
  const onNoClick = () => {
    const audioFiles = [vineBoom, ahh, bruh];
    const randomAudioIndex = Math.floor(Math.random() * audioFiles.length);
    new Audio(audioFiles[randomAudioIndex]).play();
    
    handleMouseOver();
    setPhraseIndex(phraseIndex + 1);
    setNoButtonStyle({
      ...noButtonStyle,
      fontSize: `${20 - 2 * phraseIndex}px`
    });
  }

  const onYesClick = () => {
    new Audio(yippee).play();
    if(!yesButtonPressed){
      setTimeout(()=>{new Audio(chipichipi).play();}, 1500);
    }
    
    setYesButtonPressed(true);
    launchConfetti();
    setShowNo(false);
    setImageSrc('https://media1.tenor.com/m/wbntPv9hoXoAAAAC/cuddle-panda.gif')
  }
  
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

  const launchConfetti = () => {
    
    confetti({
      particleCount: 200,
      spread: 90,
      origin: { y: 0.6 }
    });
    
  }

  return (
    <main className="w-screen h-screen overflow-hidden flex justify-center items-center bg-white-100"
    style={{backgroundImage: `${yesButtonPressed ? `url(${heartBackground})` : 'none'}`
    }}>
      <div className="absolute left-0 top-0">
      {yesButtonPressed && (
        <button onClick={() => { new Audio(toothlessAudio).play();}}>
          <img 
            src={toothlessDancing}
            alt="yippee"
            style={{ width: 'auto', height: '250px'}}
          />
        </button>
      )}
      </div>
      
      {/* This div centers the content horizontally */}
      <div>
        <div className="flex justify-center pb-10">
          <img 
            src={imageSrc}
            alt="PLEASEEE"
            style={{ width: 'auto', height: '300px'}}/>
        </div>
        
        <div className="text-center">
            <div>
            <h1 className="outline outline-3 outline-offset-2 outline-cyan-500 text-3xl font-bold rounded-xl bg-gradient-to-r from-pink-500 to-red-500 px-5 py-4">
              <div>
                {yesButtonPressed ? <span style={{ color: 'white', textShadow: '2px 2px 0px black' }}>I love you!!💖💖💖</span> : <span style={{ color: 'white', textShadow: '2px 2px 1px black' }}>Will you be my valentine?</span>}
              </div>
            </h1>
          </div>

          <div class="flex justify-center space-x-4 mt-8">
            {/*Yes button*/}
            {/*Sets the button size to increase over time or be 100 if yesButton is pressed*/}
            <button
            
            className="outline outline-3 outline-green-700 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700 transition duration 300 hover:shadow-lg"
            style={{fontSize: `${( yesButtonPressed ? 150 : (phraseIndex + 1.5) * 15)}px`}}
            onClick={onYesClick}>
              {yesButtonPressed ? "YIPPEE" : yesPhrases[phraseIndex % (yesPhrases.length)]}
            </button>

            {/*No button*/}
            {showNo && <div className="flex justify-center items-center text-center">
              <button
              onClick={onNoClick}
              style={{ ...noButtonStyle, cursor: 'not-allowed' }}
              onMouseOver={handleMouseOver}
              className="shadow-inner px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition duration 300"
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
