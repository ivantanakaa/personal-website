import skills from "./skills.json";
export default function Skills() {
  return (
    <div className="xl:p-6 lg:px-12 xl:px-12 p-4 flex flex-col items-center">
      <h1 className="text-txt-dark text-4xl mb-4 pb-4 border-b-4 px-4 w-fit border-txt-dark">
        Skills
      </h1>
      <ul className="list-disc grid md:grid-cols-4 grid-cols-3 grid-flow-row gap-y-4 gap-x-16">
        {skills.map((data, index) => {
          return <li key={`skill-${index}`}>{data}</li>;
        })}
      </ul>
    </div>
  );
}
