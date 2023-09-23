const Header = ({ course }) => <h1>{course.name}</h1>

const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const Part = ({ part }) =>
  <p>
    {part.name} {part.exercises}
  </p>


const Content = ({ parts }) =>
  <>
    {parts.map(part => <Part part={part} key={part.id} />)}
  </>

function reducer(accumulator, currentValue, index) {
  const returns = accumulator + currentValue.exercises;
  console.log(
    `accumulator: ${accumulator}, currentValue: ${currentValue.exercises}, index: ${index}, returns: ${returns}`,
  );
  return returns;
}


const Course = ({ course }) =>
  <div>
    <Header course={course} />
    <Content parts={course.parts} />
    <Total sum={course.parts.reduce((acc, curr) => acc + curr.exercises, 0)} />
    {/* <Total sum={course.parts.reduce((reducer), 0)} /> */}
  </div>

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App