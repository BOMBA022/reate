import { useState } from "react";
import logoImage from "./image.png";
import "./App.css";

const questions = [
  { question: "Capital de Portugal?", answers: ["Lisboa", "Porto", "Faro", "Coimbra"], correct: 0 },
  { question: "2 + 2?", answers: ["3", "4", "5", "6"], correct: 1 },
  { question: "Cor do céu?", answers: ["Azul", "Verde", "Vermelho", "Amarelo"], correct: 0 },
  { question: "5 x 2?", answers: ["10", "8", "6", "12"], correct: 0 },
  { question: "Animal que mia?", answers: ["Cão", "Gato", "Peixe", "Pássaro"], correct: 1 },
  { question: "Dia após segunda?", answers: ["Domingo", "Terça", "Quarta", "Sexta"], correct: 1 },
  { question: "3 x 3?", answers: ["6", "9", "12", "3"], correct: 1 },
  { question: "Planeta Terra é?", answers: ["Plano", "Redondo", "Quadrado", "Triângulo"], correct: 1 },
  { question: "Cor do sangue?", answers: ["Azul", "Verde", "Vermelho", "Preto"], correct: 2 },
  { question: "1 + 1?", answers: ["1", "2", "3", "4"], correct: 1 },
  { question: "Maior animal?", answers: ["Elefante", "Baleia", "Cão", "Gato"], correct: 1 },
  { question: "Cor da relva?", answers: ["Azul", "Verde", "Amarelo", "Roxo"], correct: 1 },
  { question: "10 / 2?", answers: ["2", "5", "10", "20"], correct: 1 },
  { question: "Fogo é?", answers: ["Frio", "Quente", "Molhado", "Seco"], correct: 1 },
  { question: "Lua aparece?", answers: ["Dia", "Noite", "Sempre", "Nunca"], correct: 1 },
  { question: "4 x 4?", answers: ["8", "12", "16", "20"], correct: 2 },
  { question: "Peixe vive?", answers: ["Terra", "Água", "Ar", "Fogo"], correct: 1 },
  { question: "Sol é uma?", answers: ["Lua", "Estrela", "Planeta", "Nuvem"], correct: 1 },
  { question: "Cor da neve?", answers: ["Branco", "Preto", "Azul", "Verde"], correct: 0 },
  { question: "7 - 3?", answers: ["2", "3", "4", "5"], correct: 2 },
];

export default function App() {
  const [page, setPage] = useState("home");

  return (
    <div className="app-shell">
      <div className="app-frame">
        <main className="page-stack">
          {page === "home" && <Home />}
          {page === "quiz" && <Quiz />}
          {page === "about" && <About />}
        </main>
      </div>

      <nav className="app-nav" aria-label="Navegação principal">
        <NavButton label="Home" active={page === "home"} onClick={() => setPage("home")} />
        <NavButton label="Quiz" active={page === "quiz"} onClick={() => setPage("quiz")} />
        <NavButton label="Sobre" active={page === "about"} onClick={() => setPage("about")} />
      </nav>
    </div>
  );
}

function NavButton({ label, active, onClick }) {
  return (
    <button
      type="button"
      className={active ? "nav-button nav-button-active" : "nav-button"}
      onClick={onClick}
      aria-pressed={active}
    >
      {label}
    </button>
  );
}

function Home() {
  const [showGame, setShowGame] = useState(false);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState("X");
  const [winner, setWinner] = useState(null);

  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWinner = (boardState) => {
    for (const [a, b, c] of lines) {
      if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
        return boardState[a];
      }
    }
    if (boardState.every(Boolean)) return "Empate";
    return null;
  };

  const play = (index) => {
    if (board[index] || winner) return;
    const nextBoard = [...board];
    nextBoard[index] = player;
    setBoard(nextBoard);
    setPlayer(player === "X" ? "O" : "X");
    setWinner(checkWinner(nextBoard));
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setPlayer("X");
    setWinner(null);
  };

  return (
    <section className="page-card">
      <div className="page-header">
        <div>
          <h2>Jogo da Velha</h2>
          <div className="game-logo" aria-hidden="true">
            <img
              src={logoImage}
              alt="Logo de Jogo da Velha"
              className="game-logo-image"
              loading="lazy"
            />
          </div>
          <p className="page-description">
            Divirta-se com um jogo rápido enquanto testa sua memória e estratégia.
          </p>
        </div>
      </div>

      {!showGame ? (
        <div className="center-content">
          <button type="button" className="primary-button" onClick={() => setShowGame(true)}>
            Jogar agora
          </button>
        </div>
      ) : (
        <>
          <div className="game-status">
            {winner ? <span>Vencedor: {winner}</span> : <span>Player: {player}</span>}
          </div>
          <div className="game-board">
            {board.map((cell, index) => (
              <button key={index} type="button" className="game-cell" onClick={() => play(index)}>
                {cell}
              </button>
            ))}
          </div>
          <div className="button-row">
            <button type="button" className="secondary-button" onClick={resetGame}>
              Reiniciar
            </button>
          </div>
        </>
      )}
    </section>
  );
}

function Quiz() {
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (answerIndex) => {
    const correct = answerIndex === questions[index].correct;
    if (correct) setScore((prev) => prev + 1);

    const nextQuestion = index + 1;
    if (nextQuestion < questions.length) {
      setIndex(nextQuestion);
    } else {
      setFinished(true);
    }
  };

  const restartQuiz = () => {
    setStarted(false);
    setIndex(0);
    setScore(0);
    setFinished(false);
  };

  if (!started) {
    return (
      <section className="page-card quiz-card">
        <div className="center-content">
          <h2>Quiz</h2>
          <p className="page-description">Teste seu conhecimento com perguntas divertidas e imediatas.</p>
          <button type="button" className="primary-button" onClick={() => setStarted(true)}>
            Começar quiz
          </button>
        </div>
      </section>
    );
  }

  if (finished) {
    return (
      <section className="page-card quiz-card">
        <div className="center-content">
          <h2>Parabéns!</h2>
          <p className="page-description">Você terminou o quiz com {score} de {questions.length} respostas corretas.</p>
          <button type="button" className="primary-button" onClick={restartQuiz}>
            Reiniciar quiz
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="page-card quiz-card">
      <div className="page-header">
        <div>
          <h2>{questions[index].question}</h2>
        </div>
        <span className="small-chip">{index + 1}/{questions.length}</span>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${((index + 1) / questions.length) * 100}%` }} />
      </div>
      <div className="answer-grid">
        {questions[index].answers.map((answer, answerIndex) => (
          <button
            key={answerIndex}
            type="button"
            className="quiz-button"
            onClick={() => handleAnswer(answerIndex)}
          >
            {answer}
          </button>
        ))}
      </div>
      <div className="quiz-footer">
        <span>Corretos: {score}</span>
        <button type="button" className="secondary-button" onClick={restartQuiz}>
          Reiniciar
        </button>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="page-card about-card">
      <div className="page-header">
      </div>
      <div className="footer-note">
        © 2026 O Teu Nome · Interface otimizada para desktop e mobile.
      </div>
    </section>
  );
}
