import { Fragment, useEffect, useState } from 'react/cjs/react.development'
import './App.css'
const totalPoints = 100
const wk = [1, 4]
const bat = [3, 6]
const ar = [1, 4]
const bol = [3, 6]
const gr = { wk, bat, ar, bol }
const probability = [[[7, 4], [6, 5]], [[4, 7], [5, 6]]]

const team1 = [
  {
    name: "P currency",
    type: "wk",
    points: 9.0,
    team: 1,
  },
  {
    name: "J soliyn",
    type: "wk",
    points: 8.5,

    team: 1,
  },
  {
    name: "D sammy",
    type: "ar",
    points: 9.5,

    team: 1,
  },
  {
    name: "K Shallow",
    type: "bat",
    points: 8.5,

    team: 1,
  },
  {
    name: "E Lewis",
    type: "bat",
    points: 8.5,

    team: 1,
  },
  {
    name: "M Bascombe",
    type: "bat",
    points: 9.5,

    team: 1,
  },
  {
    name: "R Roberts",
    type: "bol",
    points: 9.0,

    team: 1,
  },
  {
    name: "R Wilkinson",
    type: "bat",
    points: 8.0,

    team: 1,
  },
  {
    name: "C Gonsalves",
    type: "ar",
    points: 8.0,

    team: 1,
  },
  {
    name: "M John",
    type: "bol",
    points: 8.5,

    team: 1,
  },
  {
    name: "D Butler",
    type: "bol",
    points: 8.5,
    team: 1,
  },

]

const team2 = [
  {
    name: "A Hooper",
    type: "ar",
    points: 10.0,

    team: 2,
  },
  {
    name: "T Harry",
    type: "wk",
    points: 8.0,

    team: 2,
  },
  {
    name: "U Thomas",
    type: "bat",
    points: 8.5,

    team: 2,
  },
  {
    name: "W Strough",
    type: "bol",
    points: 9.5,

    team: 2,
  },
  {
    name: "R Hillocks",
    type: "bol",
    points: 8.5,

    team: 2,
  },
  {
    name: "K Horne",
    type: "bat",
    points: 8.5,

    team: 2,
  },
  {
    name: "S Williams",
    type: "bat",
    points: 9.0,

    team: 2,
  },
  {
    name: "S Williams",
    type: "bol",
    points: 9.0,

    team: 2,
  },
  {
    name: "A Casesar",
    type: "bol",
    points: 8.0,

    team: 2,
  },
  {
    name: "L Wilson",
    type: "bol",
    points: 9.0,

    team: 2,
  },
  {
    name: "R Pichards",
    type: "ar",
    points: 9.5,
    team: 2,
  },

]

function groupBy(array, key) {
  return array.reduce((group, element) => {
    const keyValue = element[key]
    return { ...group, [keyValue]: [...(group[keyValue] ?? []), element] }
  }, {})
}
const sortRandom = (array, number) => array.sort(() => Math.random() - Math.random()).slice(0, number)

const mergedTeams = [[...team1], [...team2]]

function App() {
  const [finalPlayer, setFinalPlayer] = useState({})

  useEffect(() => {
    const first = () => {
      let jCloned = {}
      let dd = []
      for (let i = 0; i < probability.length; i++) {
        for (let j = 0; j < probability[i].length; j++) {
          const c = () => {
            for (let k = 0; k < probability[i][j].length; k++) {
              dd = [...dd, sortRandom(mergedTeams[k], probability[i][j][k])]
            }
            if (dd.flat().map(({ points }) => points).reduce((a, b) => a + b, 0) <= 98.5 || dd.flat().map(({ points }) => points).reduce((a, b) => a + b, 0) > 100) {
              dd = []
              return c()
            }
            jCloned[probability[i][j]] = dd.flat()
            dd = []
          }
          c()
        }
      }
      for (let index = 0; index < Object.values(jCloned).length; index++) {
        if (Object.entries(groupBy(Object.values(jCloned)[index], 'type')).length === 4) {
          const checkPlayerType = Object.entries(groupBy(Object.values(jCloned)[index], 'type')).map(([key, array]) => array.length >= gr[key][0])
          if (checkPlayerType, checkPlayerType.includes(false)) return first()
          return jCloned
        }
        else {
          first()
        }
      }
    }
    const recursivePlayers = first()
    const matches = recursivePlayers[probability[0][0]].map(current => console.log('current', current)
      // combinations.some(combination => 
      //   Object.entries(combination).every(([key, value]) => 
      //     current[key] === value
      //   )
      // )
    );

    console.log(matches);
    console.log('recursivePlayers', recursivePlayers)
    setFinalPlayer(first())
  }, [])

  return (
    <div className="App">
      <h1>Team 1</h1>
      {Object.entries(finalPlayer).map(([key, value]) => {
        return (
          <Fragment key={key}>
            <div>
              <h1>Probability {key}</h1>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Points</th>
                    <th>Team</th>
                    <th>Total Players</th>
                    <th>Total Points</th>
                  </tr>
                </thead>
                <tbody>

                  {value.map((c, i) => {
                    return (<tr key={i}>
                      {Object.values(c).map(n => <td key={n}>{n}</td>)}
                    </tr>)
                  }
                  )}
                  <tr>
                    <td colSpan={6}> {value.length}</td>
                  </tr>
                  <tr>
                    <td colSpan={7}>
                      {value.map(v => v.points).reduce((a, b) => a + b, 0)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <br />
          </Fragment>
        )
      })}
      <br />
    </div >
  )
}

export default App
