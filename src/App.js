import { useState } from 'react';

const noPhrases = ['no', 'pleaseee', 'I hate puppies', 'I am picking the wrong choice']

function App() {

  const onNoClick = () => {
    setPhraseIndex(Math.min(phraseIndex + 1, noPhrases.length - 1));
  }

  const [phraseIndex, setPhraseIndex] = useState(0);
  return (
    <main className="w-screen h-screen overflow-hidden flex justify-center items-center bg-gray-100">
      <div className="text-center">

        <h1 className="text-3xl font-bold">
          Will you be my valentine?
        </h1>

        <div class="flex justify-center space-x-4 mt-8">
          <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration 300"
          style={{ fontSize: `${(phraseIndex + 1) * 15}px`}}>
            Yes!!!
            </button>
          <div className="flex justify-center items-center text-center">
              
            <button
            onClick={onNoClick}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition duration 300"
            >
              {noPhrases[phraseIndex]}
              </button>
            
            </div>
        </div>
      </div>
    </main>
  );
}

export default App;
