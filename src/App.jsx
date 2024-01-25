import { useState } from 'react'
import './App.css'

function App() {
  const [answer, setAnswer] = useState('')
  const [expression, setExpression] = useState('')
  const et = expression.trim()
  const isOperator = (symbol) => {
    return /[-+*/]/.test(symbol)
  }
  const isNumKey = (symbol) => {
    return /[0-9]/.test(symbol)
  }

  const buttonPress = (symbol) => {
    if (symbol === 'clear') {
      setAnswer('')
      setExpression('0')
    } else if (symbol === 'negative') {
      if (answer === '') return
      setAnswer(
        answer.toString().charAt(0) === '-' ? answer.slice(1) : '-' + answer
      )
    } else if (isOperator(symbol)) {
      setExpression(et + ' ' + symbol + ' ')
    } else if (symbol === '=') {
      calculate()
    } else if (symbol === '0') {
      if (expression.charAt(0) !== '0') {
        setExpression(expression + symbol)
      }
    } else if (symbol === '.') {
      // split by operators and get last number
      const lastNumber = expression.split(/[-+/*]/g).pop()
      if (!lastNumber) return
      console.log('lastNumber :>> ', lastNumber)
      // if last number already has a decimal, don't add another
      if (lastNumber?.includes('.')) return
      setExpression(expression + symbol)
    } else {
      if (expression.charAt(0) === '0') {
        setExpression(expression.slice(1) + symbol)
      } else {
        setExpression(expression + symbol)
      }
    }
  }

  const calculate = () => {
    // if last char is an operator, do nothing
    if (isOperator(et.charAt(et.length - 1))) return
    // clean the expression so that two operators in a row uses the last operator
    // 5 * - + 5 = 10
    const parts = et.split(' ')
    const newParts = []

    // go through parts backwards
    for (let i = parts.length - 1; i >= 0; i--) {
      if (['*', '/', '+'].includes(parts[i]) && isOperator(parts[i - 1])) {
        newParts.unshift(parts[i])
        let j = 0
        let k = i - 1
        while (isOperator(parts[k])) {
          k--
          j++
        }
        i -= j
      } else {
        newParts.unshift(parts[i])
      }
    }
    const newExpression = newParts.join(' ')
    console.log(newExpression)
    console.log(answer)
    if (isOperator(newExpression.charAt(0))) {
      setAnswer(eval(answer + newExpression))
    } else {
      setAnswer(eval(newExpression))
    }
    setExpression('')
  }

  return (
    <>
      <div className="container">
        <h1>Calculator</h1>
        <div className="hero">
          <div id="display" style={{ textAlign: 'left' }}>
            <div id="answer">{answer}</div>
            <div id="expression">{expression}</div>
          </div>
          <div id="calculator" className="calculator">
            <button
              id="clear"
              className="light-white"
              onClick={() => {
                buttonPress('clear')
              }}
            >
              Clear
            </button>
            <button
              id="negative"
              className="light-white"
              onClick={() => {
                buttonPress('negative')
              }}
            >
              +/-
            </button>

            <button
              id="divide"
              className="light-white"
              onClick={() => {
                buttonPress('/')
              }}
            >
              /
            </button>
            <button
              id="seven"
              className="light-grey"
              onClick={() => {
                buttonPress('7')
              }}
            >
              7
            </button>
            <button
              id="eight"
              className="light-grey"
              onClick={() => {
                buttonPress('8')
              }}
            >
              8
            </button>
            <button
              id="nine"
              className="light-grey"
              onClick={() => {
                buttonPress('9')
              }}
            >
              9
            </button>
            <button
              id="multiply"
              className="light-white"
              onClick={() => {
                buttonPress('*')
              }}
            >
              *
            </button>
            <button
              id="four"
              className="light-grey"
              onClick={() => {
                buttonPress('4')
              }}
            >
              4
            </button>
            <button
              id="five"
              className="light-grey"
              onClick={() => {
                buttonPress('5')
              }}
            >
              5
            </button>
            <button
              id="six"
              className="light-grey"
              onClick={() => {
                buttonPress('6')
              }}
            >
              6
            </button>
            <button
              id="subtract"
              className="light-white"
              onClick={() => {
                buttonPress('-')
              }}
            >
              -
            </button>
            <button
              id="one"
              className="light-grey"
              onClick={() => {
                buttonPress('1')
              }}
            >
              1
            </button>
            <button
              id="two"
              className="light-grey"
              onClick={() => {
                buttonPress('2')
              }}
            >
              2
            </button>
            <button
              id="three"
              className="light-grey"
              onClick={() => {
                buttonPress('3')
              }}
            >
              3
            </button>
            <button
              id="add"
              className="light-white"
              onClick={() => {
                buttonPress('+')
              }}
            >
              +
            </button>
            <button
              id="zero"
              className="light-grey"
              onClick={() => {
                buttonPress('0')
              }}
            >
              0
            </button>
            <button
              id="decimal"
              className="light-white"
              onClick={() => {
                buttonPress('.')
              }}
            >
              .
            </button>
            <button
              id="equals"
              className="light-equals"
              onClick={() => {
                buttonPress('=')
              }}
            >
              =
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
