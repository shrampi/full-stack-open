const Header = (props) => {
    return (
        <h2>{props.course}</h2>
    );
}

const Part = (props) => {
    return (<p>{props.name} {props.exercises}</p>)
}

const Content = (props) => {
    const { parts } = props;
    return (
        <div>
            {parts.map(part =>
                <Part key={part.id} name={part.name} exercises={part.exercises} />
            )}
        </div>
    );
}

const Total = (props) => {
    let exercises = props.parts.map(p => p.exercises);
    let sum = exercises.reduce((previous, current) => previous + current);
    return (
        <p><b>Total of {sum} exercises</b></p>
    );
}

const Course = (props) => {
    const { course } = props;
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course
// same as modules.exports = {Coarse: Course};
