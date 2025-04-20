"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Sparkles } from 'lucide-react';

import { Titillium_Web } from "next/font/google";

const titilliumWeb = Titillium_Web({
  variable: "--titillium-web",
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700", "900"],
});

type Question = {
  id: number;
  type: 'fact' | 'riddle';
  text: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
};

const questions: Question[] = [
  {
    id: 1,
    type: 'fact',
    text: 'What is the shortest bone in the human body?',
    options: ['Stapes', 'Fibula', 'Ulna', 'Radius'],
    correctAnswer: 0,
    explanation: 'The stapes bone is one of the bones in the middle ear and is crucial for hearing.'
  },
  {
    id: 2,
    type: 'riddle',
    text: 'I am light as a feather, yet even the strongest man cannot hold me for much more than a minute. What am I?',
    options: ['Air', 'A feather', 'Breath', 'Wind'],
    correctAnswer: 2,
    explanation: 'Breath is light as air, but even the strongest person can\'t hold their breath for more than a couple of minutes.'
  },
  
  {
    id: 3,
    type: 'fact',
    text: 'Which planet in our solar system is known as the "Red Planet"?',
    options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
    correctAnswer: 1,
    explanation: 'Mars is called the Red Planet due to its reddish appearance caused by iron oxide on its surface.'
  },
  {
    id: 4,
    type: 'riddle',
    text: 'I have a head, a tail, but no body. What am I?',
    options: ['A coin', 'A tree', 'A river', 'A mountain'],
    correctAnswer: 0,
    explanation: `A coin has a head on one side and a tail on the other, but it doesn't have a body.`
  },
  {
    id: 5,
    type: 'fact',
    text: 'What is the largest organ in the human body?',
    options: ['Skin', 'Brain', 'Heart', 'Lungs'],
    correctAnswer: 0,
    explanation: `Skin is the largest organ and serves as the body's protective barrier.`
  },
  {
    id: 6,
    type: 'riddle',
    text: 'What has keys but can\'t open locks?',
    options: ['A piano', 'A computer', 'A safe', 'A door'],
    correctAnswer: 0,
    explanation: 'A piano has keys that are used to make music, not open locks.'
  },
  {
    id: 7,
    type: 'fact',
    text: 'Which element has the chemical symbol "O"?',
    options: ['Gold', 'Oxygen', 'Osmium', 'Oganesson'],
    correctAnswer: 1,
    explanation: 'Oxygen is a vital element for life, making up a large part of the Earth\'s atmosphere.'
  },
  {
    id: 8,
    type: 'riddle',
    text: 'What starts with an E, ends with an E, but only contains one letter?',
    options: ['An envelope', 'A letter', 'A word', 'A sentence'],
    correctAnswer: 0,
    explanation: 'An envelope starts and ends with "E" and contains a letter inside.'
  },
  {
    id: 9,
    type: 'fact',
    text: 'How many bones does an adult human have?',
    options: ['206', '208', '210', '212'],
    correctAnswer: 0,
    explanation: 'Adult humans have 206 bones, while babies are born with more that fuse as they grow.'
  },
  {
    id: 10,
    type: 'riddle',
    text: 'What is always coming but never arrives?',
    options: ['Tomorrow', 'Yesterday', 'Today', 'Forever'],
    correctAnswer: 0,
    explanation: 'Tomorrow is always coming, but it never actually arrives, because when it does, it becomes today.'
  }
];

const colors = {
  terra: {
    50: '#FBF0ED',
    100: '#F7E1DB',
    200: '#EFC3B7',
    300: '#E2725B',
    400: '#D35F45',
    500: '#C24D32',
    600: '#A23A21',
    700: '#8A2E19',
    800: '#6E2412',
    900: '#551C0E'
  },
  amber: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F59E0B',
    600: '#D97706',
    700: '#B45309',
    800: '#92400E',
    900: '#78350F'
  }
};

const getRandomQuestion = (currentId?: number): Question => {
  let filteredQuestions = questions;

  if (currentId !== undefined) {
    filteredQuestions = questions.filter(question => question.id !== currentId);
  }

  if (filteredQuestions.length === 0) {
    return {
      id: -1,
      type: 'fact',
      text: 'No more questions available!',
      options: ['Restart the game'],
      correctAnswer: 0
    };
  }

  const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
  return filteredQuestions[randomIndex];
};

