import skills from "./skills.json";
export default function Skills() {
  return (
    <div className="md:p-12 p-8 flex flex-col justify-center items-center">
      <h1 className="text-txt-dark text-4xl mb-4 pb-4 border-b-4 px-4 w-fit border-txt-dark">
        Skills
      </h1>
      <ul className="list-disc list-inside grid grid-rows-4 grid-flow-col gap-y-4 gap-x-16">
        {skills.map((data, index) => {
          return <li key={index}>{data}</li>;
        })}
      </ul>
    </div>
  );
}
