"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const ARRAY_SIZE = 10

const COLORS = [
  'bg-red-400',
  'bg-orange-400',
  'bg-yellow-400',
  'bg-green-400',
  'bg-teal-400',
  'bg-blue-400',
  'bg-indigo-400',
  'bg-purple-400',
  'bg-pink-400',
  'bg-rose-400',
]

export function FisherYatesShuffle() {
  const [array, setArray] = useState([])
  const [currentIndex, setCurrentIndex] = useState(ARRAY_SIZE - 1)
  const [swapIndex, setSwapIndex] = useState(null)
  const [isShuffling, setIsShuffling] = useState(false)

  useEffect(() => {
    resetArray()
  }, [])

  const resetArray = () => {
    const newArray = Array.from({ length: ARRAY_SIZE }, (_, i) => i + 1)
    setArray(newArray)
    setCurrentIndex(ARRAY_SIZE - 1)
    setSwapIndex(null)
    setIsShuffling(false)
  }

  const shuffleStep = () => {
    if (currentIndex > 0) {
      const randomIndex = Math.floor(Math.random() * (currentIndex + 1))
      setSwapIndex(randomIndex)

      setTimeout(() => {
        setArray(prevArray => {
          const newArray = [...prevArray]
          ;[newArray[currentIndex], newArray[randomIndex]] = [newArray[randomIndex], newArray[currentIndex]]
          return newArray
        })
        setCurrentIndex(prevIndex => prevIndex - 1)
        setSwapIndex(null)
      }, 500)
    } else {
      setIsShuffling(false)
    }
  }

  const startShuffle = () => {
    setIsShuffling(true)
  }

  useEffect(() => {
    if (isShuffling) {
      const timer = setTimeout(shuffleStep, 1000)
      return () => clearTimeout(timer);
    }
  }, [isShuffling, currentIndex])

  return (
    (<Card
      className="p-4 sm:p-6 max-w-full sm:max-w-2xl mx-auto bg-gradient-to-br from-purple-100 to-pink-100">
      <h2
        className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4 text-center text-purple-800">Fisher-Yates Shuffle Visualization</h2>
      <p className="text-xs sm:text-sm text-gray-700 mb-2 sm:mb-4 text-center">
        The Fisher-Yates shuffle is an algorithm for generating a random permutation of a finite sequence.
        It works by iterating through the array from end to beginning, swapping each element with a randomly chosen element before it (including itself).
      </p>
      <div
        className="flex flex-wrap justify-center mb-4 min-h-[4rem] sm:min-h-[4.5rem] items-end">
        <AnimatePresence>
          {array.map((num, index) => (
            <motion.div
              key={num}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center border-2 m-0.5 sm:m-1 rounded-lg shadow-md ${
                COLORS[num - 1]
              } ${
                index === currentIndex
                  ? 'ring-4 ring-blue-500 ring-opacity-50'
                  : index === swapIndex
                  ? 'ring-4 ring-green-500 ring-opacity-50'
                  : ''
              }`}>
              <span className="text-white font-bold text-sm sm:text-base md:text-lg">{num}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div
        className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
        <Button
          onClick={startShuffle}
          disabled={isShuffling}
          className="bg-purple-500 hover:bg-purple-600 text-white text-sm sm:text-base">
          Start Shuffle
        </Button>
        <Button
          onClick={shuffleStep}
          disabled={isShuffling || currentIndex === 0}
          className="bg-blue-500 hover:bg-blue-600 text-white text-sm sm:text-base">
          Step
        </Button>
        <Button
          onClick={resetArray}
          variant="outline"
          className="border-pink-500 text-pink-500 hover:bg-pink-100 text-sm sm:text-base">
          Reset
        </Button>
      </div>
      <p className="mt-2 sm:mt-4 text-center text-xs sm:text-sm text-gray-700">
        {isShuffling
          ? `Shuffling... Current index: ${currentIndex}`
          : currentIndex === 0
          ? 'Shuffle complete!'
          : 'Click "Start Shuffle" or "Step" to begin'}
      </p>
    </Card>)
  );
}