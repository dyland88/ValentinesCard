import { useState } from 'react';
import confetti from 'canvas-confetti';

const noPhrases = ['no', 'pleaseee', 'I hate puppies', 'I am picking the wrong choice', 'whyyyyyyy', 'This is your LAST CHANCE', 'FR FR you better not do it this time']
const yesPhrases = ['yes', 'YES', 'YES!!!', 'PICK THIS ONE!!!', 'why u no click me :(', 'yes 🥺', "of course!!!"]

function App() {


  // Called when the "No" button is clicked
  const onNoClick = () => {
    handleMouseOver();
    setPhraseIndex(Math.min(phraseIndex + 1, noPhrases.length - 1));
  }

  const [phraseIndex, setPhraseIndex] = useState(0);
  const [noButtonStyle, setNoButtonStyle] = useState({});
  const [showNo, setShowNo] = useState(true);


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
    transform: `translate(${moveX}px, ${moveY}px)`,
    transition: 'transform 0.3s ease-in-out',
  });
}

const onYesClick = () => {
  launchConfetti();
  setShowNo(false);
}
const launchConfetti = () => {
  
  confetti({
    particleCount: 200,
    spread: 90,
    origin: { y: 0.6 }
  });
  
}

  return (
    <main className="w-screen h-screen overflow-hidden flex justify-center items-center bg-white-100">
      {/* This div centers the content horizontally */}
      <div>
        <div className="flex justify-center pb-10">
          <img 
            src="https://media1.tenor.com/m/HzAhXPf2YOEAAAAC/milk-and-mocha.gif" 
            alt="PLEASEEE"
            style={{ width: 'auto', height: '300px'}}/>
        </div>
        
        <div className="text-center">

          <h1 className="text-3xl font-bold">
            Will you be my valentine?
          </h1>

          <div class="flex justify-center space-x-4 mt-8">
            <button
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700 transition duration 300"
            style={{ fontSize: `${(phraseIndex + 1) * 15}px`}}
            onClick={onYesClick}>
              Yes!!!
            </button>

            {showNo && <div className="flex justify-center items-center text-center">
              <button
              onClick={onNoClick}
              style={noButtonStyle}
              onMouseOver={handleMouseOver}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition duration 300"
              >
                {noPhrases[phraseIndex]}
                </button>
              
              </div>}
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
