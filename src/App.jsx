// src/App.jsx
import { useState } from "react";
import { Brain, Trophy, BookOpen } from "lucide-react";

// Constants (moved from external file for this example)
const Types = [
  { id: 9, name: "General Knowledge" },
  { id: 21, name: "Sports" },
  { id: 23, name: "History" },
  { id: 24, name: "Politics" },
];

const Level = ["easy", "medium", "hard"];

// Simplified state management without Zustand
const useQuestionStore = () => {
  const [questions, setQuestions] = useState([]);
  
  const fetchQuestions = async (query) => {
    try {
      const response = await fetch(`https://opentdb.com/api.php?${query}`);
      const data = await response.json();
      setQuestions(data.results);
      return data.results;
    } catch (error) {
      console.error('Error fetching questions:', error);
      return [];
    }
  };

  return { questions, setQuestions, fetchQuestions };
};

const AnimateProvider = ({ children, className }) => (
  <div className={`animate-fadeIn ${className}`}>
    {children}
  </div>
);

function App() {
  const [type, setType] = useState(Types[0].id);
  const [level, setLevel] = useState(Level[0]);
  const [currentView, setCurrentView] = useState('setup'); // setup, question, results
  const { questions, fetchQuestions } = useQuestionStore();

  const handleBegin = async () => {
    const query = `amount=5&category=${type}&difficulty=${level}&type=multiple`;
    const fetchedQuestions = await fetchQuestions(query);
    if (fetchedQuestions.length) {
      setCurrentView('question');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-4">
      <AnimateProvider className="mx-auto max-w-xl">
        {currentView === 'setup' && (
          <div className="space-y-6">
            <header className="text-center mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
                Welcome to <span className="text-orange-500">QuizVibe</span>
              </h1>
              <p className="text-neutral-600 mt-2">Customize your quiz experience</p>
            </header>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="flex items-center text-sm md:text-base text-neutral-600 font-semibold">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Select Category
                </label>
                <select
                  className="w-full bg-white ring-1 ring-gray-200 rounded-lg px-4 py-2.5 text-sm md:text-base focus:ring-2 focus:ring-orange-500 focus:outline-none text-gray-700 font-medium"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  {Types.map((type) => (
                    <option value={type.id} key={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="flex items-center text-sm md:text-base text-neutral-600 font-semibold">
                  <Trophy className="w-4 h-4 mr-2" />
                  Select Difficulty
                </label>
                <select
                  className="w-full bg-white ring-1 ring-gray-200 rounded-lg px-4 py-2.5 text-sm md:text-base focus:ring-2 focus:ring-orange-500 focus:outline-none text-gray-700 font-medium capitalize"
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                >
                  {Level.map((level) => (
                    <option value={level} key={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600 transition-colors"
              onClick={handleBegin}
            >
              <Brain className="w-5 h-5" />
              Begin Quiz
            </button>
          </div>
        )}

        {currentView === 'question' && questions.length > 0 && (
          <div className="space-y-4">
            {/* Question view component would go here */}
            <p className="text-center text-lg">Questions loaded! Add your question component here.</p>
            <button 
              onClick={() => setCurrentView('setup')}
              className="w-full py-2 text-orange-500 hover:text-orange-600"
            >
              Back to Setup
            </button>
          </div>
        )}
      </AnimateProvider>
    </div>
  );
}

export default App;