export default function Home() {
  const [question, setQuestion] = useState<Question>(getRandomQuestion());
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);

  const handleAnswerSelect = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    const isCorrect = index === question.correctAnswer;
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    setShowResult(true);
    setAttempts(attempts + 1);
    
    if (isCorrect) { 
      setScore(score + 1); 
    } 
    
    setTimeout(() => { 
      if (attempts + 1 >= 5) { 
        setGameComplete(true); 
      } else { 
        setQuestion(getRandomQuestion(question.id)); 
        setSelectedAnswer(null); 
        setFeedback(null); 
        setShowResult(false); 
      } 
    }, 3000);
  };

  const restartGame = () => { 
    setQuestion(getRandomQuestion()); 
    setSelectedAnswer(null); 
    setFeedback(null); 
    setScore(0); 
    setAttempts(0); 
    setShowResult(false); 
    setGameComplete(false); 
  };

  useEffect(() => { 
    if (gameComplete) { 
      const timer = setTimeout(() => { 
        restartGame(); 
      }, 5000); 
      return () => clearTimeout(timer); 
    } 
  }, [gameComplete]);

  const optionVariants = { 
    unselected: { 
      backgroundColor: "#FBF0ED", 
      borderColor: "#E2725B", 
      scale: 1, 
      y: 0, 
      opacity: 1, 
      transition: { duration: 0.3 } 
    }, 
    correctSelected: { 
      scale: 1.03, 
      y: -3, 
      opacity: 1, 
      transition: { type: "spring", stiffness: 400, damping: 15 }, 
      backgroundColor: "#F0FDF4", 
      borderColor: "#059669", 
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05), 0 0 0 2px #059669" 
    }, 
    incorrectSelected: { 
      scale: 1.03, 
      y: -3, 
      opacity: 1, 
      transition: { type: "spring", stiffness: 400, damping: 15 }, 
      backgroundColor: "#FEF2F2", 
      borderColor: "#DC2626", 
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05), 0 0 0 2px #DC2626" 
    }, 
    otherIncorrect: { 
      backgroundColor: "#FEF2F2", 
      borderColor: "#DC2626", 
      scale: 0.97, 
      y: 2, 
      opacity: 0.7, 
      transition: { duration: 0.3 } 
    }, 
    otherCorrect: { 
      backgroundColor: "#F0FDF4", 
      borderColor: "#059669", 
      scale: 0.97, 
      y: 2, 
      opacity: 0.7, 
      transition: { duration: 0.3 } 
    } 
  };

  const getOptionState = (index: number) => { 
    if (selectedAnswer === null) return 'unselected'; 
    if (index === selectedAnswer && feedback === 'correct') return 'correctSelected'; 
    if (index === selectedAnswer && feedback === 'incorrect') return 'incorrectSelected'; 
    if (index === question.correctAnswer && feedback === 'incorrect') return 'otherCorrect'; 
    if (index !== question.correctAnswer && feedback === 'correct') return 'otherIncorrect'; 
    return 'unselected'; 
  };

  return (
    <div className={`${titilliumWeb.className} min-h-screen w-full bg-gradient-to-br from-[#FBF0ED] to-[#FEF3C7] flex flex-col items-center justify-center p-2 relative overflow-hidden`}>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#E2725B] opacity-20"></div>
        <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-[#F59E0B] opacity-15"></div>
        <div className="absolute top-1/4 left-1/3 w-6 h-6 rotate-45 bg-[#C24D32] opacity-20"></div>
        <div className="absolute top-1/3 right-1/4 w-12 h-12 rounded-full bg-[#92400E] opacity-15"></div>
        <div className="absolute bottom-1/4 right-1/3 w-16 h-16 rounded-full bg-[#78350F] opacity-10"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border-2 border-[#E2725B] rounded-full opacity-10"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border-2 border-[#F59E0B] rounded-full opacity-10"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-[#E2725B]/20 relative z-10"
      >
        <div className="relative overflow-hidden">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#E2725B] to-[#F59E0B] opacity-20"></div>
          <div className="bg-white/80 backdrop-blur-sm p-3 flex justify-between items-center relative">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E2725B] to-[#C24D32] flex items-center justify-center shadow-md">
                <span className="text-white font-bold">Q</span>
              </div>
              <div>
                <h3 className="text-sm font-medium text-[#6B4423]">Question</h3>
                <p className="text-xs text-[#C24D32]">{attempts + 1}/5</p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-[#FBF0ED] px-4 py-1.5 rounded-full shadow-inner">
              <Sparkles className="w-5 h-5 text-[#F59E0B]" />
              <span className="font-bold text-[#C24D32]">{score}</span>
              <span className="text-sm text-[#6B4423]">points</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          {!gameComplete ? (
            <>
              <motion.div
                key={question.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md ${question.type === 'fact' ? 'bg-[#E2725B]' : 'bg-[#F59E0B]'}`}>
                    <span className="text-white font-bold">{question.type === 'fact' ? 'F' : 'R'}</span>
                  </div>
                  <h2 className="text-xl font-bold text-[#6B4423]">{question.type === 'fact' ? 'Fun Fact' : 'Riddle'}</h2>
                </div>

                <div className="bg-[#FBF0ED] p-5 rounded-xl shadow-inner border border-[#E2725B]/20">
                  <p className="text-[#6B4423] leading-relaxed">{question.text}</p>
                </div>
              </motion.div>

              <div className="grid gap-3">
                {question.options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={selectedAnswer !== null}
                    initial={{ opacity: 0, y: 20 }}
                    animate={optionVariants[getOptionState(index)]}
                    whileHover={
                      selectedAnswer === null
                        ? {
                          scale: 1.03,
                          y: -5,
                          transition: { type: "spring", stiffness: 400, damping: 15 }
                        }
                        : {}
                    }
                    whileTap={{ scale: 0.98 }}
                    className={`px-5 py-4 rounded-xl font-medium text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${getOptionState(index) === 'correctSelected' ? 'focus-visible:ring-[#059669]' : getOptionState(index) === 'incorrectSelected' ? 'focus-visible:ring-[#DC2626]' : 'focus-visible:ring-[#E2725B]'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md ${getOptionState(index) === 'correctSelected' ? 'bg-[#059669] text-white' : getOptionState(index) === 'incorrectSelected' ? 'bg-[#DC2626] text-white' : 'bg-[#FBF0ED] text-[#6B4423]'}`}>
                        {getOptionState(index) === 'correctSelected' ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : getOptionState(index) === 'incorrectSelected' ? (
                          <XCircle className="w-5 h-5" />
                        ) : (
                          <span className="font-bold">{index + 1}</span>
                        )}
                      </div>
                      <span className="flex-1">{option}</span>
                    </div>
                  </motion.button>
                ))}
              </div>

              <AnimatePresence>
                {showResult && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`mt-6 p-4 rounded-xl ${feedback === 'correct' ? 'bg-[#F0FDF4] border border-[#059669]/20' : 'bg-[#FEF2F2] border border-[#DC2626]/20'}`}
                  >
                    <div className="flex items-center gap-3">
                      {feedback === 'correct' ? (
                        <CheckCircle className="w-6 h-6 text-[#059669]" />
                      ) : (
                        <XCircle className="w-6 h-6 text-[#DC2626]" />
                      )}
                      <p className="font-medium text-[#6B4423]">
                        {feedback === 'correct' ? 'Correct!' : 'Incorrect!'}
                      </p>
                    </div>

                    <p className="mt-2 text-sm text-[#6B4423]/80">{question.explanation}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center py-8"
            >
              <div className="mb-6 inline-flex items-center justify-center w-24 h-24 rounded-full bg-[#E2725B]/20 shadow-inner">
                <span className="text-3xl font-bold text-[#C24D32]">{score}/5</span>
              </div>
              <h2 className="text-2xl font-bold text-[#6B4423] mb-3">Game Complete!</h2>
              <p className="text-[#6B4423]/80 mb-6">Your trivia adventure has come to an end... for now!</p>

              <div className="bg-[#FBF0ED] p-5 rounded-xl shadow-inner border border-[#E2725B]/20 mb-6">
                <p className="text-[#6B4423] font-medium">Final Score: {score} points</p>
                <p className="text-[#6B4423]/80">Thanks for playing! Get ready for more brain-tickling challenges coming soon.</p>
              </div>

              <button
                onClick={restartGame}
                className="bg-[#F59E0B] text-white font-bold py-3 px-8 rounded-xl shadow-md hover:bg-[#D97706] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#D97706]"
              >
                Play Again
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
