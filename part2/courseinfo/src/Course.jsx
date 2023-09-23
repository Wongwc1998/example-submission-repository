const Header = ({ course }) => <h3>{course.name}</h3>;
const Total = ({ sum }) => <h4>total of {sum} exercises</h4>;
const Part = ({ part }) => <p>
    {part.name} {part.exercises}
</p>;
const Content = ({ parts }) => <>
    {parts.map(part => <Part part={part} key={part.id} />)}
</>;
function reducer(accumulator, currentValue, index) {
    const returns = accumulator + currentValue.exercises;
    console.log(
        `accumulator: ${accumulator}, currentValue: ${currentValue.exercises}, index: ${index}, returns: ${returns}`
    );
    return returns;
}
export const Course = ({ courses }) => <>
    <h2>Web development curriculum</h2>
    {courses.map(course => {
        return (
            <div key={course.id}>
                <Header course={course} />
                <Content parts={course.parts} />
                <Total sum={course.parts.reduce((acc, curr) => acc + curr.exercises, 0)} />
            </div>
        );
    })}
</>;
