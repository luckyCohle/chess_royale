import { pool } from "../../db/pool";

export async function createGame(player1: string, player2: string) {
  const query = `
    INSERT INTO games (player_white_id, player_black_id, status)
    VALUES ($1, $2, 'ONGOING')
    RETURNING *;
  `;

  try {
    const res = await pool.query(query, [player1, player2]);
    return res.rows[0];
  } catch (error) {
    console.error("error in creating game in db =>\n ** \n"+error+"\n **");
  }
  
}

export async function saveMove(gameId: string, move: string) {
  try {
    const res =await pool.query(
    `INSERT INTO moves (game_id, move_notation) VALUES ($1, $2)`,
    [gameId, move]
  );
  return res;
  } catch (error) {
    console.error("error in saving move in db =>\n ** \n"+error+"\n **");
  }
}