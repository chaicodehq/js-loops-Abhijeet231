/**
 * 🏆 IPL Season Points Table
 *
 * IPL ka season chal raha hai aur tujhe points table banana hai!
 * Tujhe match results ka array milega, aur tujhe har team ke points
 * calculate karke sorted table return karna hai.
 *
 * Match result types:
 *   - "win": Winning team gets 2 points, losing team gets 0
 *   - "tie": Both teams get 1 point each
 *   - "no_result": Both teams get 1 point each (rain/bad light)
 *
 * Each match object: { team1: "CSK", team2: "MI", result: "win", winner: "CSK" }
 *   - For "tie" and "no_result", the winner field is absent or ignored
 *
 * Rules (use for loop with object accumulator):
 *   - Loop through matches array
 *   - Build an object accumulator: { "CSK": { team, played, won, lost, tied, noResult, points }, ... }
 *   - After processing all matches, convert to array and sort:
 *     1. By points DESCENDING
 *     2. If points are equal, by team name ASCENDING (alphabetical)
 *
 * Validation:
 *   - Agar matches array nahi hai ya empty hai, return []
 *
 * @param {Array<{team1: string, team2: string, result: string, winner?: string}>} matches
 * @returns {Array<{team: string, played: number, won: number, lost: number, tied: number, noResult: number, points: number}>}
 *
 * @example
 *   iplPointsTable([
 *     { team1: "CSK", team2: "MI", result: "win", winner: "CSK" },
 *     { team1: "RCB", team2: "CSK", result: "tie" },
 *   ])
 *   // CSK: played=2, won=1, tied=1, points=3
 *   // MI: played=1, won=0, lost=1, points=0
 *   // RCB: played=1, tied=1, points=1
 *   // Sorted: CSK(3), RCB(1), MI(0)
 */
export function iplPointsTable(matches) {
  // Validation
  if (!Array.isArray(matches) || matches.length === 0) return [];

  let obj = {};

  for (let match of matches) {
    let t1 = match.team1;
    let t2 = match.team2;

    if (!obj[t1]) {
      obj[t1] = {
        team: t1,
        played: 0,
        won: 0,
        lost: 0,
        tied: 0,
        noResult: 0,
        points: 0,
      };
    }
    if (!obj[t2]) {
      obj[t2] = {
        team: t2,
        played: 0,
        won: 0,
        lost: 0,
        tied: 0,
        noResult: 0,
        points: 0,
      };
    }

    if (match.result === "win" && match.winner === t1) {
      obj[t1].won++;
      obj[t1].played++;
      obj[t1].points += 2;

      obj[t2].lost++;
      obj[t2].played++;
      obj[t2].points += 0;
    } else if (match.result === "win" && match.winner === t2) {
      obj[t2].won++;
      obj[t2].played++;
      obj[t2].points += 2;

      obj[t1].lost++;
      obj[t1].played++;
      obj[t1].points += 0;
    }

    if (match.result === "tie") {
      obj[t1].points++;
      obj[t1].tied++;

      obj[t2].points++;
      obj[t2].tied++;

      obj[t1].played++;
      obj[t2].played++;
    } else if (match.result === "no_result") {
      obj[t1].points++;
      obj[t1].noResult++;

      obj[t2].points++;
      obj[t2].noResult++;

      obj[t1].played++;
      obj[t2].played++;
    }
  }

  let result = Object.values(obj);
  result.sort((a, b) => {
    if (b.points !== a.points) {
      return b.points - a.points;
    }
    return a.team.localeCompare(b.team);
  });

  return result;
}
