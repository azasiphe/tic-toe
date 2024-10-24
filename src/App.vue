<template>
  <div class="main-container">
    <div class="game-container">
      <h1>TIC TAC TOE</h1>

      <div v-if="!mode" class="mode-selection">
        <button class="btn btn-primary" @click="selectMode('single')">1 Player</button>
        <button class="btn btn-secondary" @click="selectMode('two')">2 Players</button>
      </div>

      <div v-else>
        <p v-if="!winner" class="turn-indicator" style="color: white">
          {{ currentPlayer }}'s Turn
        </p>
        <p v-else class="winner-text">{{ winner }} Wins! 🎉</p>

        <div class="board">
          <div
            v-for="(cell, index) in board"
            :key="index"
            class="cell"
            :class="{ 'bg-danger': cell === 'X', 'bg-primary': cell === 'O' }"
            @click="makeMove(index)"
          >
            <span class="text-white h1">{{ cell }}</span>
          </div>
        </div>

        <button class="reset-button" @click="resetGame">Restart Game</button>
        <button class="back-button" @click="backToModeSelection">Back</button>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      board: Array(9).fill(''), // Initialize the board
      currentPlayer: 'X', 
      winner: null, 
      mode: null,
    };
  },
  methods: {
    selectMode(mode) {
      this.mode = mode;
      this.resetGame();
    },
    makeMove(index) {
      if (!this.board[index] && !this.winner) {
        this.board[index] = this.currentPlayer;

        // Check if there's a winner
        if (this.checkWinner()) {
          this.winner = this.currentPlayer;
          this.celebrateWin(); // Trigger celebration
        } else {
          // Switch player
          this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';

          // If in single-player mode, let AI make a move
          if (this.mode === 'single' && this.currentPlayer === 'O') {
            this.makeAIMove();
          }
        }
      }
    },
    makeAIMove() {
      const availableMoves = this.board
        .map((cell, index) => (cell === '' ? index : null))
        .filter(index => index !== null);
      const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
      setTimeout(() => this.makeMove(randomMove), 500);
    },
    checkWinner() {
      const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6],
      ];
      return winPatterns.some(pattern =>
        pattern.every(index => this.board[index] === this.currentPlayer)
      );
    },
    celebrateWin() {
      const confettiContainer = document.createElement('div');
      confettiContainer.className = 'confetti';
      document.body.appendChild(confettiContainer);

      setTimeout(() => {
        confettiContainer.remove(); // Clean up after animation
      }, 3000);
    },
    resetGame() {
      this.board = Array(9).fill('');
      this.currentPlayer = 'X';
      this.winner = null;
    },
    backToModeSelection() {
      this.mode = null; // Reset mode to allow selection again
      this.resetGame(); // Reset the game board
    },
  },
};
</script>

<style scoped>
body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;

  color: white;
  font-family: Arial, sans-serif;
}

.main-container {
  background-color: #282c34;
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  height: 100vh; /* Full viewport height */
}

.game-container {
  text-align: center;
  max-width: 400px;
  width: 100%;
  padding: 20px;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #61dafb;
  text-transform: uppercase;
}

.mode-selection button {
  margin: 5px;
}

.board {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin: 20px 0;
}

.cell {
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.5rem;
  cursor: pointer;
  background-color: #1e1e1e;
  border-radius: 10px;
  transition: background-color 0.3s ease;
}

.cell:hover {
  background-color: #3a3a3a;
}

.turn-indicator {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.winner-text {
  font-size: 2rem;
  color: #4caf50;
  animation: celebrate 1s infinite alternate;
}

.reset-button,
.back-button {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  background-color: #61dafb;
  color: #282c34;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin: 10px; /* Add some margin between buttons */
}

.reset-button:hover,
.back-button:hover {
  background-color: #21a1f1;
}

/* Confetti Effect */
.confetti {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: url('https://thumbs.gfycat.com/HardtofindDazzlingHochstettersfrog-size_restricted.gif');
  background-size: cover;
  pointer-events: none;
  z-index: 9999;
}

/* Animation */
@keyframes celebrate {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.1);
  }
}
</style>
